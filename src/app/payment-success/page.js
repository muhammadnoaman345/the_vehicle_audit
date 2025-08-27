// app/payment-success/page.js
"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("processing");
  const [message, setMessage] = useState("Processing your payment...");

  useEffect(() => {
    const token = searchParams.get("token");
    const PayerID = searchParams.get("PayerID");

    if (token && PayerID) {
      capturePayment(token, PayerID);
    } else {
      setStatus("error");
      setMessage("Missing payment information. Please contact support.");
    }
  }, []);

  const capturePayment = async (token, PayerID) => {
    try {
      const res = await fetch("/api/capture-paypal-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, PayerID }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("Payment successful! Your report is being generated.");
        // Here you could save the order details to your database
      } else {
        setStatus("error");
        setMessage(data.error || "Payment failed. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("An error occurred. Please contact support.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        {status === "processing" && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Processing Payment</h2>
            <p>{message}</p>
          </div>
        )}
        
        {status === "success" && (
          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Payment Successful!</h2>
            <p className="mb-4">{message}</p>
            <Link 
              href="/"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Return to Home
            </Link>
          </div>
        )}
        
        {status === "error" && (
          <div className="text-center">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Payment Failed</h2>
            <p className="mb-4">{message}</p>
            <Link 
              href="/"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Try Again
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}