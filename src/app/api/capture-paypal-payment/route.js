// app/api/capture-paypal-payment/route.js
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const paypal = require("@paypal/checkout-server-sdk");

const environment = new paypal.core.LiveEnvironment(
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  process.env.NEXT_PUBLIC_PAYPAL_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);
const temporaryUserDataStore = new Map();

export async function POST(request) {
  try {
    console.log("Capture payment API called");
    
    const { token, PayerID } = await request.json();
    console.log("Token:", token, "PayerID:", PayerID);

    if (!token || !PayerID) {
      console.error("Missing token or PayerID");
      return NextResponse.json(
        { error: "Token and PayerID are required" },
        { status: 400 }
      );
    }
    const captureRequest = new paypal.orders.OrdersCaptureRequest(token);
    captureRequest.requestBody({});

    console.log("Executing PayPal capture request...");
    const capture = await client.execute(captureRequest);
    console.log("PayPal capture response:", capture.result.status);

    if (capture.result.status === "COMPLETED") {
      console.log("Payment completed successfully");
      
      let userData = null;
      if (typeof global.temporaryUserDataStore !== 'undefined') {
        userData = global.temporaryUserDataStore.get(token);
      }
      console.log("User data retrieved:", userData ? "Yes" : "No");
      
      if (userData) {
        try {
          const { sendEmail } = await import('@/app/utils/email-service');
          const { customerEmailTemplate, adminEmailTemplate } = await import('@/app/utils/email-templates');
          const customerSubject = `Your Vehicle Report Order Confirmation #${capture.result.id}`;
          const customerHtml = customerEmailTemplate(capture.result, userData);
          await sendEmail(userData.email, customerSubject, customerHtml);
          const adminSubject = `NEW ORDER: ${userData.firstName} ${userData.lastName} - ${userData.packageName} Report`;
          const adminHtml = adminEmailTemplate(capture.result, userData);
          await sendEmail(process.env.ADMIN_EMAIL, adminSubject, adminHtml);
        } catch (emailError) {
          console.error("Email sending failed:", emailError);
        }
        temporaryUserDataStore.delete(token);
      }
      
      return NextResponse.json({
        success: true,
        orderID: capture.result.id,
        status: capture.result.status,
        details: capture.result
      });
    } else {
      console.error("Payment capture failed with status:", capture.result.status);
      return NextResponse.json(
        { error: "Payment capture failed", details: capture.result },
        { status: 400 }
      );
    }
  } catch (err) {
    console.error("PayPal Capture Error:", err);
    return NextResponse.json(
      { error: err?.message || "Payment capture failed" },
      { status: 500 }
    );
  }
}