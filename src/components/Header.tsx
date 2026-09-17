"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Priser & paket", href: "/patientavgifter" },
  { label: "Om oss", href: "/om" },
  { label: "Mottagningar", href: "/mottagningar" },
  { label: "Frågor & svar", href: "/faq" },
  { label: "Artiklar", href: "/aktuellt" },
  { label: "Vårdguiden", href: "/vardguiden" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = Math.max(window.scrollY, 0);
    let accumulatedDistance = 0;
    let lastDirection = 0;
    let frameId: number | null = null;

    function updateHeader() {
      const currentScrollY = Math.max(window.scrollY, 0);

      if (!window.matchMedia("(max-width: 767px)").matches) {
        setHeaderVisible(true);
        lastScrollY = currentScrollY;
        frameId = null;
        return;
      }

      const distance = currentScrollY - lastScrollY;
      const direction = Math.sign(distance);

      if (direction !== 0) {
        if (direction !== lastDirection) accumulatedDistance = 0;
        accumulatedDistance += Math.abs(distance);
        lastDirection = direction;
      }

      if (menuOpen || currentScrollY < 72) {
        setHeaderVisible(true);
      } else if (accumulatedDistance >= 12) {
        setHeaderVisible(direction < 0);
        accumulatedDistance = 0;
      }

      lastScrollY = currentScrollY;
      frameId = null;
    }

    function handleScroll() {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateHeader);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-gray-100 bg-white transition-transform duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none md:translate-y-0 ${
        headerVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 md:gap-2 shrink-0" aria-label="Hemläkare – startsidan">
          <Image
            src="/bilder/logo/hemlakare-icon-stethoscope.svg"
            alt=""
            width={38}
            height={38}
            className="md:w-8 md:h-8"
          />
          <span className="text-xl md:text-[1.05rem] font-semibold tracking-tight text-gray-900">
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
          <a
            href="tel:0108086084"
            className="btn-cta cta-attention flex items-center gap-2 px-5 py-2.5 rounded-full text-[0.875rem] font-semibold text-white transition-all"
            aria-label="Ring Hemläkare på 010-808 60 84"
          >
            <PhoneIcon />
            010 808 60 84
          </a>
          <a
            href="https://wa.me/46108086084"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border-2 border-[#25d366] bg-white px-4 py-2 text-[0.875rem] font-semibold text-[#128c4a] transition-colors hover:bg-emerald-50"
            aria-label="Kontakta Hemläkare via WhatsApp"
          >
            <WhatsAppIcon />
            WhatsApp
          </a>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 md:hidden">
          <a
            href="tel:0108086084"
            className="btn-cta cta-attention flex min-h-10 items-center gap-1.5 rounded-full px-3 text-[0.8rem] font-semibold tracking-[0.01em] text-white"
            aria-label="Ring Hemläkare på 010-808 60 84"
          >
            <PhoneIcon />
            010 808 60 84
          </a>
          <button
            type="button"
            className="p-2 rounded-xl text-gray-600 hover:bg-gray-50"
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
          <a
            href="tel:0108086084"
            className="btn-cta mt-3 flex items-center justify-center gap-2 px-5 py-3 rounded-full text-[0.9rem] font-semibold text-white text-center"
            aria-label="Ring Hemläkare på 010-808 60 84"
          >
            <PhoneIcon />
            010 808 60 84
          </a>
          <a
            href="https://wa.me/46108086084"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-2 rounded-full border-2 border-[#25d366] bg-white px-5 py-3 text-center text-[0.9rem] font-semibold text-[#128c4a] transition-colors hover:bg-emerald-50"
            aria-label="Kontakta Hemläkare via WhatsApp"
          >
            <WhatsAppIcon />
            WhatsApp
          </a>
        </nav>
      )}
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.2 9.2 0 0 1-3.8-.9L3 21l1.8-5A8.5 8.5 0 1 1 21 11.5Z" />
      <path d="M8.2 8.1c.5 2.7 2.8 5 5.5 5.6" />
      <path d="m8.2 8.1 1.4-.7M13.7 13.7l.8-1.4" />
    </svg>
  );
}
