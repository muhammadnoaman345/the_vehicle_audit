import { ArrowRight } from "lucide-react";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="h-[60dvh] flex items-center justify-center">
        <div className="h-full w-1/2 flex flex-col items-start justify-center gap-6 pl-6">
          <p className="font-ancola font-bold text-primary text-5xl">
            Know Your Ride,
            <span className="block mt-3">Before You Buy</span>
          </p>
          <p className="font-hora">
            Unlock important details and avoid costly surprises with a
            comprehensive vehicle history report. Make smarter decisions and
            drive with confidence.
          </p>

          <div className="w-full flex items-center justify-start gap-6 mt-6">
            <input
              type="number"
              className="w-3/5 border-2 border-primary rounded-lg p-3 placeholder:font-hora text-lg"
              placeholder="Enter VIN number"
            />
            <button className="flex items-center justify-center gap-3 font-hora bg-primary py-3 px-6 rounded-full text-white text-lg">
              Get report <ArrowRight size={28} />
            </button>
          </div>
        </div>
        <div className="h-full w-1/2 relative">
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
