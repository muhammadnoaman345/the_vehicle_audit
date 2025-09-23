import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { amount, formData } = await req.json();

    if (!amount || !formData) {
      return new Response(
        JSON.stringify({ error: "Missing amount or form data." }),
        { status: 400 }
      );
    }

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // convert USD to cents
      currency: "usd",
      payment_method_types: ["card"],
      metadata: {
        customer_name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        vin: formData.vin,
        license_number: formData.lisenceNumber,
      },
    });

    return new Response(
      JSON.stringify({ client_secret: paymentIntent.client_secret }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
