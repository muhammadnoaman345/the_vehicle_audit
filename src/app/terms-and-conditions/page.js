"use client";

import { motion } from "motion/react";

const termsAndConditions = [
  {
    heading: "Terms and Conditions",
    content: `If you continue to browse and use this website, you must agree to comply with and be bound by the following terms and conditions, which, together with the NMVTIS Disclaimer and Privacy Policy, govern The Vehicle Audit.
  
      and establish your relationship with us in relation to this website.
  
      By using this site, you agree to be bound by these terms and conditions. If you do not wish to be bound by these terms of use, please exit the site now. Your remedy for dissatisfaction with this site, or any products, services, contents, or other information available on or through this site, is to stop using the site and/or those particular products or services. Your agreement with us regarding compliance with these terms of use becomes effective immediately upon the commencement of your use of this site.
  
      We expressly reserve the right to change these Terms and Conditions from time to time without any prior notice. You acknowledge and agree that it is your responsibility to review this site and these Terms and Conditions periodically and to familiarize yourself with any modifications. Your continued use of this site after such modifications will constitute acknowledgment of the modified Terms and Conditions and agreement to abide by and be bound by them.`,
  },
  {
    heading: "Registration Data and Privacy",
    content: `To access the services on this site, you will need to create an account and password by completing our online registration form, which requires certain information and data (“Registration Data”). By registering, you agree that all information provided in the Registration Data is true and accurate, and you will maintain and update this information as necessary to keep it current, complete, and accurate. The information we collect through your use of this site, including your Registration Data, is subject to our Privacy Policy, which is specifically incorporated by reference into these Terms and Conditions.`,
  },
  {
    heading: "Third Party Sites and Information",
    content: `This site may link you to other sites on the Internet or include references to information, documents, software, materials, and/or services provided by third parties. These other sites and parties are not under our control; therefore, we assume no responsibility for the accuracy, copyright compliance, legality, or any other aspect of those sites. The inclusion of such links or references is provided merely for your convenience and does not imply endorsement of, or association with, the site or party by us, nor does it constitute any warranty of any kind, either express or implied. We recommend that you carefully review the terms of use and privacy policies on these external sites.`,
  },
  {
    heading: "Payment",
    content: `Any and all payments for services shall be made by the Customer in United States dollars through an approved payment processor, such as Authorize.net or WePay. Payments are non-refundable, except when an exception is approved by a representative of The Vehicle Audit. An applicable sales tax may be assessed based on the Customer’s billing zip code. For Washington State residents, the local and state tax rate will be assessed according to the rates given by the Washington State Department of Revenue.`,
  },
  {
    heading: "Refund Policy",
    content: `At The Vehicle Audit, we are dedicated to providing comprehensive and reliable Vehicle Identification Number (VIN) reports to assist our users in making informed decisions. Due to the nature of our digital services and the immediate delivery of sensitive vehicle data, we uphold a strict no-refund policy once a report has been generated and delivered. Important Terms of Our Refund Policy, Each VIN report is uniquely generated using the specific vehicle information provided by the customer. As the report contains proprietary and third-party data that is delivered instantly, no refunds will be issued after the report has been accessed, viewed, or downloaded, regardless of user satisfaction or usage. It is the sole responsibility of the customer to ensure the VIN and all other submitted information are accurate before confirming the purchase. Reports generated using incorrect VINs or details are not eligible for refunds under any circumstances. If you encounter any technical difficulty that prevents you from receiving the report, you must contact us within 24 hours of your purchase. We will assess the issue and provide assistance to ensure that your report is delivered correctly. The Vehicle Audit reserves the right to deny refund requests suspected to be fraudulent, abusive, or in violation of our terms of service. By proceeding with a purchase on our platform, you acknowledge and agree to the conditions outlined in this Refund Policy.`,
  },
  {
    heading: "Right to Access and Use Vehicle History Reports",
    content: `You are hereby granted a limited, revocable, non-exclusive, and non-transferable license to access and use the Vehicle History Reports (“Reports”) generated by The Vehicle Audit solely for your personal use and in accordance with these Terms and Conditions. You may not modify, publish, transmit, display, participate in the transfer or sale, assign, rent, transfer, act as a service bureau, sublicense, or otherwise grant rights in the Report to any other person or entity, nor may you exploit any of the Reports or any content therein, in whole or in part. Except as expressly permitted under these Terms and Conditions or copyright law, no copying, redistribution, retransmission, publication, or commercial exploitation of downloaded material is allowed without the express written permission of The Vehicle Audit.`,
  },
  {
    heading: "Intellectual Property Information",
    content: `By accepting these Terms and Conditions, you acknowledge and agree that all content presented to you on this site is protected by copyrights, trademarks, service marks, patents, other proprietary rights, and laws, and is the sole property of The Vehicle Audit and/or its Affiliates. You are only permitted to use the content as expressly authorized by us or the specific content provider. Except for a single copy made for personal use only, you may not copy, reproduce, modify, republish, upload, post, transmit, or distribute any documents or information from this site in any form or by any means without prior written permission from us or the specific content provider, and you are solely responsible for obtaining permission before reusing any copyrighted material that is available on this site. Any unauthorized use of the materials appearing on this site may violate copyright, trademark and other applicable laws and could result in criminal or civil penalties.`,
  },
  {
    heading: "Disclaimer of Warranties",
    content: `All materials and services on this site are provided on an “as is” and “as available” basis without any warranty of any kind, either express or implied, including, but not limited to, the implied warranties of merchantability or fitness for a particular purpose, or the warranty of non-infringement. Without limiting the foregoing, we make no warranty that (A) the services and materials will meet your requirements, (B) the services and materials will be uninterrupted, timely, secure, or error-free, (C) the results obtained from the use of the services or materials will be effective, accurate, or reliable, or (D) the quality of any products, services, or information purchased or obtained by you from the site from us or our Affiliates will meet your expectations or be free from mistakes, errors, or defects.`,
  },
  {
    heading: "Security, Password and Personal Use",
    content: `You are solely responsible for maintaining the confidentiality of your password and account. You must take steps to ensure that others do not gain access to your password and account. Our personnel will never ask you for your password. You may not transfer or share your account with anyone, and we reserve the right to terminate your account immediately if you do so. We offer you access to The Vehicle Audit website solely for your personal and non-commercial use. You may not resell or make any commercial use of this website and its content. Any violation of this policy will result in immediate account termination and may lead to appropriate legal actions.`,
  },
  {
    heading: "Termination of Use",
    content: `You agree that we may, at our sole discretion, terminate or suspend your access to all or part of the site, with or without notice, for any reason, including, without limitation, a breach of these Terms of Use. Any suspected fraudulent, abusive, or illegal activity may be grounds for termination of your account and may be referred to the appropriate law enforcement authorities. Upon termination or suspension, for any reason, your right to use the services available on this site will immediately cease. You acknowledge and agree that we may deactivate or delete your account and all related files and information stored in it. We shall not be liable to you or any third party for any claims or damages arising from such termination or suspension, or for any other actions taken by us in connection with the termination or suspension.`,
  },
  {
    heading: "NMVTIS Consumer Access Product Disclaimer",
    content: `The National Motor Vehicle Title Information System (NMVTIS) is an electronic system that contains information on certain automobiles titled in the United States. It serves as a reliable source of title and brand history for vehicles but does not provide detailed information about a vehicle’s repair history.
  
      Federal law requires states, insurance companies, and junk and salvage yards to regularly report data to NMVTIS. However, not all motor vehicles are covered, as some states are still not providing their data to the system. States that do report to NMVTIS do so at varying intervals, with some updating data in real-time and others updating within 24 hours or days.
  
      NMVTIS may not include records of significant vehicle damage if the vehicle was never declared a “total loss” by an insurance company or branded by a state titling agency. On the other hand, an insurance company may be required to report a “total loss” even if the state has not branded the vehicle as “salvage” or “junk.”
  
      A vehicle history report from NMVTIS is not a substitute for an independent vehicle inspection. Consumers are encouraged to have vehicles independently inspected to check for hidden damage.`,
  },
];

export default function Page() {
  return (
    <div className="flex flex-col items-start justify-start px-6 xl:mt-24 overflow-hidden">
      {termsAndConditions.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-ancola text-primary text-2xl lg:text-3xl xl:text-5xl mb-3">
            {section.heading}
          </p>

          <p className="font-hora sm:text-lg mb-12">{section.content}</p>
        </motion.div>
      ))}
    </div>
  );
}
