import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignRight, ArrowRight } from "lucide-react";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between mb-16 px-6 py-3">
      <p className="text-primary font-ancola sm:text-xl xl:text-3xl font-thin">
        theVehicle
        <span className="block ml-6 xl:ml-8">Audit</span>
      </p>

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
        <SheetContent className="bg-gradient-to-b to-primary from-blue-400 border-0">
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

      <button className="max-sm:hidden bg-gradient-to-br from-primary to-blue-400 text-white rounded-full px-3 py-2 xl:px-6 xl:py-3 font-hora text-sm xl:text-lg">
        Get a quote
      </button>
    </nav>
  );
}

export default Navbar;
