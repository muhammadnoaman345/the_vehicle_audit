import Link from "next/link";

function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between mb-16 px-6 py-3">
      <p className="text-primary font-ancola text-3xl font-thin">
        theVehicle
        <span className="block ml-8">Audit</span>
      </p>

      <div className="border-2 border-primary rounded-full flex items-center justify-center gap-12 px-6 py-3 text-primary text-lg font-hora">
        <Link href="/">Home</Link>
        <Link href="/about">About Us</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/contact">Contact Us</Link>
      </div>

      <button className="bg-gradient-to-br from-blue-500 to-primary text-white rounded-full px-6 py-3 font-hora text-lg">
        Get A Quote
      </button>
    </nav>
  );
}

export default Navbar;
