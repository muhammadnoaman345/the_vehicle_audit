// app/layout.js
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import "./globals.css";
import PayPalProvider from "@/components/PayPalProvider"; 
import Script from "next/script";
import WhatsappIcon from "@/components/WhatsappIcon/WhatsappIcon";

export const metadata = {
  title: "The Vehicle Audit",
  description: "A platform for vehicle auditing and management.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="pt-3">
        <Navbar />
        <main className="z-10">
          <PayPalProvider>{children}</PayPalProvider>
        </main>
        <Footer />

        {/* ✅ Correct Tawk.to Script */}
        <Script
          id="tawk-to"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),
                    s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/68bde50d67c586192c66aa63/1j4isdfct';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
