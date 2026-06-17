"use client";

import { useState } from "react";
import Link from "next/link";

const bullets = [
  "Din egen läkare och sköterska",
  "Snabb digital kontakt",
  "Fysiska möten på dina villkor — i hemmet, på arbetet eller på mottagningen",
];

export default function Hero() {
  const [address, setAddress] = useState("");

  return (
    <section className="bg-[#fdf5f9] min-h-[calc(100vh-4rem)] flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-20 w-full grid lg:grid-cols-2 gap-14 items-center">
        {/* Left */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-[2.75rem] sm:text-[3.25rem] lg:text-[3.75rem] font-bold leading-[1.1] tracking-tight text-gray-900">
              Träffa läkare idag,<br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)",
                }}
              >
                skippa vårdcentralen
              </span>
            </h1>

            <ul className="flex flex-col gap-3 mt-2">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <HeartIcon />
                  <span className="text-[1rem] text-gray-700 leading-snug">{b}</span>
                </li>
              ))}
            </ul>

            <p className="text-[0.9rem] text-gray-500 mt-1">
              Fast pris från 995 kr — slipp vårdköer, remisskrångel och väntrum
            </p>
          </div>

          {/* Address search */}
          <div className="flex flex-col gap-3">
            <p className="text-[1.1rem] font-semibold text-gray-900">
              Se om vi finns i ditt område
            </p>
            <div className="flex gap-3 flex-col sm:flex-row">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Skriv en adress, tex. Klittergatan 3, 123"
                className="flex-1 px-4 py-3.5 rounded-2xl border-2 border-[#E72E8A] bg-white text-[0.95rem] text-gray-800 placeholder:text-gray-400 outline-none focus:ring-4 focus:ring-pink-100 transition-all"
              />
              <button
                className="btn-cta px-6 py-3.5 rounded-2xl text-[0.95rem] font-semibold text-white shrink-0 transition-all"
              >
                Sök
              </button>
            </div>
          </div>

          {/* Region links */}
          <p className="text-[0.9rem] text-gray-600">
            Vi har också fysiska mottagningar i{" "}
            <Link
              href="/mottagningar"
              className="font-semibold underline decoration-[#E72E8A]/40 underline-offset-2 hover:decoration-[#E72E8A] transition-colors"
              style={{ color: "#E72E8A" }}
            >
              Stockholm, Göteborg och Solna
            </Link>{" "}
            om du hellre vill träffa oss på plats.
          </p>
        </div>

        {/* Right — placeholder for image/video */}
        <div className="relative hidden lg:flex items-end justify-center">
          <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-xl relative">
            {/* Replace with <Image> once assets are added */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
              Bild / video placeholder
            </div>
          </div>
          {/* Phone mockup badge */}
          <div
            className="absolute -bottom-6 -right-4 w-32 h-56 rounded-3xl shadow-2xl border-4 border-white bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center"
            style={{ rotate: "6deg" }}
          >
            <span className="text-white/30 text-xs text-center px-2">App preview</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeartIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 mt-0.5"
    >
      <circle cx="10" cy="10" r="10" fill="url(#hGrad)" />
      <path
        d="M10 14.5S5.5 11.7 5.5 8.75A2.75 2.75 0 0 1 10 7a2.75 2.75 0 0 1 4.5 1.75C14.5 11.7 10 14.5 10 14.5Z"
        fill="white"
      />
      <defs>
        <linearGradient id="hGrad" x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E72E8A" />
          <stop offset="1" stopColor="#D81B7D" />
        </linearGradient>
      </defs>
    </svg>
  );
}
