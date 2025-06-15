import { Hero } from "@/components/Hero/Hero";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-12 px-6 xl:mt-24">
      {/* Hero Section */}
      <Hero />
      <WhyChooseUs />
    </div>
  );
}

export default Home;
