import { NextResponse } from "next/server";
const Stripe = require("stripe");

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

    const subConvertedAmount = Math.round(amount * 100);

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
