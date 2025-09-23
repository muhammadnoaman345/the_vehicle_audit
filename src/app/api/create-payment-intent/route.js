import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { amount, formData } = await req.json();

    if (!amount || !formData) {
      return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      receipt_email: formData.email,
      metadata: {
        name: `${formData.firstName} ${formData.lastName}`,
        vin: formData.vin || "",
        package: formData.packageName || "",
      },
    });

    return new Response(
      JSON.stringify({ client_secret: paymentIntent.client_secret }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "PaymentIntent creation failed" }),
      { status: 500 }
    );
  }
}
