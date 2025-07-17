"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

export default function StripeForm({
  clientSecret,
  completeOrder,
  formData,
  setLoadingInd,
}) {
  const [stripeError, setStripeError] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (completeOrder && clientSecret && formData) {
      confirmOrder();
    }
  }, [completeOrder]);

  const confirmOrder = async () => {
    try {
      setLoadingInd(true);
      if (!stripe || !elements) {
        setStripeError("Stripe SDK not loaded. Try again.");
        setLoadingInd(false);
        return;
      }

      const { error: submitError } = await elements.submit();
      if (submitError) {
        setStripeError(submitError.message || "Payment form incomplete.");
        setLoadingInd(false);
        return;
      }

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          // return_url: `http://localhost:3000/payment-success`,
          return_url: `https://www.thevehicleaudit.com/payment-success`,
        },
        redirect: "if_required",
      });

      if (error) {
        setStripeError(error.message);
        setLoadingInd(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        window.location.href = "/payment-success";
      }
    } catch (error) {
      setStripeError(error.message);
    } finally {
      setLoadingInd(false);
    }
  };

  return (
    <>
      <div className="w-full">{clientSecret && <PaymentElement />}</div>
      {stripeError && (
        <p className="text-sm text-red-500 mt-1 font-hora">{stripeError}</p>
      )}
    </>
  );
}
