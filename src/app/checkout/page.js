"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import Loading from "@/components/Loading/Loading";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// ✅ Stripe imports
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Your public key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const countryEnum = [
  "United States (US)",
  "Canada",
  "United Kingdom (UK)",
  "Australia",
  "Ireland",
  "Scotland",
  "Newzealand",
];

// Schema (same as before)
const schema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  vin: z.string().length(17),
  lisenceNumber: z.string().min(5).max(7),
  registrationState: z.string().optional().or(z.literal("")),
  company: z.string().optional().or(z.literal("")),
  country: z
    .union([z.enum(countryEnum), z.literal("")])
    .refine((val) => val !== "", {
      message: "Please select a country.",
    }),
  state: z.string().min(2).max(50),
  city: z.string().min(2).max(50),
  postalCode: z.string().min(3).max(10),
  billingAddress: z.string().min(10).max(200),
  phoneNumber: z
    .string()
    .regex(
      /^(?:\+?[0-9]{1,4}[ -]?)?(\(?[0-9]{1,4}\)?[ -]?)?[0-9]{6,14}$/,
      "Please enter a valid phone number."
    )
    .min(10)
    .max(15),
});

// Stripe Checkout Component (card input)
function StripePayment({ amount, userData }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    // Call backend to create payment intent
    const res = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, data: userData }),
    });

    const { clientSecret } = await res.json();

    // Confirm payment
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handlePayment} className="mt-8 space-y-4">
      <PaymentElement />

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full py-3 bg-primary text-white rounded-md"
      >
        {loading ? "Processing..." : `Pay $${amount}`}
      </button>
    </form>
  );
}

// Main Page
function Page() {
  const [userData, setUserData] = useState(null);
  const searchParams = useSearchParams();
  const val = searchParams.get("val");
  const packageName = searchParams.get("package");
  const type = packageName.split("-")[0];
  const name = packageName.split("-")[1];
  const amount = name === "silver" ? 49.99 : name === "gold" ? 84.99 : 109.99;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      vin: val?.length === 17 ? val : "",
      lisenceNumber: val?.length >= 5 && val?.length <= 7 ? val : "",
      registrationState: "",
      company: "",
      country: "",
      state: "",
      city: "",
      postalCode: "",
      billingAddress: "",
      phoneNumber: "",
    },
  });

  const handleSubmit = (values) => {
    const uData = {
      ...values,
      packageName: `${type} ${name}`.toUpperCase(),
      amount,
    };
    setUserData(uData);
    localStorage.setItem("userData", JSON.stringify(uData));
  };

  return (
    <div className="w-full px-6 xl:mt-24 relative">
      <p className="text-center font-ancola text-primary text-2xl lg:text-3xl xl:text-5xl mb-6">
        Checkout
      </p>
      <div className="flex max-sm:flex-col items-start justify-center">
        <div className="w-full sm:w-1/2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full grid grid-cols-1 space-y-6 px-6 py-3 rounded-xl"
            >
              {/* ✅ your existing form fields stay here (unchanged) */}
              {/* ... */}

              <div className="w-full mt-6">
                <button
                  type="submit"
                  className="w-full font-hora text-white bg-primary rounded-tl-xl rounded-br-xl py-3"
                >
                  Save & Show Payment
                </button>
              </div>
            </form>
          </Form>

          {/* ✅ After form submit, show Stripe */}
          {userData && (
            <Elements stripe={stripePromise}>
              <StripePayment amount={amount} userData={userData} />
            </Elements>
          )}
        </div>

        {/* Sidebar Summary */}
        <div className="z-10 w-full sm:w-1/2 mt-6 px-6">
          <div className="flex items-center justify-between font-hora lg:text-lg xl:text-2xl mt-6">
            <p className="text-primary">Report:</p>
            <p className="capitalize">{name + " " + type} report</p>
          </div>
          <div className="flex items-center justify-between font-hora lg:text-lg xl:text-2xl">
            <p className="text-primary">Total:</p>
            <p>{amount} USD</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PageWithSuspense() {
  return (
    <Suspense fallback={<Loading />}>
      <Page />
    </Suspense>
  );
}
