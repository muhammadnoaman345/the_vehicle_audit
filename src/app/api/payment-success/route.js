import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { paymentId, userData } = await req.json();
    const verifyRes = await fetch(`https://api-v2.ziina.com/api/payment_intent/${paymentId}`, {
      headers: {
        "Authorization": `Bearer ${process.env.ZIINA_SECRET_KEY}`,
      },
    });
    const payment = await verifyRes.json();
    console.log("Payment response", payment)
    console.log("user data", userData);
    if (payment.status === "completed") {
      try {
          const { sendEmail } = await import('@/app/utils/email-service');
          const { customerEmailTemplate, adminEmailTemplate } = await import('@/app/utils/email-templates');
        //   const customerSubject = `Your Vehicle Report Order Confirmation #${capture.result.id}`;
        //   const customerHtml = customerEmailTemplate(capture.result, userData);
        // //   await sendEmail(userData.email, customerSubject, customerHtml);
          const adminSubject = `NEW ORDER: ${userData.firstName} ${userData.lastName} - ${userData.packageName} Report`;
          const adminHtml = adminEmailTemplate(userData, userData);
          await sendEmail(process.env.ADMIN_EMAIL, adminSubject, adminHtml);
        } 
        catch (emailError) {
          console.error("Email sending failed:", emailError);
        }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: "Payment not completed 2" }, { status: 400 });
  } catch (err) {
    console.error("Payment success error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}