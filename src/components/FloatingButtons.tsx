import { site, whatsappLink } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon } from "./icons";

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <a
        href={`tel:${site.phone}`}
        aria-label={`Call ${site.phoneDisplay}`}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 text-neutral-950 shadow-xl transition hover:scale-105"
      >
        <PhoneIcon className="h-6 w-6" />
      </a>
      <a
        href={whatsappLink("Hi, I want to book a taxi.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl transition hover:scale-105"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </div>
  );
}
