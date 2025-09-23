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

// Stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePayment from "@/components/StripePayment"; // ✅ you’ll create this file

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

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

function Page() {
  const [loadingInd, setLoadingInd] = useState(false);
  const [userData, setUserData] = useState(null);
  const searchParams = useSearchParams();
  const val = searchParams.get("val");
  const packageName = searchParams.get("package");
  const type = packageName?.split("-")[0];
  const name = packageName?.split("-")[1];

  // ✅ dynamic pricing
  const amount =
    name === "silver" ? 49.99 : name === "gold" ? 84.99 : 109.99;

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
      const data = {
        ...values,
        packageName: `${type} ${name}`.toUpperCase(),
        amount,
      };
      setUserData(data);
      localStorage.setItem("userData", JSON.stringify(data));
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoadingInd(false);
    }
  };

  return (
    <div className="w-full px-6 xl:mt-24 relative">
      <p className="text-center font-ancola text-primary text-2xl lg:text-3xl xl:text-5xl mb-6">
        Checkout
      </p>
      <div className="z-10 flex max-sm:flex-col items-start justify-center">
        {/* ✅ Left side: your form */}
        <div className="w-full sm:w-1/2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full grid grid-cols-1 space-y-6 px-6 py-3 rounded-xl"
            >
              {/* all your existing fields */}
              <FormField name="firstName" render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <input {...field} disabled={loadingInd} className="border-2 border-primary px-2 py-1"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField name="lastName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <input {...field} disabled={loadingInd} className="border-2 border-primary px-2 py-1"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              {/* ✅ add rest of fields like email, vin, license, etc. (same as before) */}

              <div className="w-full mt-6">
                <button
                  type="submit"
                  disabled={loadingInd}
                  className="w-full font-hora text-white bg-primary py-3 rounded-md"
                >
                  {loadingInd ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader2 className="w-6 h-6 text-white" />
                    </motion.div>
                  ) : (
                    "Save Details"
                  )}
                </button>
              </div>
            </form>
          </Form>

          {/* ✅ Stripe Payment Section */}
          {userData && (
            <div className="mt-8">
              <Elements stripe={stripePromise}>
                <StripePayment amount={amount} userData={userData} />
              </Elements>
            </div>
          )}
        </div>

        {/* ✅ Right side: summary */}
        <div className="z-10 w-full sm:w-1/2 mt-6 px-6">
          <div className="flex justify-between font-hora lg:text-lg xl:text-2xl mt-6">
            <p className="text-primary">Report:</p>
            <p className="capitalize">{name + " " + type} report</p>
          </div>
          <div className="flex justify-between font-hora lg:text-lg xl:text-2xl">
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
