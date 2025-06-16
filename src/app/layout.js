import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";

export const metadata = {
  title: "The Vehicle Audit",
  description: "A platform for vehicle auditing and management.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="py-3">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
