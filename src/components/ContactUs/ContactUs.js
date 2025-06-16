"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

export default function ContactUs() {
  const schema = z.object({
    firstName: z
      .string()
      .min(2, "First name is required.")
      .max(50, "First name can't exceed 50 characters."),

    email: z.string().email("Please enter a valid email address."),

    phoneNumber: z
      .string()
      .regex(
        /^(?:\+?[0-9]{1,4}[ -]?)?(\(?[0-9]{1,4}\)?[ -]?)?[0-9]{6,14}$/,
        "Please enter a valid phone number."
      )
      .min(10, "Phone number must have at least 10 digits.")
      .max(15, "Phone number can't exceed 15 characters, including symbols."),

    feedback: z
      .string()
      .max(600, "Feedback cannot exceed 600 characters.")
      .min(1, "Feedback is required."),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      email: "",
      phoneNumber: "",
      feedback: "",
    },
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="w-full sm:grid sm:grid-cols-2 sm:grid-rows-1 sm:gap-3 bg-primary px-3 pb-6 sm:p-6 rounded-xl overflow-hidden">
      <div className="flex flex-col items-center justify-center max-sm:py-12">
        <p className="text-center font-ancola text-white text-2xl lg:text-3xl xl:text-5xl mb-6">
          Let&apos;s get in touch!
        </p>
        <p className="text-center font-hora sm:text-lg text-white">
          Got Questions? We&apos;ve Got Answers! Here are the most common
          questions we get about our services, designed to help you make the
          best choices with complete confidence.
        </p>
      </div>
      <div className="max-sm:row-span-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8 bg-white px-6 py-3 rounded-xl"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-ancola tracking-widest">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <input
                      className="font-hora text-lg p-2 border-2 border-primary rounded-lg"
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
                <FormItem>
                  <FormLabel className="font-ancola tracking-widest">
                    Email
                  </FormLabel>
                  <FormControl>
                    <input
                      className="font-hora text-lg p-2 border-2 border-primary rounded-lg"
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
                <FormItem>
                  <FormLabel className="font-ancola tracking-widest">
                    Phone No
                  </FormLabel>
                  <FormControl>
                    <input
                      type="number"
                      className="font-hora text-lg p-2 border-2 border-primary rounded-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-ancola tracking-widest">
                    Feedback
                  </FormLabel>
                  <FormControl>
                    <textarea
                      className="h-40 font-hora text-lg p-2 border-2 border-primary rounded-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              className="w-full sm:w-1/4 text-sm py-2 xl:py-3 rounded-full font-hora text-lg cursor-pointer border-2 border-primary"
              type="submit"
            >
              Submit
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
}
