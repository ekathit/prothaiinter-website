"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaArrowUp, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { SiLine } from "react-icons/si";

const contactLinks = {
  line: "https://line.me/ti/p/hZ9wkHOgBO",
  phone: "tel:+66628919962",
  whatsapp: "https://wa.me/66888695167",
} as const;

export default function FloatingContactBar() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const pathname = usePathname();
  const isThai = pathname.startsWith("/th");

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 320);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const labels = isThai
    ? {
        line: "ติดต่อผ่าน LINE",
        phone: "โทรศัพท์ +66 (0)62-891-9962",
        whatsapp: "ติดต่อผ่าน WhatsApp",
        backToTop: "กลับขึ้นด้านบน",
      }
    : {
        line: "Contact via LINE",
        phone: "Call +66 (0)62-891-9962",
        whatsapp: "Contact via WhatsApp",
        backToTop: "Back to top",
      };

  const iconButtonClass =
    "group relative flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-[0_5px_18px_rgba(15,23,42,0.12)] transition hover:-translate-x-0.5 hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2";
  const backToTopClass =
    "group relative flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-white shadow-[0_5px_18px_rgba(15,23,42,0.18)] transition hover:-translate-x-0.5 hover:border-slate-600 hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2";

  return (
    <aside
      aria-label={isThai ? "ช่องทางการติดต่อ" : "Contact options"}
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-2 lg:flex"
    >
      <div className="flex flex-col items-center gap-2 rounded-full border border-slate-200/90 bg-slate-50/95 p-1.5 shadow-[0_8px_24px_rgba(15,23,42,0.12)] backdrop-blur-sm">
        <a
          href={contactLinks.line}
          target="_blank"
          rel="noopener noreferrer"
          className={`${iconButtonClass} text-[#168c42] hover:text-[#0f7435]`}
          aria-label={labels.line}
          title={labels.line}
        >
          <SiLine size={20} aria-hidden="true" />
        </a>
        <a
          href={contactLinks.phone}
          className={`${iconButtonClass} text-slate-700 hover:text-slate-900`}
          aria-label={labels.phone}
          title={labels.phone}
        >
          <FaPhoneAlt size={17} aria-hidden="true" />
        </a>
        <a
          href={contactLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={`${iconButtonClass} text-[#168c42] hover:text-[#0f7435]`}
          aria-label={labels.whatsapp}
          title={labels.whatsapp}
        >
          <FaWhatsapp size={21} aria-hidden="true" />
        </a>
      </div>

      {showBackToTop && (
        <div className="border-t border-slate-300/80 pt-2">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={backToTopClass}
            aria-label={labels.backToTop}
            title={labels.backToTop}
          >
            <FaArrowUp size={17} aria-hidden="true" />
          </button>
        </div>
      )}
    </aside>
  );
}
