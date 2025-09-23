// pages/api/create-payment-intent.js
// ✅ Ziina Integration API (USD)

export async function POST(req) {
  try {
    const body = await req.json();

    // Amount comes from frontend in USD (e.g., 10 = $10.00)
    const usdAmount = body.amount;

    const response = await fetch("https://api-v2.ziina.com/api/payment_intent", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.ZIINA_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Math.round(usdAmount * 100), // Ziina expects amount in cents
        currency_code: "USD",                // switched from AED to USD
        message: `Payment for ${body.formData.packageName}`,
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?payment_id={PAYMENT_INTENT_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
        // test: true  // uncomment for Ziina test mode
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
