import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-01-27.acacia"
});

type Frequency = 'weekly' | 'biweekly';
type Size = 'small' | 'medium' | 'large';

export async function POST(req: Request) {
  try {
    const { frequency, size } = await req.json() as { frequency: Frequency; size: Size };
    
    const prices: Record<Size, Record<Frequency, number>> = {
      small: { weekly: 4500, biweekly: 6500 },
      medium: { weekly: 7000, biweekly: 10500 },
      large: { weekly: 9500, biweekly: 14200 }
    };

    const amount = prices[size][frequency];
    // Add transaction fee (e.g., 3%)
    const amountWithFee = Math.round(amount * 1.03);
    
    // Calculate processing fee (3% of amount)
    const processingFee = (amount * 0.03) / 100; // Convert cents to dollars
    const formattedFee = processingFee.toFixed(2); // Format to 2 decimal places

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${size.charAt(0).toUpperCase() + size.slice(1)} Lawn Mowing Service - ${frequency}`,
              description: `Professional lawn maintenance service - First Visit\n(+$${formattedFee} processing fee)`,
            },
            unit_amount: amountWithFee,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      return_url: `${req.headers.get("origin")}/return?session_id={CHECKOUT_SESSION_ID}`,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      custom_fields: [
        {
          key: "phone",
          label: { type: "custom", custom: "Cell Phone" },
          type: "text",
          optional: false,
        }
      ],
      custom_text: {
        submit: {
          message: "We'll contact you within 24 hours to schedule your service",
        },
      }
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
  }
} 
