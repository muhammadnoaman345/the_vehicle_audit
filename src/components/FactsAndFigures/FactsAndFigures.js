import React from "react";
import { motion } from "motion/react";
import { images } from "../../../public/assets/images";
import { Handshake, Ribbon, ShieldHalf, SmilePlus } from "lucide-react";
import { NumberTicker } from "../magicui/number-ticker";

const statistics = [
  { figure: 200, entity: "Happy Customers", icon: <SmilePlus size={36} /> },
  { figure: 500, entity: "Reports Sold", icon: <ShieldHalf size={36} /> },
  { figure: 5, entity: "Years of Expertise", icon: <Ribbon size={36} /> },
  { figure: 10, entity: "Active Partners", icon: <Handshake size={36} /> },
];

export const FactsAndFigures = () => {
  return (
    <div className="w-full grid max-sm:grid-rows-2 sm:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -200 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-sm:row-span-3 flex flex-col gap-6 sm:pl-9"
      >
        <p className="max-sm:text-center font-ancola text-primary text-2xl lg:text-3xl xl:text-5xl">
          Verified Vehicle Data Insights
        </p>
        <p className="max-sm:text-center font-hora text-lg">
          With over 40 billion vehicle records accumulated from a wide range of
          trusted sources, Epic Vin Check stands as the leading authority in
          vehicle data.
        </p>

        <div className="w-full grid grid-cols-2 sm:grid-rows-2 gap-3">
          {statistics.map((stat, index) => (
            <Item
              key={index}
              figure={stat.figure}
              entity={stat.entity}
              icon={stat.icon}
            />
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-sm:h-[20vh] max-sm:mt-12 flex items-center justify-center"
      >
        <img src={images.carImage} alt="Facts and Figures" />
      </motion.div>
    </div>
  );
};

const Item = ({ figure, entity, icon }) => {
  return (
    <div className="max-sm:flex flex-col items-center justify-centerrounded-lg sm:py-3 sm:px-3">
      <div className="text-primary mb-2">{icon}</div>
      <p className="font-hora font-bold text-xl md:text-2xl">
        <NumberTicker value={figure} />
        {figure === 10 ? "+" : "K+"}
      </p>
      <p className="text-sm sm:text-lg">{entity}</p>
    </div>
  );
};
