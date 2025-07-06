"use client";

import { Dot } from "lucide-react";
import { motion } from "motion/react";

const privacyPolicy = [
  {
    heading: "Privacy Policy",
    content: "Effective Date: June 25, 2025",
  },
  {
    heading: "Introduction",
    content:
      "Welcome to The Vehicle Audit, provided by InfoPay ('we,' 'us,' or 'InfoPay'). InfoPay, together with its affiliates and subsidiaries, has created this Policy to apply to all users and clients of our website (https://thevehicleaudit.com/) and the associated products, services, data, information, and materials offered therein (collectively, the 'Services').",
  },
  {
    heading: "Consent",
    content:
      "PLEASE CAREFULLY READ THIS POLICY. YOUR USE OF THE SERVICES CONSTITUTES YOUR CONSENT TO THIS POLICY. DO NOT USE THE SERVICES IF YOU ARE UNWILLING OR UNABLE TO CONSENT TO THIS POLICY.",
  },
  {
    heading: "Changes to the Policy",
    content:
      "We may revise this Policy at any time and such revision shall be posted here and accessible via this link: https://thevehicleaudit.com/privacy-policy. Any revision and/or addition to this Policy shall become effective and binding on you when you continue to use the Services on or after the effective date of such revision and/or addition.",
  },
  {
    heading: "Information We Collect",
    content:
      "When you use the Services, we may collect the following categories of personal information about you, which are described in more detail below. All of the information listed below is hereinafter referred to as 'Information.'",
    bulletPoints: [
      "Individual identifiers (e.g., Name, Email, Phone Number, Business Name)",
      "Payment and transaction information (e.g., Credit/Debit Card, CVV code, Zip Code)",
      "Communications with us (e.g., Messages, Feedback, Preferences)",
      "Additional Information as described to you at the point of collection",
      "Automatically collected information (e.g., IP address, Device info, Browser data)",
      "Publicly Available Information (e.g., Publicly available records that match user searches)",
    ],
  },
  {
    heading: "Usage of Cookies and Other Network Technologies",
    content:
      "We collect Information directly and through the use of third parties. We collect this Information using certain technologies such as cookies, web beacons, and other similar technologies.",
    bulletPoints: [
      "Cookies: Small digital files transferred to your computer or smartphone.",
      "Flash Cookies: Local shared objects for storing your preferences.",
      "Web Beacons: Small electronic files to count page visits and track activity.",
      "Analytics: Google Analytics for tracking usage and performance.",
    ],
  },
  {
    heading: "Do Not Track Notice",
    content:
      "Many modern web browsers give you the option to send a 'Do Not Track' signal to the websites you visit. At this time, the Services do not specifically respond to 'Do Not Track' signals.",
  },
  {
    heading: "Publicly Available Information",
    content:
      "We also collect Publicly Available Information or Public Data from various databases, including government entities, commercial data providers, and websites to provide our products and services.",
  },
  {
    heading: "Information Sharing or Disclosure",
    content:
      "We may share and/or disclose your personal Information as set forth in this Policy in the following circumstances:",
    bulletPoints: [
      "With your consent.",
      "For legal and administrative reasons, such as responding to lawful requests.",
      "With third-party service providers for operations or fraud protection.",
      "In the event of a business transfer (e.g., merger or sale).",
      "With subsidiaries and affiliates of InfoPay.",
    ],
  },
  {
    heading: "Links to Third-Party Sites",
    content:
      "Occasionally, at our discretion, we may link to third-party sites not owned or controlled by us. We are not responsible for the privacy practices of these third-party sites.",
  },
  {
    heading: "Information Security and Storage",
    content:
      "We use commercially reasonable measures to protect your Information, but we cannot guarantee the security of data transmitted over the internet.",
  },
  {
    heading: "Data Retention",
    content:
      "We store personal information for as long as reasonably required for its purpose or as required by applicable law. We may delete records after the retention period has passed.",
  },
  {
    heading: "Your Choices",
    content:
      "You have the right to opt out of receiving marketing communications, manage cookies, or opt out of personalized ads. For more information, visit the relevant links provided in the policy.",
  },
  {
    heading: "Accessing, Correcting, or Deleting Your Information",
    content:
      "You may have rights under applicable laws to access, correct, or request deletion of your personal information.",
  },
  {
    heading: "Geographic Location of Data Storage and Processing",
    content:
      "The personal Information collected is stored in databases located in the United States. By using our services, you consent to the transfer of your data to the United States.",
  },
  {
    heading: "Privacy Rights for Residents of Certain U.S. States",
    content:
      "Residents of certain U.S. states may have additional rights regarding their personal information. These rights may include access to, correction, deletion, and opt-out of personal information sharing.",
  },
  {
    heading: "Children’s Information",
    content:
      "Our Services are not intended for children under the age of 18. We do not knowingly collect personal information from anyone under 13. If we discover such information, we will take steps to remove it.",
  },
  {
    heading: "Contact Us",
    content:
      "If you have any questions about this Privacy Policy or the Services provided by The Vehicle Audit, please contact us via email at privacy@thevehicleaudit.com or by phone at (800) 764-0104.",
  },
];

export default function Page() {
  return (
    <div className="flex flex-col items-start justify-start px-6 xl:mt-24 overflow-hidden">
      {privacyPolicy.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-ancola text-primary text-2xl lg:text-3xl xl:text-5xl mb-3 leading-16">
            {section.heading}
          </p>

          <p
            className={`font-hora sm:text-lg ${
              !section.bulletPoints && "mb-12"
            }`}
          >
            {section.content}
          </p>

          {section.bulletPoints && (
            <ul className="mb-12">
              {section.bulletPoints.map((text, index) => (
                <li
                  key={index}
                  className="flex items-center justify-start font-hora sm:text-lg"
                >
                  <Dot className="text-primary" size={40} />
                  <p>{text}</p>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      ))}
    </div>
  );
}
