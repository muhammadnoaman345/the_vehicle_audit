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
        <WhatsappIcon />
      </body>
    </html>
  );
}
