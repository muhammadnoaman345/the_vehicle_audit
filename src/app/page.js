"use client";
import ContactUs from "@/components/ContactUs/ContactUs";
import { FactsAndFigures } from "@/components/FactsAndFigures/FactsAndFigures";
import Faq from "@/components/Faq/Faq";
import Hero from "@/components/Hero/Hero";
import OurServices from "@/components/OurServices/OurServices";
import { Pricing } from "@/components/Pricing/Pricing";
import { Testimonials } from "@/components/Testimonials/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MSID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MID,
};

export const app = initializeApp(firebaseConfig);

function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-20 sm:gap-40 px-6 xl:mt-24 overflow-hidden">
      <Hero />
      <WhyChooseUs />
      <OurServices />
      <FactsAndFigures />
      <Pricing />
      <Testimonials />
      <Faq />
      <ContactUs />
    </div>
  );
}

export default Home;
