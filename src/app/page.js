import { ArrowRight } from "lucide-react";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="sm:h-[60dvh] flex max-sm:flex-col items-center justify-between sm:justify-center">
        <div className="sm:h-full w-1/2 max-sm:w-full flex flex-col items-start max-sm:items-center justify-center gap-6 sm:pl-6">
          <p className="font-ancola font-bold text-primary text-2xl lg:text-3xl xl:text-5xl">
            Know Your Ride,
            <span className="block mt-3">Before You Buy</span>
          </p>
          <p className="font-hora max-sm:text-center">
            Unlock important details and avoid costly surprises with a
            comprehensive vehicle history report. Make smarter decisions and
            drive with confidence.
          </p>

          <div className="w-full flex max-sm:flex-col items-center justify-start gap-3 sm:gap-6 xl:mt-6">
            <input
              type="number"
              className="w-3/5 max-sm:w-4/5 border-2 border-primary rounded-lg p-2 xl:p-3 placeholder:font-hora xl:text-lg"
              placeholder="Enter VIN number"
            />
            <button className="flex items-center justify-center gap-1 xl:gap-3 font-hora bg-primary px-4 py-2 xl:px-6 rounded-full text-white sm:text-sm xl:text-lg">
              Get report <ArrowRight size={28} />
            </button>
          </div>
        </div>

        <div className="md:h-full h-[25dvh] w-[50dvh] md:w-1/2  max-sm:mt-16 relative">
          <div className="w-1/3 h-full bg-[#01AAF9] z-0 absolute left-1/3"></div>
          <img
            src="/assets/images/hero-car.png"
            className="w-full h-full object-cover absolute top-0 left-0 z-10"
          />
        </div>
      </section>
    </div>
  );
}

export default Home;
