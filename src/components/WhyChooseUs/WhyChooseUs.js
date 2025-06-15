import { CircleArrowRight, CircleCheckBig } from "lucide-react";

const benefits = [
  "Access comprehensive title, salvage, and total loss details",
  "Exclusive data on thefts, recalls, liens, and vehicle values",
  "Advanced dealer dashboard with batch reporting and printing",
  "Competitive pricing with no hidden fees",
];

export default function WhyChooseUs() {
  return (
    <section className="w-full flex max-sm:flex-col items-center justify-between sm:justify-center">
      <div className="h-1/2 sm:h-full w-full sm:w-1/2 sm:px-16">
        <div className="h-full w-full py-16 bg-primary rounded-xl flex flex-col items-center justify-center gap-3 sm:gap-6 text-white font-ancola text-2xl sm:text-4xl lg:text-5xl xl:text-6xl tracking-wider">
          <p>Why</p>
          <p>Choose</p>
          <p className="flex items-center justify-center gap-2">
            <CircleArrowRight
              size={64}
              color="black"
              className="max-sm:rotate-90"
            />
            Us
          </p>
        </div>
      </div>
      <div className="h-1/2 sm:h-full w-full sm:w-1/2 flex flex-col items-center justify-center">
        <p className="max-sm:mt-6 font-hora font-semibold text-lg xl:text-xl text-center">
          Get up-to-date vehicle information directly from NMVTIS and government
          agencies across the U.S., Canada, Australia, New Zealand, and the UK.
        </p>
        <div className="w-full mt-8 xl:mt-12 flex flex-col items-start gap-4 xl:gap-6 xl:px-6">
          {benefits.map((item) => (
            <BenefitItem item={item} key={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

const BenefitItem = ({ item }) => (
  <div className="w-full flex items-center gap-2 border-2 border-black rounded-xl px-6 py-3">
    <CircleCheckBig size={20} />
    <p className="font-hora font-bold text-sm xl:text-lg">{item}</p>
  </div>
);
