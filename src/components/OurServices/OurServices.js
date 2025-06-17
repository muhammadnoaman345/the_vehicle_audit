import { motion } from "motion/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { images } from "../../../public/assets/images";
import { Marquee } from "../magicui/marquee";

const servicesContent = [
  {
    title: "Title History",
    description:
      "Includes current and past title records sourced from the National Motor Vehicle Title Information System (NMVTIS). This information helps verify the vehicle’s ownership history, ensuring it has no legal complications or outstanding liens.",
    imgPath: images.serviceItems[0],
  },
  {
    title: "Warranty Coverage",
    description:
      "Details the manufacturer's warranty, including drivetrain and safety system coverage. It also provides insights into the remaining coverage period and what parts of the vehicle are still under warranty, offering peace of mind for potential buyers.",
    imgPath: images.serviceItems[1],
  },
  {
    title: "Inspection Records",
    description:
      "Covers inspection dates, safety checks, driver issues, hazardous materials violations, and other relevant details. These records ensure the vehicle is safe to drive and complies with federal and state regulations, providing a clear history of its roadworthiness.",
    imgPath: images.serviceItems[3],
  },
  {
    title: "Vehicle Registration History",
    description:
      "Displays current registration status and previous registration events with dates. This helps track the vehicle's legal standing and location history and assists in verifying its authenticity.",
    imgPath: images.serviceItems[4],
  },
  {
    title: "Vehicle Valuation Insights",
    description:
      "Provides trusted valuation data for cars and trucks, useful for trade-ins or sales. This information considers factors like make, model, mileage, condition, and market trends to give a fair market value, aiding both sellers and buyers in pricing negotiations.",
    imgPath: images.serviceItems[5],
  },
  {
    title: "Stolen Vehicle Status",
    description:
      "Highlights vehicles reported stolen, with information on their recovery status. This allows potential buyers to verify that the vehicle has not been involved in criminal activities and confirms its legal ownership before making a purchase.",
    imgPath: images.serviceItems[2],
  },
];

const OurServices = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="w-full md:px-12"
    >
      <p className="text-center font-ancola text-primary text-2xl lg:text-3xl xl:text-5xl mb-9">
        Our Services
      </p>

      {/* Services Cards */}
      <div className="w-full mb-20 sm:mb-40">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {servicesContent.map((service, index) => (
              <CarouselItem
                key={index}
                className="md:basis-2/3 lg:basis-1/3 md:mx-3"
              >
                <ServiceItem
                  ImgPath={service.imgPath}
                  title={service.title}
                  description={service.description}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* Flags Animation */}
      <div className="w-full">
        <p className="text-center font-ancola text-primary text-2xl lg:text-3xl xl:text-5xl mb-16">
          We Provide Services In
        </p>
        <div className="w-full flex items-center justify-center">
          <Marquee pauseOnHover className="[--duration:20s] w-full">
            {images.flags.map((data, index) => (
              <FlagItem key={index} country={data.country} path={data.path} />
            ))}
          </Marquee>
        </div>
      </div>
    </motion.div>
  );
};

const ServiceItem = ({ ImgPath, title, description }) => {
  return (
    <div className="h-[65dvh] sm:h-[90dvh] flex flex-col items-start justify-around gap-3 2xl:gap-0 bg-primary rounded-xl shadow-xl shadow-gray-400 px-3 py-3 sm:py-6">
      <div className="w-full h-[40dvh]">
        <img
          src={ImgPath}
          alt="Service Image"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      <p className="font-hora font-bold text-2xl mt-3">{title}</p>
      <p className="text-white text-sm xl:text-lg">{description}</p>
    </div>
  );
};

const FlagItem = ({ country, path }) => {
  return (
    <div className="w-32 xl:w-40 mx-4 sm:mx-12 xl:mx-20">
      <img className="h-32 xl:h-40 w-full rounded-full mb-3" src={path} />
      <p className="text-center font-hora font-bold text-primary text-lg">
        {country}
      </p>
    </div>
  );
};

export default OurServices;
