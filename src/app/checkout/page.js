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
import PayPalSmartButton from "@/components/PayPal/PayPalSmarButton";

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
  const [formData, setFormData] = useState(null); // ✅ store form data for PayPal
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

  const handleSubmit = async (values) => {

    try {
      setLoadingInd(true);
      const userData = {
        ...values,
        packageName: `${type} ${name}`.toUpperCase(),
        amount,
      };
      localStorage.setItem("userData", JSON.stringify(userData));
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          formData: userData,
        }),
      });

      const data = await res.json();

      if (data.redirect_url) {
        window.location.href = data.redirect_url;
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
                        disabled={loadingInd}
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

              {/* ✅ Submit button just validates form */}
              {
                // !formData && (
                //   <div className="w-full mt-6">
                //     <button
                //       type="submit"
                //       disabled={loadingInd}
                //       className="w-full font-hora text-white bg-primary rounded-tl-xl rounded-br-xl py-3 cursor-pointer flex flex-col items-center justify-center"
                //     >
                //       {loadingInd ? (
                //         <motion.div
                //           animate={{ rotate: 360 }}
                //           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                //         >
                //           <Loader2 className="w-8 h-8 text-white" />
                //         </motion.div>
                //       ) : (
                //         "Proceed to Payment"
                //       )}
                //     </button>
                //   </div>
                // )
                <div className="w-full mt-6">
                  <button
                    type="submit"
                    disabled={loadingInd}
                    className="w-full font-hora text-white bg-primary rounded-tl-xl rounded-br-xl py-3 cursor-pointer flex flex-col items-center justify-center"
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
              }
            </form>
          </Form>
          {formData && (
            <div className="mt-6">
              {/* <PayPalSmartButton amount={amount} formData={formData} /> */}
            </div>
          )}
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

export default function PageWithSuspense() {
  return (
    <Suspense fallback={<Loading />}>
      <Page />
    </Suspense>
  );
}
