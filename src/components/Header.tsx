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
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
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
