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
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.009-.371-.011-.57-.011-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.998-3.647-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.9 6.994c-.003 5.45-4.437 9.884-9.892 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}
