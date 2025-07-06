"use client";

import { motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { images } from "../../../public/assets/images";
import { pricingData } from "../packages/[type]/page";
import { Check } from "lucide-react";

export default function Page() {
  const searchParams = useSearchParams();
  const val = searchParams.get("val");
  const packageName = searchParams.get("package");
  const type = packageName.split("-")[0];
  const name = packageName.split("-")[1];
  const report = pricingData[type].filter((report) => report.plan === name)[0];

  return (
    <div className="w-full px-6 xl:mt-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={true}
        transition={{ duration: 0.8 }}
        className="w-full px-6 mb-6"
      >
        <p className="text-center font-ancola text-primary text-2xl lg:text-3xl xl:text-5xl mb-6 capitalize">
          Get Your {type}&apos;s Inspection Report Now
        </p>
        <p className="text-center font-hora sm:text-lg">
          Your detailed inspection report is ready! Simply fill out the required
          details, and receive your premium report instantly. Don&apos;t miss
          out on valuable insights—complete your information and get your
          premium report now!
        </p>
      </motion.div>

      <div className="w-full flex max-sm:flex-col items-start justify-center px-3 overflow-hidden border-0 border-red-800">
        {/* Report Div */}
        <div className="w-3/4 border-0 border-red-800">
          {/* Image and Vin Div */}
          <div className="w-full flex border-0 border-green-800">
            <img
              className="w-2/5 h-40 xl:h-60 blur-xs"
              src={images.blurImgs.bike}
            />
            <div className="w-3/5 flex flex-col items-center justify-around">
              <p className="font-hora text-2xl lg:text-3xl xl:text-5xl text-primary">
                {val.length === 17 ? "VIN:" : "Lisence Plate:"}
              </p>
              <p className="font-hora text-2xl lg:text-3xl xl:text-5xl">
                {val}
              </p>
            </div>
          </div>
        </div>

        {/* Side Div With Details */}
        <div className="w-1/4 border-2 rounded-lg pb-3">
          {/* Summary div */}
          <div className="w-full p-3 bg-gray-100 rounded-md">
            <p className="font-ancola font-bold tracking-wider text-sm xl:text-lg mb-6">
              Order Summary:
            </p>

            {/* Order cost and plan */}
            <div className="w-full flex items-center justify-between mb-1">
              <p className="font-hora">Package:</p>
              <p className="font-hora text-primary capitalize">{name}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="font-hora">Total:</p>
              <p className="font-hora text-primary">{report.price}</p>
            </div>
          </div>

          {/* Features */}
          <p className="font-ancola text-primary text-lg m-3">Package Perks:</p>

          <div className="w-full px-3 border-0 border-red-800">
            {report.features.map((text, index) => (
              <p
                key={index}
                className="flex items-center gap-3 font-hora text-sm"
              >
                <Check className="text-primary" size={16} />
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
