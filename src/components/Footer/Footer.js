import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full grid grid-cols-1 grid-rows-3 sm:grid-cols-3 sm:grid-rows-1 max-sm:gap-3 bg-primary mt-16 px-6 py-6">
      <div className="flex items-center justify-center bg-white rounded-xl max-sm:mb-3">
        <p className="text-primary font-ancola tracking-wider sm:text-xl xl:text-3xl font-thin">
          theVehicle
          <span className="block ml-6 xl:ml-8">Audit</span>
        </p>
      </div>
      <div className="flex flex-col items-start sm:items-center justify-center gap-6">
        <p className="text-white font-ancola tracking-wider sm:text-lg xl:text-2xl font-thin">
          Quick Links
        </p>

        <div className="flex flex-col items-start justify-center gap-1 xl:gap-2 font-hora text-white xl:text-lg">
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/contact">Contact Us</Link>
        </div>
      </div>
      <div className="flex flex-col items-start sm:items-center justify-center sm:justify-between gap-6">
        <p className="text-white font-ancola tracking-wider sm:text-lg xl:text-2xl font-thin">
          Get in touch
        </p>

        <div className="flex flex-col items-start justify-center gap-2 xl:gap-3 font-hora text-white xl:text-lg">
          <p>info@thevehicleaudit.com</p>
          <p className="text-sm">
            If you have any questions or need help, <br />
            feel free to contact with our team.
          </p>
        </div>
      </div>
    </div>
  );
}
