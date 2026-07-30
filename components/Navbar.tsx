"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const [isThai, setIsThai] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (pathname.startsWith("/th")) {
      localStorage.setItem("lang", "th");
      setIsThai(true);
      return;
    }

    if (pathname === "/") {
      localStorage.setItem("lang", "en");
      setIsThai(false);
      return;
    }

    const savedLang = localStorage.getItem("lang");
    setIsThai(savedLang === "th");
  }, [pathname]);

  const home = isThai ? "/th" : "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-[#FFFFFF]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}

        <Link href={home} className="flex items-center">

  <Image
    src="/images/prothai-logo-v2.png"
    alt="ProThai Inter Supply & Solution Co., Ltd."
    width={300}
    height={60}
    priority
    className="h-20 w-auto"
  />

</Link>

        {/* Desktop Navigation */}

        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-700">

          <Link href={home} className="transition hover:text-blue-600">
            Home
          </Link>

          <Link href={`${home}#solutions`} className="transition hover:text-blue-600">
            Solutions
          </Link>

          <Link href={`${home}#industries`} className="transition hover:text-blue-600">
            Industries
          </Link>

          <Link href={`${home}#projects`} className="transition hover:text-blue-600">
            Projects
          </Link>

          <Link href={`${home}#contact`} className="transition hover:text-blue-600">
            Contact Us
          </Link>

          <div className="ml-2 flex items-center border-l border-gray-300 pl-6">

            <Link
              href="/"
              className={
                !isThai
                  ? "font-semibold text-blue-600"
                  : "text-gray-600 transition hover:text-blue-600"
              }
            >
              EN
            </Link>

            <span className="mx-2 text-gray-300">|</span>

            <Link
              href="/th"
              className={
                isThai
                  ? "font-semibold text-blue-600"
                  : "text-gray-600 transition hover:text-blue-600"
              }
            >
              TH
            </Link>

          </div>

        </nav>

        {/* Mobile Button */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-md p-2 transition hover:bg-gray-100 lg:hidden"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile Menu */}

      <div
        className={`overflow-hidden bg-white shadow-md transition-all duration-300 ease-in-out lg:hidden ${
          menuOpen
            ? "max-h-[520px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >

        <nav
          className={`flex flex-col px-6 py-5 text-gray-700 transition-all duration-300 ${
            menuOpen
              ? "translate-y-0"
              : "-translate-y-3"
          }`}
        >

          <Link
            href={home}
            className="py-2"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            href={`${home}#solutions`}
            className="py-2"
            onClick={() => setMenuOpen(false)}
          >
            Solutions
          </Link>

          <Link
            href={`${home}#industries`}
            className="py-2"
            onClick={() => setMenuOpen(false)}
          >
            Industries
          </Link>

          <Link
            href={`${home}#projects`}
            className="py-2"
            onClick={() => setMenuOpen(false)}
          >
            Projects
          </Link>

          <Link
            href={`${home}#contact`}
            className="py-2"
            onClick={() => setMenuOpen(false)}
          >
            Contact Us
          </Link>

          <div className="mt-5 border-t pt-5">

            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Language
            </p>

            <div className="flex gap-6">

              <Link
                href="/"
                className={
                  !isThai
                    ? "font-semibold text-blue-600"
                    : "text-gray-600"
                }
                onClick={() => setMenuOpen(false)}
              >
                🇬🇧 English
              </Link>

              <Link
                href="/th"
                className={
                  isThai
                    ? "font-semibold text-blue-600"
                    : "text-gray-600"
                }
                onClick={() => setMenuOpen(false)}
              >
                🇹🇭 ไทย
              </Link>

            </div>

          </div>

        </nav>

      </div>

    </header>
  );
}