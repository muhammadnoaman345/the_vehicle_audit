"use client";
import { motion } from "motion/react";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { images } from "../../../public/assets/images";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Hero = () => {
  const [searchEntity, setSearchEntity] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState(false);

  const handleClick = () => {
    if (
      !searchValue ||
      searchValue.trim() === "" ||
      (searchEntity === 1 && searchValue.length !== 17) ||
      (searchEntity === 2 && searchValue.length >= 5 && searchValue.length <= 7)
    ) {
      setError(true);
      return;
    }

    const url = new URL(window.location.href);
    url.searchParams.set("val", searchValue);
    window.history.pushState({}, "", url);

    setTimeout(() => {
      const section = document.getElementById("pricing");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="w-full flex flex-col items-center justify-between gap-6 overflow-hidden"
    >
      <div className="w-full flex flex-col items-center justify-center gap-6 max-sm:px-3 lg:pl-4 xl:pl-12 py-6 relative rounded-xl overflow-hidden">
        {/* Hero Content */}
        <div className="z-10 w-full sm:w-1/2 flex flex-col items-center justify-center gap-6 py-3 bg-white/85 bg-opacity-50 rounded-xl">
          <p className="font-ancola font-bold text-primary text-center text-2xl lg:text-3xl xl:text-5xl">
            Know Your Ride,
            <span className="block mt-3">Before You Buy</span>
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
                onChange={(e) =>
                  setSearchValue(e.target.value.trim().toUpperCase())
                }
                placeholder={
                  searchEntity === 1
                    ? "Enter VIN number"
                    : "Enter License Plate Number"
                }
                className="w-full border-2 border-primary rounded-lg p-2 xl:p-3 placeholder:font-hora xl:text-lg placeholder:text-black 
                text-black"
              />
              {error && (
                <p className="text-red-500 text-xs xl:text-sm mt-2">
                  Please enter a valid
                  {searchEntity === 1 ? " VIN" : " license plate"} number.
                </p>
              )}
            </div>
            <button
              onClick={handleClick}
              className="flex items-center justify-center mb-[1px] gap-1 xl:gap-3 font-hora bg-primary px-3 py-2 xl:px-6 xl:py-3 rounded-full text-white sm:text-sm xl:text-lg cursor-pointer"
            >
              Get report <ArrowRight size={28} />
            </button>
          </div>
        </div>

        {/* Bg Image */}
        <Image
          src={images.heroBackground}
          alt="Hero Background"
          width={1000}
          height={500}
          className="absolute bottom-0 left-0 w-full  h-full sm:h-auto object-cover z-0 opacity-80"
        />
      </div>
      <div className="w-full flex items-center justify-around gap-3 bg-primary rounded-xl py-6">
        {images.heroItems.map((item, index) => (
          <img
            src={item}
            alt={`Hero Item ${index + 1}`}
            key={index}
            className="h-4 w-8 sm:h-8 sm:w-16 xl:h-10 xl:w-20"
          />
        ))}
      </div>
    </motion.section>
  );
};

export default Hero;
