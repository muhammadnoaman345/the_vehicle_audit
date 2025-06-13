import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";

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
