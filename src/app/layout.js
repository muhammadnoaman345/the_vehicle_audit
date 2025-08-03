import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import "./globals.css";
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
        <main className="z-10">{children}</main>
        <Footer />
        <script type="text/javascript"> var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date(); (function(){ var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0]; s1.async=true; s1.src='https://embed.tawk.to/688d293ecabd591931918f0e/1j1jmi73c'; s1.charset='UTF-8'; s1.setAttribute('crossorigin','*'); s0.parentNode.insertBefore(s1,s0); })(); </script>
      </body>
    </html>
  );
}
