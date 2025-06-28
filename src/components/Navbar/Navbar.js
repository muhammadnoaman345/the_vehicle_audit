import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { images } from "../../../public/assets/images";

function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between mb-8 px-6 py-3">
      <img
        src={images.logo}
        alt="Logo"
        className="h-16 md:h-16 lg:h-20 xl:h-28 w-16 md:w-16 lg:w-20 xl:w-28"
      />

      <div className="max-sm:hidden border-2 border-primary rounded-full flex items-center justify-center gap-3 md:gap-6 lg:gap-9 xl:gap-12 px-3 py-2 xl:px-6 xl:py-3 text-primary text-sm xl:text-lg font-hora">
        <Link href="/">Home</Link>
        <Link href="/about">About Us</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/contact">Contact Us</Link>
      </div>

      <Sheet>
        <SheetTrigger asChild className="sm:hidden">
          <AlignRight
            size={28}
            strokeWidth={3}
            className="text-primary font-bold"
          />
        </SheetTrigger>
        <SheetContent className="bg-gradient-to-b to-primary from-muted border-0">
          <SheetHeader>
            <SheetTitle className="font-ancola text-white">
              Navigation
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-3 mt-3 text-white font-hora font-bold pl-4">
            <Link href="/">Home</Link>
            <Link href="/about">About Us</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/contact">Contact Us</Link>
          </div>

          <button className="focus:border-0 mx-4 mt-auto mb-12 bg-white text-primary rounded-full px-3 py-2 font-hora flex items-center justify-center gap-1">
            Get a quote <ArrowRight size={20} />
          </button>
        </SheetContent>
      </Sheet>

      <button className="max-sm:hidden bg-gradient-to-br from-primary to-muted text-white rounded-full px-3 py-2 xl:px-6 xl:py-3 font-hora text-sm xl:text-lg">
        Get a quote
      </button>
    </nav>
  );
}

export default Navbar;
