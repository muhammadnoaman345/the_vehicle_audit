import Link from "next/link";
import { images } from "../../../public/assets/images";

export default function WhatsappIcon() {
  return (
    <Link
      href="http://wa.me/+447367068534"
      className="absolute fixed z-50 right-4 bottom-4"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={images.socials.wa}
        className="h-12 xl:h-16 w-12 xl:w-16 rounded-full"
      />
    </Link>
  );
}
