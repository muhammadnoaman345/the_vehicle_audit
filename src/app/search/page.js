"use client";

import { Suspense, useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  DollarSign,
  Gauge,
  History,
  Loader2,
  NotebookPen,
  Settings,
  ShieldAlert,
  Trash,
  Truck,
} from "lucide-react";
import { Testimonials } from "@/components/Testimonials/Testimonials";
import { motion } from "motion/react";
import { redirect, useSearchParams } from "next/navigation";

const metrics = [
  {
    label: "Accident",
    icon: <Truck className="text-white" size={24} />,
    percentage: 10,
  },
  {
    label: "Values",
    icon: <DollarSign className="text-white" size={24} />,
    percentage: 22,
  },
  {
    label: "Title Record",
    icon: <NotebookPen className="text-white" size={24} />,
    percentage: 34,
  },
  {
    label: "Recalls",
    icon: <AlertTriangle className="text-white" size={24} />,
    percentage: 46,
  },
  {
    label: "Problem Checks",
    icon: <ShieldAlert className="text-white" size={24} />,
    percentage: 56,
  },
  {
    label: "Specs",
    icon: <Settings className="text-white" size={24} />,
    percentage: 66,
  },
  {
    label: "Sales History",
    icon: <History className="text-white" size={24} />,
    percentage: 78,
  },
  {
    label: "Odometer",
    icon: <Gauge className="text-white" size={24} />,
    percentage: 88,
  },
  {
    label: "Salvage Records",
    icon: <Trash className="text-white" size={24} />,
    percentage: 100,
  },
];

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

function Page() {
  const [searchEntity, setSearchEntity] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const searchParams = useSearchParams();
  const val = searchParams.get("val");
  const packageName = searchParams.get("package");

  useEffect(() => {
    console.log("URL search parameter 'val': ", val);
    if (val) {
      if (val.length === 17) {
        setSearchEntity(1);
        setSearchValue(val);
      } else if (val.length === 7) {
        setSearchEntity(2);
        setSearchValue(val);
      } else {
        return;
      }
      toggleLoading();
    }
  }, [searchParams, val, searchValue]);

  const toggleLoading = () => {
    if (
      !searchValue ||
      searchValue.trim() === "" ||
      (searchEntity === 1 && searchValue.length !== 17) ||
      (searchEntity === 2 && searchValue.length >= 5 && searchValue.length <= 7)
    ) {
      console.log(searchEntity, searchValue);

      setError(true);
      setLoading(false);
      return;
    }
    setError(false);
    setLoading(true);

    setTimeout(() => {
      const loaderElement = document.querySelector("#loader-section");
      if (loaderElement) {
        const elementTop = loaderElement.getBoundingClientRect().top;
        const offsetPosition = elementTop + window.pageYOffset - 80;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100);

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          if (packageName) {
            redirect(`/checkout?package=${packageName}&val=${searchValue}`);
          } else {
            redirect(`/packages/car?val=${searchValue}`);
          }
        }
        return prevProgress + 2;
      });
    }, 100);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-16 px-6 xl:mt-24">
      {!val && (
        <div className="w-full flex flex-col items-center justify-center gap-6 py-12 px-6 rounded-xl border-2 border-primary">
          <p className="font-ancola text-primary text-center text-2xl lg:text-3xl xl:text-5xl">
            Know Your Ride, Before You Buy
          </p>
          <p className="max-sm:text-xs text-black font-hora text-center">
            Unlock important details and avoid costly surprises with a
            comprehensive vehicle history report. Make smarter decisions and
            drive with confidence.
          </p>

          <div className="text-black w-full flex flex-col items-center justify-center gap-3">
            <div className="w-3/5 max-sm:w-4/5 flex flex-col items-center justify-center">
              <div className="flex items-center justify-center gap-3 font-semibold text-xs xl:text-lg mb-3 font-hora">
                <p
                  className="font-ancola text-primary tracking-wider
"
                >
                  Search by:
                </p>
                <p
                  onClick={() => setSearchEntity(1)}
                  className={`${
                    searchEntity === 1 && "border-3 border-primary"
                  } rounded-lg px-2 py-1 cursor-pointer`}
                >
                  VIN
                </p>
                <p
                  onClick={() => setSearchEntity(2)}
                  className={`${
                    searchEntity === 2 && "border-3 border-primary"
                  } rounded-lg px-2 py-1 cursor-pointer`}
                >
                  License Plate
                </p>
              </div>
              <input
                value={searchValue}
                maxLength={searchEntity === 1 ? 17 : 7}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={
                  searchEntity === 1
                    ? "Enter VIN number"
                    : "Enter License Plate Number"
                }
                disabled={loading}
                className="w-full border-2 border-primary rounded-lg p-2 xl:p-3 placeholder:font-hora xl:text-lg placeholder:text-black placeholder:capitalize text-black uppercase"
              />
              {error && (
                <p className="text-red-500 text-xs xl:text-sm mt-2">
                  Please enter a valid
                  {searchEntity === 1 ? " VIN" : " license plate"} number.
                </p>
              )}
            </div>
            <button
              onClick={toggleLoading}
              disabled={loading}
              className="cursor-pointer flex items-center justify-center gap-1 xl:gap-3 font-hora bg-primary px-6 py-1 px-6 xl:py-3 rounded-full text-white text-sm sm:text-base xl:text-lg"
            >
              {loading ? (
                "Shaping Your Results..."
              ) : (
                <>
                  Get report
                  <ArrowRight size={28} />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {loading && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full flex flex-col items-center justify-center gap-6 py-6 bg-primary rounded-xl"
          id="loader-section"
        >
          <p className="text-center font-ancola text-white text-lg lg:text-xl xl:text-2xl">
            Searching Records For {searchValue}
          </p>

          <div className="w-3/5 flex items-center justify-center gap-3">
            <div
              className={`h-3 rounded-full bg-white transition-all duration-500 ease-in-out`}
              style={{ width: `${progress}%` }}
            ></div>
            <p className="font-hora text-white">{progress}%</p>
          </div>

          <div className="w-full grid grid-cols-2 gap-6 sm:flex sm:items-center sm:justify-center mt-6">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: progress >= metric.percentage ? 1 : 0,
                  scale: progress >= metric.percentage ? 1 : 0,
                }}
                transition={{
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={`flex flex-col items-center justify-center gap-2 ${
                  progress >= metric.percentage ? "opacity-100" : "hidden"
                }`}
              >
                <Check className="text-white" size={12} />
                {metric.icon}
                <p className="text-white font-hora text-sm xl:text-base">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      <Testimonials />
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
