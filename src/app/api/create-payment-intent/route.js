import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { amount, data } = await request.json();
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      country,
      state,
      city,
      postalCode,
      billingAddress,
      ...rest
    } = data;

    // Create a Stripe customer
    const customer = await stripe.customers.create({
      name: `${firstName} ${lastName}`,
      email,
      phone: phoneNumber,
      address: {
        country,
        state,
        city,
        postal_code: postalCode,
        line1: billingAddress,
      },
      metadata: {
        ...rest,
      },
    });

    // Convert USD to cents
    const subConvertedAmount = Math.round(amount * 100);

    // Create a Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: subConvertedAmount,
      currency: "usd",
      customer: customer.id,
      automatic_payment_methods: { enabled: true },
      receipt_email: email,
      shipping: {
        name: `${firstName} ${lastName}`,
        address: {
          line1: billingAddress,
          city,
          state,
          postal_code: postalCode,
          country,
        },
      },
      metadata: {
        ...rest,
        customerId: customer.id,
      },
      description: `Payment for ${customer.name}`,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error in creating stripe payment intent:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}

/* 
--------------------------------------------------
 Ziina Integration (Deactivated for now)
--------------------------------------------------

export async function POST(req) {
  try {
    const body = await req.json();

    const usdAmount = body.amount;

    const response = await fetch("https://api-v2.ziina.com/api/payment_intent", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.ZIINA_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Math.round(usdAmount * 100),
        currency_code: "USD",
        message: `Payment for ${body.formData.packageName}`,
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?payment_id={PAYMENT_INTENT_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      }),
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });

  } catch (err) {
    console.error("Ziina API Error:", err);
    return new Response(
      JSON.stringify({ error: "Payment intent creation failed" }),
      { status: 500 }
    );
  }
}
*/
