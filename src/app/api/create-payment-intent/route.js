import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { amount, formData } = await req.json();

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects cents
      currency: "usd",
      payment_method_types: ["card"],
      receipt_email: formData.email,
    });

    return new Response(
      JSON.stringify({ client_secret: paymentIntent.client_secret }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
