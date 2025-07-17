"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
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
import StripeForm from "@/components/StripeForm/StripeForm";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

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
  firstName: z
    .string()
    .min(2, "First name is required.")
    .max(50, "First name can't exceed 50 characters."),
  lastName: z
    .string()
    .min(2, "Last name is required.")
    .max(50, "Last name can't exceed 50 characters."),
  email: z.string().email("Please enter a valid email address."),
  vin: z.string().length(17, "Please enter a valid VIN number."),
  lisenceNumber: z
    .string()
    .min(5, "Please enter a valid lisence number.")
    .max(7, "Lisence number can't exceed 50 characters."),
  registrationState: z
    .string()
    .min(2, "Invalid registration state.")
    .max(50, "Registration state name can't exceed 50 characters.")
    .optional()
    .or(z.literal("")),
  company: z.string().min(2).max(50).optional().or(z.literal("")),
  country: z
    .union([z.enum(countryEnum), z.literal("")])
    .refine((val) => val !== "", { message: "Please select a country." }),
  state: z
    .string()
    .min(2, "State is required.")
    .max(50, "State name can't exceed 50 characters."),
  city: z
    .string()
    .min(2, "City is required.")
    .max(50, "City name can't exceed 50 characters."),
  postalCode: z
    .string()
    .min(3, "Please enter a valid postal code.")
    .max(10, "Postal code can't exceed 50 characters"),
  billingAddress: z
    .string()
    .min(10, "City is required.")
    .max(200, "Billing address can't exceed 200 characters"),
  phoneNumber: z
    .string()
    .regex(
      /^(?:\+?[0-9]{1,4}[ -]?)?(\(?[0-9]{1,4}\)?[ -]?)?[0-9]{6,14}$/,
      "Please enter a valid phone number."
    )
    .min(10, "Phone number must have at least 10 digits.")
    .max(15, "Phone number can't exceed 15 characters, including symbols."),
});

