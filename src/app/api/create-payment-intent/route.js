// pages/api/create-payment-intent.js
// ✅ Stripe Integration API (USD)

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { amount, formData } = body;

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: formData.packageName,
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      customer_email: formData.email,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      metadata: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        vin: formData.vin,
        phoneNumber: formData.phoneNumber,
      },
    });

    return new Response(JSON.stringify({ url: session.url }), { status: 200 });

  } catch (err) {
    console.error("Stripe API Error:", err);
    return new Response(
      JSON.stringify({ error: "Stripe payment intent creation failed" }),
      { status: 500 }
    );
  }
}
