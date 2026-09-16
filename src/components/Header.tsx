"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Patientavgifter", href: "/patientavgifter" },
  { label: "Om oss", href: "/om" },
  { label: "Mottagningar", href: "/mottagningar" },
  { label: "Frågor & svar", href: "/faq" },
  { label: "Artiklar", href: "/aktuellt" },
  { label: "Vårdguiden", href: "/vardguiden" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Hemläkare – startsidan">
          <Image
            src="/bilder/logo/hemlakare-icon-stethoscope.svg"
            alt=""
            width={32}
            height={32}
          />
          <span className="text-[1.05rem] font-semibold tracking-tight text-gray-900">
            hemläkare<span className="text-[#E72E8A]">.se</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Huvudmeny">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 text-[0.875rem] font-medium text-gray-600 rounded-xl hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/mottagningar"
            className="btn-cta px-5 py-2.5 rounded-full text-[0.875rem] font-semibold text-white transition-all"
          >
            Boka direkt
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-50"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
          aria-label="Meny"
          aria-controls="mobile-menu"
          aria-expanded={menuOpen}
        >
          <span aria-hidden="true" className="block w-5 h-0.5 bg-current mb-1.5 transition-all" />
          <span aria-hidden="true" className="block w-5 h-0.5 bg-current mb-1.5 transition-all" />
          <span aria-hidden="true" className="block w-5 h-0.5 bg-current transition-all" />
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          className="md:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-1"
          aria-label="Mobilmeny"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3.5 py-3 text-[0.9rem] font-medium text-gray-700 rounded-xl hover:bg-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/mottagningar"
            className="btn-cta mt-3 px-5 py-3 rounded-full text-[0.9rem] font-semibold text-white text-center"
          >
            Boka direkt
          </Link>
        </nav>
      )}
    </header>
  );
}
