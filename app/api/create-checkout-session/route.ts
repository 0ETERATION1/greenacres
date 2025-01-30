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
      large: { weekly: 9500, biweekly: 14250 }
    };

    const amount = prices[size][frequency];
    
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price_data: {
            currency: "usd",
            recurring: {
              interval: frequency === 'weekly' ? 'week' : 'month',
              interval_count: frequency === 'weekly' ? 1 : 2,
            },
            product_data: {
              name: `${size.charAt(0).toUpperCase() + size.slice(1)} Lawn Mowing Service - ${frequency}`,
              description: `Professional lawn maintenance service - ${frequency} visits`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      return_url: `${req.headers.get("origin")}/return?session_id={CHECKOUT_SESSION_ID}`,
      payment_method_types: ["card"],
      custom_text: {
        submit: {
          message: "We'll get started on your lawn service right after subscription confirmation",
        },
      },
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
  }
} 