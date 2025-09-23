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
import { CardElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Stripe publishable key from Vercel env
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
    .refine((val) => val !== "", { message: "Please select a country." }),
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

function StripePayment({ amount, formData }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    setLoading(true);
    const cardElement = elements.getElement(CardElement);

    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, formData }),
      });

      const { client_secret, error } = await res.json();

      if (error) {
        alert(error);
        setLoading(false);
        return;
      }

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            address: {
              line1: formData.billingAddress,
              city: formData.city,
              state: formData.state,
              postal_code: formData.postalCode,
              country: formData.country,
            },
          },
        },
      });

      if (result.error) {
        alert(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        alert("Payment successful!");
      }
    } catch (err) {
      console.error(err);
      alert("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <p className="font-hora text-lg mb-2">Enter Card Details:</p>
      <div className="border-2 border-primary rounded-xl p-3">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#000",
                fontFamily: "hora, sans-serif",
                "::placeholder": { color: "#a0a0a0" },
                padding: "10px 12px",
              },
              invalid: { color: "#f44336" },
            },
          }}
        />
      </div>
      <button
        onClick={handlePayment}
        disabled={!stripe || loading}
        className="w-full mt-4 font-hora text-white bg-primary rounded-tl-xl rounded-br-xl py-3 flex justify-center items-center"
      >
        {loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-6 h-6 text-white" />
          </motion.div>
        ) : (
          `Pay ${amount} USD`
        )}
      </button>
    </div>
  );
}

function Page() {
  const [loadingInd, setLoadingInd] = useState(false);
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
    localStorage.setItem(
      "userData",
      JSON.stringify({
        ...values,
        packageName: `${type} ${name}`.toUpperCase(),
        amount,
      })
    );
  };

  const storedFormData = JSON.parse(localStorage.getItem("userData") || "{}");

  return (
    <div className="w-full px-6 xl:mt-24 relative">
      <p className="text-center font-ancola text-primary text-2xl lg:text-3xl xl:text-5xl mb-6">
        Checkout
      </p>
      <div className="z-10 flex max-sm:flex-col items-start justify-center">
        <div className="w-full sm:w-1/2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full grid grid-cols-1 space-y-6 px-6 py-3 rounded-xl"
            >
              {[
                "firstName",
                "lastName",
                "email",
                "vin",
                "lisenceNumber",
                "registrationState",
                "company",
                "country",
                "state",
                "city",
                "postalCode",
                "billingAddress",
                "phoneNumber",
              ].map((fieldName) => (
                <FormField
                  key={fieldName}
                  control={form.control}
                  name={fieldName}
                  render={({ field }) => (
                    <FormItem className="gap-1">
                      <FormLabel className="font-hora">
                        {fieldName.charAt(0).toUpperCase() +
                          fieldName.slice(1).replace(/([A-Z])/g, " $1")}
                      </FormLabel>
                      <FormControl>
                        {fieldName === "country" ? (
                          <select
                            className="font-hora text-sm px-2 py-1 border-2 border-primary"
                            disabled={loadingInd}
                            {...field}
                          >
                            <option value="">Select a country</option>
                            {countryEnum.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            className="font-hora text-sm px-2 py-1 border-2 border-primary"
                            disabled={loadingInd}
                            {...field}
                          />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <div className="w-full mt-6">
                <button
                  type="submit"
                  disabled={loadingInd}
                  className="w-full font-hora text-white bg-primary rounded-tl-xl rounded-br-xl py-3 flex flex-col items-center justify-center"
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
                    "Save Information"
                  )}
                </button>
              </div>
            </form>
          </Form>

          <StripePayment amount={amount} formData={storedFormData} />
        </div>

        <div className="z-10 w-full sm:w-1/2 mt-6 px-6">
          <div className="w-full flex items-center justify-between font-hora lg:text-lg xl:text-2xl mt-6">
            <p className="text-primary">Report:</p>
            <p className="capitalize">{name + " " + type} report</p>
          </div>
          <div className="w-full flex items-center justify-between font-hora lg:text-lg xl:text-2xl">
            <p className="text-primary">Total:</p>
            <p>{amount} USD</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PageWithElements() {
  return (
    <Suspense fallback={<Loading />}>
      <Elements stripe={stripePromise}>
        <Page />
      </Elements>
    </Suspense>
  );
}
