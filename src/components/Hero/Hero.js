"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  const [searchEntity, setSearchEntity] = useState(1);

  return (
    <section className="sm:h-[60dvh] w-full flex max-sm:flex-col items-center justify-between sm:justify-center">
      <div className="sm:h-full w-1/2 max-sm:w-full flex flex-col items-start max-sm:items-center justify-center gap-6 sm:pl-6">
        <p className="font-ancola font-bold text-primary text-2xl lg:text-3xl xl:text-5xl">
          Know Your Ride,
          <span className="block mt-3">Before You Buy</span>
        </p>
        <p className="font-hora max-sm:text-center">
          Unlock important details and avoid costly surprises with a
          comprehensive vehicle history report. Make smarter decisions and drive
          with confidence.
        </p>

        <div className="w-full flex max-sm:flex-col items-center sm:items-end justify-start gap-3 sm:gap-6 xl:mt-6">
          <div className="w-3/5 max-sm:w-4/5">
            <div className="flex items-center justify-center gap-3 font-semibold text-xs xl:text-lg mb-3 font-hora">
              <p
                className="font-ancola text-primar tracking-wider
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
              type="number"
              className="w-full border-2 border-primary rounded-lg p-2 xl:p-3 placeholder:font-hora xl:text-lg"
              placeholder={
                searchEntity === 1
                  ? "Enter VIN number"
                  : "Enter License Plate Number"
              }
            />
          </div>
          <button className="flex items-center justify-center mb-[1px] gap-1 xl:gap-3 font-hora bg-gradient-to-br from-primary to-muted px-3 py-2 xl:px-6 xl:py-3 rounded-full text-white sm:text-sm xl:text-lg">
            Get report <ArrowRight size={28} />
          </button>
        </div>
      </div>

      <div className="md:h-full h-[25dvh] w-4/5 md:w-1/2  max-sm:mt-16 bg-primary rounded-xl sm:ml-12 sm:mr-6 sm:pl-3">
        <img
          src="/assets/images/hero-car.png"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};
