import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Get the form data from the request
    const { userData } = await req.json();
    console.log("User data received:", userData);

    try {
      // Import your email helpers
      const { sendEmail } = await import('@/app/utils/email-service');
      const { adminEmailTemplate } = await import('@/app/utils/email-templates');

      // Build email for admin
      const adminSubject = `NEW ORDER: ${userData.firstName} ${userData.lastName} - ${userData.packageName} Report`;
      const adminHtml = adminEmailTemplate(userData, userData);

      // Send to your ADMIN_EMAIL
      await sendEmail(process.env.ADMIN_EMAIL, adminSubject, adminHtml);

      // (Optional) If you also want to email the customer:
      // const { customerEmailTemplate } = await import('@/app/utils/email-templates');
      // const customerSubject = `Your Order Confirmation - ${userData.packageName} Report`;
      // const customerHtml = customerEmailTemplate(userData, userData);
      // await sendEmail(userData.email, customerSubject, customerHtml);

    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      return NextResponse.json({ success: false, error: "Email failed" }, { status: 500 });
    }

    // Success response
    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Payment success error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
