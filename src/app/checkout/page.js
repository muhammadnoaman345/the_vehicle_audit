"use client";

import { motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { images } from "../../../public/assets/images";
import { pricingData } from "../packages/[type]/page";
import { Check, CheckCheck, CheckCircle, Loader2 } from "lucide-react";
import { Suspense } from "react";

export default function PageWithSuspense() {
  return (
    <Suspense fallback={<Loading />}>
      <Page />
    </Suspense>
  );
}

const details = [
  "Year",
  "Make, Model",
  "Base",
  "Drive Type",
  "Brake System",
  "Engine",
  "Manufactured In",
  "Body Style",
  "Tires",
  "Transmission",
  "Warranty",
  "MSRP",
];

function Page() {
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

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={true}
        transition={{ duration: 0.8 }}
        className="w-full flex max-sm:flex-col items-start justify-center px-3 overflow-hidden border-0 border-red-800"
      >
        {/* Report Div */}
        <div className="w-full sm:w-3/4 border-0 border-red-800">
          {/* Image and Vin Div */}
          <div className="w-full sm:w-4/5 flex border-2 border-green-800 rounded-lg overflow-hidden mx-auto">
            <img
              className="w-2/5 h-28 sm:h-40 xl:h-60 blur-xs"
              src={images.blurImgs[type]}
            />
            <div className="w-3/5 flex flex-col items-center justify-center gap-3">
              <p className="font-ancola text-md sm:text-2xl lg:text-3xl xl:text-5xl text-primary">
                {val.length === 17 ? "VIN:" : "Lisence Plate:"}
              </p>
              <p className="font-hora text-md sm:text-2xl lg:text-3xl xl:text-5xl">
                {val}
              </p>
            </div>
          </div>

          {/* Metrics Div */}
          <div className="w-full sm:w-4/5 grid grid-cols-4 grid-rows-2 gap-12 sm:gap-6 mt-6 mx-auto p-6 bg-primary rounded-tl-4xl rounded-br-4xl">
            {images.auditMetrics.map((metric, index) => (
              <div
                key={index}
                className={`flex flex-col items-center justify-around gap-2 ${
                  index === 1 && "hidden"
                }`}
              >
                <CheckCircle className="text-white" size={16} />
                <img src={metric.path} className="h-8 xl:h-12 w-8 xl:w-12" />
                <p className="text-white font-hora font-semibold text-sm xl:text-base text-center">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          <div className="w-full sm:w-4/5 grid grid-cols-2 grid-rows-4 gap-3 sm:gap-6 mt-6 mx-auto p-4 sm:p-6 bg-primary rounded-tl-4xl rounded-br-4xl">
            {details.map((v, index) => (
              <div
                key={index}
                className="flex flex-col items-start justify-around bg-white px-2 sm:py-1 rounded-tl-lg rounded-br-lg"
              >
                <p className="text-primary font-hora font-semibold text-sm xl:text-base">
                  {v}
                </p>
                <p className="blur-xs text-sm">XXXX</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Div With Details */}
        <div className="w-full sm:w-1/4 max-sm:mt-6">
          {/* Summary div */}
          <div className="w-full border-2 rounded-lg pb-3 ">
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
            <p className="font-ancola text-primary text-lg m-3">
              Package Perks:
            </p>
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

          {/* Pay Now Button */}
          <button className="w-full font-hora text-white bg-black rounded-tl-xl rounded-br-xl py-3 mt-6 sm:mt-3 cursor-pointer">
            Pay Now
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function Loading() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-16 px-6 xl:mt-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }} // Fade-in effect
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, loop: Infinity, ease: "linear" }}
      >
        <Loader2 className="w-12 h-12 text-primary" />{" "}
      </motion.div>
    </motion.div>
  );
}
