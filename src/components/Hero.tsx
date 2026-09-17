"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";

const bullets = [
  { id: "doctors", text: "Endast svenskutbildade läkare" },
  { id: "same-day", text: "Vård samma dag - ingen väntan" },
  { id: "price", text: "Fast pris" },
];

const rotatingWords = ["utan kö", "snabb hjälp", "mindre krångel"];

export default function Hero() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState<null | "yes" | "no">(null);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % rotatingWords.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    const q = address.trim().toLowerCase();
    if (!q) {
      setResult(null);
      return;
    }
    const inStockholm =
      q.includes("stockholm") || /(^|\D)1(?:0|1|2|6)\d\s?\d{2}(\D|$)/.test(q);
    setResult(inStockholm ? "yes" : "no");
  }

  return (
    <section className="overflow-x-clip bg-[#fdf5f9] min-h-[calc(100svh-4rem)] flex items-start lg:items-center">
      <div className="max-w-7xl mx-auto px-6 py-8 sm:py-12 lg:py-20 w-full grid gap-5 sm:gap-8 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-8 lg:items-center">
        <div className="flex flex-col gap-3 sm:gap-4 lg:col-start-1">
          <h1 className="text-[2.45rem] sm:text-[3.25rem] lg:text-[3.75rem] font-bold leading-[1.06] sm:leading-[1.1] tracking-tight text-gray-900">
            Privat vård –<br />
            <span
              key={rotatingWords[wordIndex]}
              className="rotate-word bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)",
              }}
            >
              {rotatingWords[wordIndex]}
            </span>
          </h1>

          <ul className="flex flex-col gap-2.5 sm:gap-3 mt-2">
            {bullets.map((bullet) => (
              <li key={bullet.id} className="flex items-start gap-3">
                <HeartIcon />
                <span className="text-[1rem] text-gray-700 leading-snug">
                  {bullet.text}
                  {bullet.id === "price" && (
                    <>
                      {" "}
                      <strong className="font-bold text-gray-900">995 kr</strong>{" "}
                      <span className="text-gray-500">
                        (ord. pris <del className="decoration-2">1 995 kr</del>)
                      </span>
                    </>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mb-8 flex items-center justify-center sm:mb-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div className="w-full aspect-[16/11] lg:aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-xl relative">
            <Image
              src="/landningspage/hero-1.png"
              alt="Hemläkare.se erbjuder privat vård hemma, digitalt och på mottagning i Stockholm."
              fill
              preload
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <Image
            src="/landningspage/hero-mobil-1.png"
            alt="Mobilvy för att chatta med läkare hos Hemläkare.se."
            width={190}
            height={254}
            loading="eager"
            sizes="(max-width: 640px) 42vw, (max-width: 1024px) 33vw, 17vw"
            className="absolute -bottom-8 -right-5 h-auto w-[42%] min-w-[136px] max-w-[180px] rotate-[10deg] drop-shadow-[0_20px_32px_rgba(15,23,42,0.28)] sm:w-[33%] sm:min-w-[140px] sm:max-w-[220px] sm:drop-shadow-[0_24px_38px_rgba(15,23,42,0.24)] lg:-bottom-10 lg:-right-7 lg:w-[34%] lg:max-w-[235px]"
          />
        </div>

        <div id="omradeskontroll" className="flex scroll-mt-24 flex-col gap-8 lg:col-start-1">
          <div className="flex flex-col gap-3">
            <p className="text-[1.1rem] font-semibold text-gray-900">
              Se om vi finns i ditt område
            </p>
            <form onSubmit={handleSearch} className="flex gap-3 flex-col sm:flex-row">
              <label htmlFor="address-search" className="sr-only">
                Adress eller postnummer
              </label>
              <input
                id="address-search"
                name="address"
                type="text"
                autoComplete="street-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Skriv en adress eller ett postnummer i Stockholm"
                className="flex-1 px-4 py-3.5 rounded-2xl border-2 border-[#E72E8A] bg-white text-[0.95rem] text-gray-800 placeholder:text-gray-400 outline-none focus:ring-4 focus:ring-pink-100 transition-all"
              />
              <button
                type="submit"
                className="btn-cta px-6 py-3.5 rounded-2xl text-[0.95rem] font-semibold text-white shrink-0 transition-all"
              >
                Sök
              </button>
            </form>

            {result === "yes" && (
              <div role="status" aria-live="polite" className="flex items-center gap-2.5 rounded-2xl bg-green-50 border border-green-200 px-4 py-3 text-[0.92rem] text-green-800">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-green-600">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>
                  Ja, vi finns i Stockholmsområdet!{" "}
                  <Link href="/mottagningar" className="font-semibold underline underline-offset-2">
                    Boka en tid →
                  </Link>
                </span>
              </div>
            )}

            {result === "no" && (
              <div role="status" aria-live="polite" className="rounded-2xl bg-white border border-gray-200 px-4 py-3 text-[0.92rem] text-gray-600">
                Vi finns just nu enbart i Stockholm. Läs mer om vårt{" "}
                <Link
                  href="/mottagningar"
                  className="font-semibold underline underline-offset-2"
                  style={{ color: "#E72E8A" }}
                >
                  område och våra tjänster
                </Link>
                {"."}
              </div>
            )}
          </div>

          <p className="text-[0.9rem] text-gray-600">
            Vi erbjuder mottagningsbesök, hembesök och vaccination hemma i{" "}
            <Link
              href="/mottagningar"
              className="font-semibold underline decoration-[#E72E8A]/40 underline-offset-2 hover:decoration-[#E72E8A] transition-colors"
              style={{ color: "#E72E8A" }}
            >
              Stockholm
            </Link>
            {"."}
          </p>
        </div>
      </div>
    </section>
  );
}

function HeartIcon() {
  const gradientId = useId();

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 mt-0.5"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="10" fill={`url(#${gradientId})`} />
      <path
        d="M10 14.5S5.5 11.7 5.5 8.75A2.75 2.75 0 0 1 10 7a2.75 2.75 0 0 1 4.5 1.75C14.5 11.7 10 14.5 10 14.5Z"
        fill="white"
      />
      <defs>
        <linearGradient id={gradientId} x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E72E8A" />
          <stop offset="1" stopColor="#D81B7D" />
        </linearGradient>
      </defs>
    </svg>
  );
}
