"use client";

import { CheckIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

export const pricingData = {
  car: [
    {
      plan: "silver",
      price: "$39.99",
      perReport: "Per Report",
      features: [
        "Vehicle Overview",
        "Market Value",
        "Vehicle Specifications",
        "Sales Listing",
        "Accident Record",
        "Salvage",
        "Theft Record",
      ],
    },
    {
      plan: "gold",
      price: "$71.95",
      perReport: "Per Report",
      features: [
        "HQ Car Images",
        "Vehicle Overview",
        "Market Value",
        "Vehicle Specifications",
        "Sales Listing",
        "Accident Record",
        "Salvage",
        "Theft Record",
        "Title Record",
        "Impounds",
        "Exports",
        "Open Recalls",
        "Installed Options and Packages",
        "Active/Expire Warranty",
      ],
    },
    {
      plan: "platinum",
      price: "$99.99",
      perReport: "Per Report",
      features: [
        "2 Buyers Numbers from our Directory",
        "Buy one get another Report Free for Lifetime",
        "HQ Car Images",
        "Vehicle Overview",
        "Market Value",
        "Vehicle Specifications",
        "Sales Listing",
        "Accident Record",
        "Salvage",
        "Theft Record",
        "Title Record",
        "Impounds",
        "Exports",
        "Open Recalls",
        "Installed Options and Packages",
        "Active/Expire Warranty",
      ],
    },
  ],
  rv: [
    {
      plan: "silver",
      price: "$39.99",
      perReport: "Per Report",
      features: [
        "Vehicle Overview",
        "Market Value",
        "Vehicle Specifications",
        "Sales Listing",
        "Accident Record",
        "Salvage",
        "Theft Record",
      ],
    },
    {
      plan: "gold",
      price: "$71.95",
      perReport: "Per Report",
      features: [
        "HQ Car Images",
        "Vehicle Overview",
        "Market Value",
        "Vehicle Specifications",
        "Sales Listing",
        "Accident Record",
        "Salvage",
        "Theft Record",
        "Title Record",
        "Impounds",
        "Exports",
        "Open Recalls",
        "Installed Options and Packages",
        "Active/Expire Warranty",
      ],
    },
    {
      plan: "platinum",
      price: "$99.99",
      perReport: "Per Report",
      features: [
        "2 Buyers Numbers from our Directory",
        "Buy one get another Report Free for Lifetime",
        "HQ Car Images",
        "Vehicle Overview",
        "Market Value",
        "Vehicle Specifications",
        "Sales Listing",
        "Accident Record",
        "Salvage",
        "Theft Record",
        "Title Record",
        "Impounds",
        "Exports",
        "Open Recalls",
        "Installed Options and Packages",
        "Active/Expire Warranty",
      ],
    },
  ],
  bike: [
    {
      plan: "silver",
      price: "$29.99",
      perReport: "Per Report",
      features: [
        "Vehicle Overview",
        "Market Value",
        "Vehicle Specifications",
        "Sales Listing",
        "Accident Record",
        "Salvage",
        "Theft Record",
      ],
    },
    {
      plan: "gold",
      price: "$71.95",
      perReport: "Per Report",
      features: [
        "HQ Car Images",
        "Vehicle Overview",
        "Market Value",
        "Vehicle Specifications",
        "Sales Listing",
        "Accident Record",
        "Salvage",
        "Theft Record",
        "Title Record",
        "Impounds",
        "Exports",
        "Open Recalls",
        "Installed Options and Packages",
        "Active/Expire Warranty",
      ],
    },
    {
      plan: "platinum",
      price: "$99.99",
      perReport: "Per Report",
      features: [
        "2 Buyers Numbers from our Directory",
        "Buy one get another Report Free for Lifetime",
        "HQ Car Images",
        "Vehicle Overview",
        "Market Value",
        "Vehicle Specifications",
        "Sales Listing",
        "Accident Record",
        "Salvage",
        "Theft Record",
        "Title Record",
        "Impounds",
        "Exports",
        "Open Recalls",
        "Installed Options and Packages",
        "Active/Expire Warranty",
      ],
    },
  ],
};

export default function Page() {
  const { type } = useParams();
  const searchParams = useSearchParams();
  const val = searchParams.get("val");

  return (
    <div className="flex flex-col items-center justify-center gap-16 px-6 xl:mt-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={true}
        transition={{ duration: 0.8 }}
        className="w-full px-6"
      >
        <p className="text-center font-ancola text-primary text-2xl lg:text-3xl xl:text-5xl mb-6">
          Get Your <span className="capitalize">{type}</span>&apos;s Inspection
          Report!
        </p>

        <p className="text-center font-hora sm:text-lg">
          Drive with confidence and peace of mind. Our premium inspection
          reports provide in-depth insights, ensuring your vehicle is in top
          condition. Choose your plan and experience the safest drive today.
        </p>
      </motion.div>

      <div className="w-full grid grid-cols-1 grid-rows-3 sm:grid-cols-3 sm:grid-rows-1 gap-9 sm:gap-3 mb-24">
        {pricingData[type].map((tier, index) => (
          <PricingCard
            key={index}
            tier={tier}
            type={type}
            index={index}
            val={val}
          />
        ))}
      </div>
    </div>
  );
}

const PricingCard = ({ tier, type, index, val }) => {
  const xValue = index === 0 ? -200 : index === 1 ? 0 : 200;
  const yValue = index === 1 && 200;

  return (
    <motion.div
      initial={{ opacity: 0, x: xValue, y: yValue }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="max-sm:h-[60vh] h-[90vh] flex flex-col items-center justify-between pb-3 rounded-2xl shadow-lg hover:shadow-xl border-2 border-primary overflow-hidden"
    >
      <h3 className="w-full py-3 capitalize text-lg xl:text-2xl text-white text-center font-bold font-hora bg-primary">
        {tier.plan}
      </h3>

      <div>
        <span className="text-2xl xl:text-3xl font-bold font-hora text-gray-900">
          {tier.price}
        </span>
        <span className="xl:text-lg font-hora text-black"> per report</span>
      </div>

      <ul className="max-sm:h-2/5 h-3/5 my-3 space-y-1">
        {tier.features.map((feature, index) => (
          <li
            key={index}
            className="flex items-center font-hora text-xs xl:text-base"
          >
            <CheckIcon size={16} className="mr-3 text-primary" />
            <span className="text-black">{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href={
          val
            ? `/checkout?package=${type}-${tier.plan}&val=${val}`
            : `/search?package=${type}-${tier.plan}`
        }
        className="w-2/3 text-sm py-2 xl:py-3 rounded-full font-hora cursor-pointer bg-primary text-white text-center hover:bg-primary/90"
      >
        Choose Plan
      </Link>
    </motion.div>
  );
};
