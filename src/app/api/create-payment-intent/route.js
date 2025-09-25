import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json(); // 👈 App Router way
    const { amount, formData } = body;

    console.log("Received on server:", amount, formData);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Vehicle Report",
            },
            unit_amount: amount * 100, // amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    return new Response(
      JSON.stringify({ url: session.url }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Stripe error:", error);
    return new Response(
      JSON.stringify({ error: "Stripe payment failed" }),
      { status: 500 }
    );
  }
}