function Page() {
  const [clientSecret, setClientSecret] = useState(null);
  const [completeOrder, setCompleteOrder] = useState(false);
  const [formData, setFormData] = useState(null);
  const [loadingInd, setLoadingInd] = useState(false);
  const searchParams = useSearchParams();
  const val = searchParams.get("val");
  const packageName = searchParams.get("package");
  const type = packageName.split("-")[0];
  const name = packageName.split("-")[1];
  const amount = name === "silver" ? 49.99 : name === "gold" ? 84.99 : 109.99;
  // const amount = name === "silver" ? 1 : name === "gold" ? 2 : 3;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      // firstName: "John",
      // lastName: "Doe",
      // email: "john.doe@example.com",
      // vin: "1HGCM82633A004352", // Example VIN (17 chars)
      // lisenceNumber: "ABC1234", // 7 chars (US/CA style)
      // registrationState: "California",
      // company: "Acme Motors",
      // country: "United States (US)", // Should match one from countryEnum
      // state: "California",
      // city: "Los Angeles",
      // postalCode: "90001", // 5-digit US ZIP
      // billingAddress: "123 Main Street, Suite 100",
      // phoneNumber: "+12345678901",
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
    try {
      setLoadingInd(true);

      fetch("/api/create-payment-intent", {
        method: "POST",
        body: JSON.stringify({ amount, data: values }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
          setFormData(values);
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setLoadingInd(false);
    }
  };

  return (
    <div className="w-full px-6 xl:mt-24 relative">
      {/* Loader */}
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
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="gap-1">
                    <FormLabel className="font-hora">First Name</FormLabel>
                    <FormControl>
                      <input
                        className="font-hora text-sm px-2 py-1 border-2 border-primary"
                        disabled={loadingInd}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="gap-1">
                    <FormLabel className="font-hora">Last Name</FormLabel>
                    <FormControl>
                      <input
                        className="font-hora text-sm px-2 py-1 border-2 border-primary"
                        disabled={loadingInd}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="gap-1">
                    <FormLabel className="font-hora">Email</FormLabel>
                    <FormControl>
                      <input
                        className="font-hora text-sm px-2 py-1 border-2 border-primary"
                        disabled={loadingInd}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vin"
                render={({ field }) => (
                  <FormItem className="gap-1">
                    <FormLabel className="font-hora">VIN</FormLabel>
                    <FormControl>
                      <input
                        className="font-hora text-sm px-2 py-1 border-2 border-primary"
                        disabled={loadingInd}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lisenceNumber"
                render={({ field }) => (
                  <FormItem className="gap-1">
                    <FormLabel className="font-hora">
                      Registration/Lisence Plate Number
                    </FormLabel>
                    <FormControl>
                      <input
                        className="font-hora text-sm px-2 py-1 border-2 border-primary"
                        disabled={loadingInd}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="registrationState"
                render={({ field }) => (
                  <FormItem className="gap-1">
                    <FormLabel className="font-hora">
                      Registration State (Optional)
                    </FormLabel>
                    <FormControl>
                      <input
                        className="font-hora text-sm px-2 py-1 border-2 border-primary"
                        disabled={loadingInd}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem className="gap-1">
                    <FormLabel className="font-hora">
                      Company (optional)
                    </FormLabel>
                    <FormControl>
                      <input
                        className="font-hora text-sm px-2 py-1 border-2 border-primary"
                        disabled={loadingInd}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="gap-1">
                    <FormLabel className="font-hora">Country</FormLabel>
                    <FormControl>
                      <select
                        className="font-hora text-sm px-2 py-1 border-2 border-primary"
                        {...field}
                      >
                        <option value="">Select a country</option>
                        {countryEnum.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="gap-1">
                    <FormLabel className="font-hora">State</FormLabel>
                    <FormControl>
                      <input
                        className="font-hora text-sm px-2 py-1 border-2 border-primary"
                        disabled={loadingInd}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="gap-1">
                    <FormLabel className="font-hora">City</FormLabel>
                    <FormControl>
                      <input
                        className="font-hora text-sm px-2 py-1 border-2 border-primary"
                        disabled={loadingInd}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem className="gap-1">
                    <FormLabel className="font-hora">Postal/ZIP Code</FormLabel>
                    <FormControl>
                      <input
                        className="font-hora text-sm px-2 py-1 border-2 border-primary"
                        disabled={loadingInd}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="billingAddress"
                render={({ field }) => (
                  <FormItem className="gap-1">
                    <FormLabel className="font-hora">Billing Address</FormLabel>
                    <FormControl>
                      <input
                        className="font-hora text-sm px-2 py-1 border-2 border-primary"
                        disabled={loadingInd}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="gap-1">
                    <FormLabel className="font-hora">Phone Number</FormLabel>
                    <FormControl>
                      <input
                        className="font-hora text-sm px-2 py-1 border-2 border-primary"
                        disabled={loadingInd}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <div className="z-10 w-full sm:w-1/2 mt-6 px-6">
          {clientSecret && (
            <Elements
              stripe={stripePromise}
              className="w-full"
              options={{
                clientSecret,
                appearance: { theme: "stripe" },
              }}
            >
              <StripeForm
                clientSecret={clientSecret}
                completeOrder={completeOrder}
                formData={formData}
                setLoadingInd={setLoadingInd}
              />
            </Elements>
          )}
          <div className="w-full flex items-center justify-between font-hora lg:text-lg xl:text-2xl mt-6">
            <p className="text-primary">Report:</p>
            <p className="capitalize">{name + " " + type} report</p>
          </div>
          <div className="w-full flex items-center justify-between font-hora lg:text-lg xl:text-2xl">
            <p className="text-primary">Total:</p>
            <p>{amount} USD</p>
          </div>

          <div className="w-full mt-6">
            <button
              onClick={
                !clientSecret
                  ? form.handleSubmit(handleSubmit)
                  : () => setCompleteOrder(true)
              }
              disabled={loadingInd}
              className="w-full font-hora text-white bg-primary rounded-tl-xl rounded-br-xl py-3 cursor-pointer flex flex-col items-center justify-center"
            >
              {loadingInd ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="w-8 h-8 text-white" />
                </motion.div>
              ) : clientSecret ? (
                "Pay now"
              ) : (
                "Proceed payment"
              )}
            </button>
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
