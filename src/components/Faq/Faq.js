import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How Comprehensive Are Your VIN Reports?",
    answer:
      "Our VIN reports provide a complete, detailed history of a vehicle, including brand records, salvage or total loss status, odometer readings, title records, theft history, and more. We offer all the critical information you need to make informed, confident decisions.",
  },
  {
    question: "Do You Cover All Vehicle Makes?",
    answer:
      "Yes! Our VIN checker works seamlessly across all vehicle makes and models in the US, Europe, and Canada. Whether you search by VIN or license plate, you’ll get accurate and reliable information for any vehicle.",
  },
  {
    question: "What If I Can't Find the Information I Need?",
    answer:
      "If you can’t find the details you need, our dedicated customer service team is available 24/7 to assist you. You can always reach us at info@getvinspro.com. If our experts are unable to retrieve your report, we guarantee a refund.",
  },
  {
    question: "How Can I Cancel My Account?",
    answer:
      "Cancelling your account is simple! Just reach out to our friendly customer support team at info@getvinsaudit.com, and we’ll take care of the rest.",
  },
  {
    question: "How Many Reports Can I Generate?",
    answer:
      "With our unlimited search subscription, you can generate as many VIN reports as you need. For extra premium data, we offer additional reports for a small fee. Contact us at info@getvinsaudit.com for more details.",
  },
  {
    question: "Is Your VIN Lookup Service Accurate and Reliable?",
    answer:
      "Absolutely! Our VIN lookup service is trusted for its accuracy and reliability. We source information from top-tier public and private databases and are proudly approved by the American Association of Motor Vehicle Administrators (AAMVA) for access to their NMVTIS database, ensuring the highest standards of data integrity.",
  },
];

export default function Faq() {
  return (
    <div className="w-full">
      <p className="text-center font-ancola text-primary text-2xl lg:text-3xl xl:text-5xl mb-6">
        Frequently Asked Questions
      </p>
      <p className="text-center font-hora sm:text-lg">
        Got Questions? We've Got Answers! Here are the most common questions we
        get about our services, designed to help you make the best choices with
        complete confidence.
      </p>

      <div className="w-full sm:px-[10dvw] mt-6">
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            type="single"
            collapsible
            className="border-2 border-primary rounded-lg px-6 my-3"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-hora font-semibold sm:text-lg cursor-pointer">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="font-hora max-sm:text-sm">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
