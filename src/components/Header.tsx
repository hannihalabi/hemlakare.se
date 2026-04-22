"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Patientavgifter", href: "/patientavgifter" },
  { label: "Om oss", href: "/om" },
  { label: "Mottagningar", href: "/mottagningar" },
  { label: "Frågor & svar", href: "/faq" },
  { label: "Vårdguiden", href: "/vardguiden" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <HeartLogo />
          <span className="text-[1.05rem] font-semibold tracking-tight text-gray-900">
            hemläkare<span className="text-[#E72E8A]">.se</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
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

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/appen"
            className="px-5 py-2.5 rounded-full text-[0.875rem] font-semibold text-white transition-all active:scale-[0.97]"
            style={{
              background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)",
              boxShadow: "0 2px 12px rgba(231,46,138,0.35)",
            }}
          >
            Till appen
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Meny"
        >
          <span className="block w-5 h-0.5 bg-current mb-1.5 transition-all" />
          <span className="block w-5 h-0.5 bg-current mb-1.5 transition-all" />
          <span className="block w-5 h-0.5 bg-current transition-all" />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-1">
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
            href="/appen"
            className="mt-3 px-5 py-3 rounded-full text-[0.9rem] font-semibold text-white text-center"
            style={{
              background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)",
            }}
          >
            Till appen
          </Link>
        </div>
      )}
    </header>
  );
}

function HeartLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="10" fill="url(#heartGrad)" />
      <path
        d="M16 23s-7-4.5-7-9.5A4.5 4.5 0 0 1 16 11a4.5 4.5 0 0 1 7 2.5C23 18.5 16 23 16 23Z"
        fill="white"
        fillOpacity="0.95"
      />
      <defs>
        <linearGradient id="heartGrad" x1="16" y1="0" x2="16" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E72E8A" />
          <stop offset="1" stopColor="#D81B7D" />
        </linearGradient>
      </defs>
    </svg>
  );
}
