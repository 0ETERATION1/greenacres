import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-01-27.acacia"
});

type Frequency = 'weekly' | 'biweekly';
type Size = 'small' | 'medium' | 'large';

// Define a simple interface for our session config to avoid TypeScript errors
interface SessionConfig {
  ui_mode: string;
  line_items: Array<{
    price_data: {
      currency: string;
      product_data: {
        name: string;
        description: string;
      };
      unit_amount: number;
    };
    quantity: number;
  }>;
  mode: string;
  return_url: string;
  payment_method_types: string[];
  billing_address_collection: string;
  custom_text: {
    submit: {
      message: string;
    };
  };
  customer_creation: string;
  phone_number_collection: {
    enabled: boolean;
  };
  customer_email?: string;
  metadata?: Record<string, string>;
  payment_intent_data?: {
    metadata: Record<string, string>;
  };
}

export async function POST(req: Request) {
  try {
    const { frequency, size } = await req.json() as { frequency: Frequency; size: Size };
    
    const prices: Record<Size, Record<Frequency, number>> = {
      small: { weekly: 5500, biweekly: 7000 },
      // was 1000 before
      medium: { weekly: 7500, biweekly: 9000 },
      large: { weekly: 9500, biweekly: 11000 }
    };

    const amount = prices[size][frequency];
    // Add transaction fee (e.g., 3%)
    const amountWithFee = Math.round(amount * 1.03);
    
    // Calculate processing fee (3% of amount)
    const processingFee = (amount * 0.03) / 100; // Convert cents to dollars
    const formattedFee = processingFee.toFixed(2); // Format to 2 decimal places

    // Get email from headers, but handle null case
    const emailFromHeader = req.headers.get("email");

    // Create session with proper typing
    const sessionConfig: SessionConfig = {
      ui_mode: "embedded",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${size.charAt(0).toUpperCase() + size.slice(1)} Lawn Mowing Service`,
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
      custom_text: {
        submit: {
          message: "We'll contact you within 24 hours to schedule your service!",
        },
      },
      customer_creation: 'always',
      phone_number_collection: {
        enabled: true,
      },
      // Add metadata to make customer info more accessible to Zapier
      metadata: {
        lawn_size: size,
        service_frequency: frequency,
        service_type: "lawn_mowing"
      },
      // Add payment intent metadata to ensure customer data is available
      payment_intent_data: {
        metadata: {
          lawn_size: size,
          service_frequency: frequency,
          service_type: "lawn_mowing"
        }
      }
    };

    // Only set customer_email if it's provided in headers
    // This does NOT pre-fill the email field - customers will still enter their own email
    if (emailFromHeader) {
      sessionConfig.customer_email = emailFromHeader;
      
      // Also add to metadata if available
      if (sessionConfig.metadata) {
        sessionConfig.metadata.customer_email = emailFromHeader;
      }
      
      if (sessionConfig.payment_intent_data?.metadata) {
        sessionConfig.payment_intent_data.metadata.customer_email = emailFromHeader;
      }
    }

    // Use type assertion for the Stripe API call
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session = await stripe.checkout.sessions.create(sessionConfig as any);

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
  }
} 
