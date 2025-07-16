import { motion } from "motion/react";
import { images } from "../../../public/assets/images";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import Loading from "../Loading/Loading";

const Card = ({ index, type, path, url, val }) => {
  const xValue = index === 0 ? -200 : index === 1 ? 0 : 200;
  const yValue = index === 1 && 200;

  return (
    <motion.div
      initial={{ opacity: 0, x: xValue, y: yValue }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`
          flex flex-col items-center justify-between gap-3 sm:gap-6 rounded-2xl px-6 py-3 xl:p-6 mx-3 relative border-2 border-primary bg-white text-primary shadow-lg hover:shadow-xl border-2 border-primary overflow-hidden`}
    >
      {index === 0 && (
        <div className="absolute top-3 xl:top-8 -right-24 sm:-right-20 xl:-right-16 rotate-45 bg-black text-white max-sm:text-sm py-0 sm:py-2 font-medium w-60 text-center">
          Popular
        </div>
      )}
      <h3
        className={`text-2xl font-bold font-hora mb-2 text-gray-900 capitalize`}
      >
        {type} Report
      </h3>
      <img src={path} alt={`${type} Report`} className="w-full h-40 xl:h-60" />
      <Link
        href={val ? url + `?val=${val}` : url}
        className="w-1/2 text-sm py-2 xl:py-3 rounded-full font-hora cursor-pointer bg-primary text-white hover:bg-primary/90 text-center"
      >
        Order Now
      </Link>
    </motion.div>
  );
};

const Section = () => {
  const searchParams = useSearchParams();
  const val = searchParams.get("val");
  return (
    <div id="pricing" className="w-full">
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={true}
        transition={{ duration: 0.8 }}
        className="text-center font-ancola text-primary text-2xl lg:text-3xl xl:text-5xl mb-3"
      >
        What We Offer
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center font-hora sm:text-lg mb-12"
      >
        Unlock accurate and trusted data records at competitive prices, offering
        true value for your investment
      </motion.p>

      <div className="w-full grid grid-cols-1 grid-rows-3 sm:grid-cols-3 sm:grid-rows-1 gap-9 sm:gap-3">
        {images.reports.map((report, index) => (
          <Card
            key={index}
            index={index}
            type={report.type}
            path={report.path}
            url={report.url}
            val={val}
          />
        ))}
      </div>
    </div>
  );
};

export const Pricing = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Section />
    </Suspense>
  );
};
