"use client";
import ContactUs from "@/components/ContactUs/ContactUs";
import { FactsAndFigures } from "@/components/FactsAndFigures/FactsAndFigures";
import Faq from "@/components/Faq/Faq";
import Hero from "@/components/Hero/Hero";
import OurServices from "@/components/OurServices/OurServices";
import { Pricing } from "@/components/Pricing/Pricing";
import { Testimonials } from "@/components/Testimonials/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";

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
