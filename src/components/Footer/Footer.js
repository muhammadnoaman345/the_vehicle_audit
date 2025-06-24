"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, FileSignatureIcon } from "lucide-react";

export default function Footer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={true}
      transition={{ duration: 0.8 }}
      className="w-full grid grid-cols-1 grid-rows-4 sm:grid-cols-4 sm:grid-rows-1 gap-6 xl:gap-12 bg-zinc-950 mt-16 px-6 py-6 relative"
    >
      <div className="absolute -top-10 left-12 sm:left-2 w-3/4 sm:w-1/4 flex flex-col items-center justify-center gap-6 bg-primary rounded-tr-4xl max-sm:mb-3 px-3 py-9 text-center text-white">
        <FileSignatureIcon size={48} />
        <p className="text-lg xl:text-xl font-hora font-semibold">
          Sign up to unlock your premium report!
        </p>
        <input
          placeholder="Email Address"
          className="w-full xl:w-3/4 text-sm xl:text-base border-2 border-white p-2 xl:p-3 rounded-lg font-hora placeholder:text-white placeholder:font-hora"
        />
        <button className="w-full xl:w-2/3 bg-white text-black font-hora tracking-wider text-sm xl:text-lg rounded-full px-3 py-2 cursor-pointer">
          Get A Quote
        </button>
      </div>

      {/* Jugaad */}
      <div className="flex flex-col items-center justify-center gap-6 rounded-tr-4xl max-sm:mb-3 px-3 py-3 xl:py-6 text-center text-black">
        <FileSignatureIcon size={48} />
        <p className="text-lg xl:text-xl font-hora font-semibold">
          Sign up to unlock your premium report!
        </p>
        <input
          placeholder="Email Address"
          className="w-full xl:w-3/4 text-sm xl:text-base p-2 xl:p-3 rounded-lg font-hora placeholder:font-hora"
        />
        <button className="w-full xl:w-2/3 text-black font-hora tracking-wider text-sm xl:text-lg rounded-full px-3 py-2 cursor-pointer">
          Get A Quote
        </button>
      </div>

      <div className="flex flex-col items-center justify-around max-sm:mb-3 border-2 border-primary rounded-tl-4xl rounded-br-4xl px-3 xl:px-6">
        <p className="text-primary font-ancola tracking-wider sm:text-xl xl:text-3xl font-thin">
          theVehicle
          <span className="block ml-6 xl:ml-8">Audit</span>
        </p>
        <p className="text-white font-hora text-center text-sm xl:text-base">
          VIN Records History and Title Reports offer valuable insights, a
          dealer-focused service, and exceptional customer support.
        </p>
      </div>

      <div className="flex flex-col items-center sm:items-start sm:items-center justify-around gap-6 border-2 border-primary rounded-tl-4xl rounded-br-4xl">
        <p className="text-white font-ancola tracking-wider sm:text-lg xl:text-2xl font-thin">
          Quick Links
        </p>

        <div className="flex flex-col items-start justify-center gap-1 xl:gap-2 font-hora text-white text-sm xl:text-lg">
          <div className="flex gap-3">
            <ArrowRight className="text-primary" />
            <Link href="/">Home</Link>
          </div>
          <div className="flex gap-3">
            <ArrowRight className="text-primary" />
            <Link href="/about">About Us</Link>
          </div>
          <div className="flex gap-3">
            <ArrowRight className="text-primary" />
            <Link href="/pricing">Pricing</Link>
          </div>
          <div className="flex gap-3">
            <ArrowRight className="text-primary" />
            <Link href="/contact">Contact Us</Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center sm:items-start sm:items-center justify-around sm:justify-around gap-6 border-2 border-primary rounded-tl-4xl rounded-br-4xl">
        <p className="text-white font-ancola tracking-wider sm:text-lg xl:text-2xl font-thin">
          Get in touch
        </p>

        <div className="flex flex-col items-start justify-center gap-3 px-2 font-hora text-white text-sm xl:text-lg">
          <p>+447577303327</p>
          <p>124 City Road, London EC1V 2NX UK</p>
          <p>
            If you have any questions or need help, feel free to contact with
            our team.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
