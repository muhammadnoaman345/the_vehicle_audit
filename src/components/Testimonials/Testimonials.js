"use client";

import { Quote } from "lucide-react";
import { Marquee } from "../magicui/marquee";

const clientReviews = {
  firstRow: [
    {
      name: "Sarah Johnson",
      review:
        "Epic Vin Check has been a game-changer for us. Their detailed vehicle reports helped us make informed decisions quickly. Highly recommended!",
    },
    {
      name: "Michael Thompson",
      review:
        "I’ve used several vehicle report services before, but none compare to the accuracy and reliability of Epic Vin Check. They’ve earned a loyal customer!",
    },
    {
      name: "Jessica Williams",
      review:
        "Fantastic service! The reports are clear, and the turnaround time is impressive. It's made our vehicle purchasing process so much easier.",
    },
    {
      name: "David Smith",
      review:
        "We’ve trusted Epic Vin Check for over a year now, and their insights have never failed us. Excellent customer service and fast, thorough reports!",
    },
    {
      name: "Emily Davis",
      review:
        "I’ve been able to verify the history of so many vehicles with their reports. The detailed information provided is invaluable for our business.",
    },
  ],
  secondRow: [
    {
      name: "John Brown",
      review:
        "Epic Vin Check offers exceptional value for the price. Their reports are comprehensive and easy to understand. It’s the only service I trust!",
    },
    {
      name: "Linda Garcia",
      review:
        "The accuracy of the vehicle history reports is unmatched. Epic Vin Check helped us avoid some serious pitfalls with a few used cars we were looking at.",
    },
    {
      name: "William Martinez",
      review:
        "I’ve been in the automotive industry for years, and this service is by far the best for checking vehicle histories. Quick, reliable, and professional.",
    },
    {
      name: "Olivia Wilson",
      review:
        "Epic Vin Check made our car buying experience smooth. The reports were easy to interpret and helped us feel confident in our purchase.",
    },
    {
      name: "James Moore",
      review:
        "I’ve been using Epic Vin Check for months now. The insights they provide are essential for making informed decisions. Always a great experience!",
    },
  ],
};

export const Testimonials = () => {
  return (
    <div className="w-full">
      <p className="text-center font-ancola text-primary text-2xl lg:text-3xl xl:text-5xl mb-3">
        Testimonials
      </p>
      <p className="text-center font-hora sm:text-lg">
        Trusted by Thousands, Here’s What Our Clients Think
      </p>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden mt-3">
        <Marquee pauseOnHover className="[--duration:20s] w-full">
          {clientReviews.firstRow.map((review, index) => (
            <TestimonialCard
              key={index}
              name={review.name}
              review={review.review}
            />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {clientReviews.secondRow.map((review, index) => (
            <TestimonialCard
              key={index}
              name={review.name}
              review={review.review}
            />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-background"></div>
      </div>
    </div>
  );
};

const TestimonialCard = ({ name, review }) => (
  <div className="h-56 w-80 px-6 p-6 flex flex-col items-start justify-around gap-3 bg-primary rounded-xl text-white">
    <Quote className="rotate-180 text-black" size={16} />
    <p className="font-hora text-center text-sm">"{review}"</p>
    <Quote className="rotate-360 ml-auto text-black" size={16} />
    <p className="font-ancola text-white font-semibold">{name}</p>
  </div>
);
