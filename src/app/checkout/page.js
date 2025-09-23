"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Loading from "@/components/Loading/Loading";
import { Loader2 } from "lucide-react";

// ✅ Stripe imports
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

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

// ✅ Stripe payment form inside checkout
function StripeCardPayment({ clientSecret, onPaymentComplete }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    setLoading(true);
    const cardElement = elements.getElement(CardElement);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement },
    });

    if (result.error) {
      alert(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        alert("Payment successful!");
        onPaymentComplete();
      }
    }

    setLoading(false);
  };

  return (
    <div className="mt-6 border p-4 rounded-lg">
      <CardElement className="p-3 border rounded" />
      <button
        type="button"
        disabled={!stripe || loading}
        onClick={handlePayment}
        className="w-full mt-4 bg-green-600 text-white py-3 rounded-xl flex justify-center items-center"
      >
        {loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-6 h-6 text-white" />
          </motion.div>
        ) : (
          "Pay Now"
        )}
      </button>
    </div>
  );
}

function Page() {
  const [loadingInd, setLoadingInd] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);

  const searchParams = useSearchParams();
  const val = searchParams.get("val");
  const packageName = searchParams.get("package");
  const type = packageName?.split("-")[0] || "";
  const name = packageName?.split("-")[1] || "";
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

  const handleSubmit = async (values) => {
    try {
      setLoadingInd(true);
      const userData = {
        ...values,
        packageName: `${type} ${name}`.toUpperCase(),
        amount,
      };

      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          data: userData,
        }),
      });

      const data = await res.json();

      if (data.clientSecret) {
        setClientSecret(data.clientSecret); // ✅ show Stripe card form
      } else {
        alert("Failed to start payment. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoadingInd(false);
    }
  };

  return (
    <div className="w-full px-6 xl:mt-24 relative">
      <p className="text-center text-primary text-2xl lg:text-3xl xl:text-5xl mb-6">
        Checkout
      </p>
      <div className="flex max-sm:flex-col items-start justify-center">
        <div className="w-full sm:w-1/2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full grid grid-cols-1 space-y-6 px-6 py-3 rounded-xl"
            >
              {/* ✅ your existing form fields (firstName, email, etc.) */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <input
                        className="border px-2 py-1"
                        disabled={loadingInd}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* ... repeat other fields same as before ... */}

              <div className="w-full mt-6">
                <button
                  type="submit"
                  disabled={loadingInd}
                  className="w-full bg-primary text-white py-3 rounded-xl flex justify-center items-center"
                >
                  {loadingInd ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Loader2 className="w-8 h-8 text-white" />
                    </motion.div>
                  ) : (
                    "Proceed to Payment"
                  )}
                </button>
              </div>
            </form>
          </Form>

          {/* ✅ Stripe card payment shows only after form is submitted */}
          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <StripeCardPayment
                clientSecret={clientSecret}
                onPaymentComplete={() => console.log("Payment complete!")}
              />
            </Elements>
          )}
        </div>

        <div className="w-full sm:w-1/2 mt-6 px-6">
          <div className="flex justify-between mt-6">
            <p className="text-primary">Report:</p>
            <p className="capitalize">{name + " " + type} report</p>
          </div>
          <div className="flex justify-between">
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
