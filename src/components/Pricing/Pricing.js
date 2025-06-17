import { motion } from "motion/react";
import { CheckIcon } from "lucide-react";

const pricingPlans = [
  {
    price: "$39.99",
    type: "Car Report",
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
    price: "$39.99",
    type: "RV Report",
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
    price: "$29.99",
    type: "Motorbike Report",
    features: [
      "2 Buyers Numbers from our Directory",
      "Buy One, Get Another Report Free for Lifetime",
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
];

export const Pricing = () => {
  return (
    <div className="w-full">
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={true}
        transition={{ duration: 0.8 }}
        className="text-center font-ancola text-primary text-2xl lg:text-3xl xl:text-5xl mb-3"
      >
        Pricing
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center font-hora sm:text-lg mb-12"
      >
        Unlock premium features at competitive prices, offering true value for
        your investment
      </motion.p>

      <div className="w-full grid grid-cols-1 grid-rows-3 sm:grid-cols-3 sm:grid-rows-1 gap-9 sm:gap-3">
        {pricingPlans.map((plan, index) => (
          <PricingCard
            key={index}
            tier={{
              name: `Plan ${index + 1}`,
              price: plan.price,
              type: plan.type,
              period: "per report",
              features: plan.features,
              isPopular: index === 1,
              description:
                index === 0
                  ? "Basic Plan"
                  : index === 1
                  ? "Premium Plan"
                  : "Economy Plan",
            }}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

const PricingCard = ({ tier, index }) => {
  const xValue = index === 0 ? -200 : index === 1 ? 0 : 200;
  const yValue = index === 1 && 200;

  return (
    <motion.div
      initial={{ opacity: 0, x: xValue, y: yValue }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`
        h-[78vh] sm:h-[98dvh] flex flex-col items-center justify-between rounded-2xl px-6 py-3 xl:p-6 mx-3 relative
        ${
          tier.isPopular
            ? "bg-primary text-white shadow-2xl animate-glow ring-2 ring-white"
            : "bg-white text-primary shadow-lg hover:shadow-xl border-2 border-primary"
        }
      `}
    >
      <div className="absolute -top-5">
        <span className="bg-white text-primary border-2 border-primary px-3 py-1 rounded-full text-sm font-medium">
          {tier.type}
        </span>
      </div>

      <div className="text-center">
        <h3
          className={`text-lg xl:text-2xl font-bold font-hora mb-2 ${
            tier.isPopular ? "text-white" : "text-gray-900"
          }`}
        >
          {tier.name}
        </h3>
        <p
          className={`text-sm mb-3 font-hora ${
            tier.isPopular ? "text-white" : "text-black"
          }`}
        >
          {tier.description}
        </p>

        <div className="mb-3">
          <span
            className={`text-3xl xl:text-5xl font-bold font-hora ${
              tier.isPopular ? "text-white" : "text-gray-900"
            }`}
          >
            {tier.price}
          </span>
          <span
            className={`xl:text-lg font-hora ${
              tier.isPopular ? "text-white" : "text-black"
            }`}
          >
            {tier.period}
          </span>
        </div>
      </div>

      <ul
        className={`space-y-1 mb-2 ${
          tier.name === "Plan 3" && "overflow-y-scroll"
        }`}
      >
        {tier.features.map((feature, index) => (
          <li
            key={index}
            className="flex items-center font-hora text-xs xl:text-base"
          >
            <CheckIcon
              size={16}
              className={`mr-3 ${
                tier.isPopular ? "text-white" : "text-primary"
              }`}
            />
            <span className={tier.isPopular ? "text-white" : "text-black"}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <button
        className={`
          w-full text-sm py-2 xl:py-3 rounded-full font-hora cursor-pointer
          ${
            tier.isPopular
              ? "bg-white text-primary shadow-lg"
              : "bg-primary text-white hover:bg-primary/90"
          }
        `}
      >
        Choose PLan
      </button>
    </motion.div>
  );
};
