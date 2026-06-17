"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { chatFaqLinks as articles } from "@/data/chatFaqLinks";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [bubble, setBubble] = useState(false);

  // Show welcome bubble after 2s, hide after user interacts
  useEffect(() => {
    const t = setTimeout(() => setBubble(true), 2000);
    return () => clearTimeout(t);
  }, []);

  function handleOpen() {
    setBubble(false);
    setOpen(true);
  }

  function dismissBubble() {
    setBubble(false);
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* Welcome bubble */}
      {bubble && !open && (
        <div className="relative w-[280px] bg-white rounded-2xl shadow-xl border border-gray-100 p-4 flex flex-col gap-2">
          {/* Dismiss */}
          <button
            onClick={dismissBubble}
            className="absolute top-3 right-3 text-gray-300 hover:text-gray-500 transition-colors"
            aria-label="Stäng"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Agent */}
          <div className="flex items-center gap-2">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-9 h-9 rounded-full bg-gradient-to-b from-[#f4c7b0] to-[#e8a882] overflow-hidden flex items-end justify-center">
                {/* Simple illustrated face */}
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <circle cx="18" cy="14" r="8" fill="#f4c7b0" />
                  <ellipse cx="18" cy="32" rx="12" ry="8" fill="#c8334a" />
                  <circle cx="15" cy="13" r="1.2" fill="#5a3a2a" />
                  <circle cx="21" cy="13" r="1.2" fill="#5a3a2a" />
                  <path d="M15.5 16.5 Q18 18.5 20.5 16.5" stroke="#5a3a2a" strokeWidth="1" strokeLinecap="round" fill="none" />
                  <path d="M10 10 Q12 5 18 6 Q24 5 26 10" stroke="#3a2010" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                </svg>
              </div>
              {/* Online dot */}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
            </div>

            <div className="leading-tight">
              <p className="text-[0.82rem] font-bold text-gray-900">Victoria Stensönes</p>
              <p className="text-[0.72rem] text-gray-400">från hemläkare.se</p>
            </div>
          </div>

          {/* Message */}
          <p className="text-[0.85rem] text-gray-700 leading-relaxed">
            Hej där 👋 Välkommen till Hemläkare.se! Behöver du hjälp idag? 🌸
          </p>

          <button
            onClick={handleOpen}
            className="text-[0.82rem] font-semibold text-left underline underline-offset-2 decoration-blue-400 text-blue-500 hover:text-blue-600 transition-colors"
          >
            Klicka här för att läsa svar på vanliga frågor
          </button>

          {/* Tail pointing to button */}
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-gray-100 rotate-45" />
        </div>
      )}

      {/* Chat panel */}
      {open && (
        <div className="w-[300px] bg-[#f7f7f8] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-100">
          {/* Header */}
          <div className="bg-[#f7f7f8] px-4 pt-5 pb-3 flex flex-col gap-2">
            <svg width="36" height="36" viewBox="0 0 44 44" fill="none">
              <rect width="44" height="44" rx="14" fill="url(#cwGrad)" />
              <path
                d="M22 32s-9.5-6-9.5-13A6 6 0 0 1 22 15a6 6 0 0 1 9.5 4C31.5 26 22 32 22 32Z"
                fill="white"
                fillOpacity="0.95"
              />
              <defs>
                <linearGradient id="cwGrad" x1="22" y1="0" x2="22" y2="44" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#E72E8A" />
                  <stop offset="1" stopColor="#D81B7D" />
                </linearGradient>
              </defs>
            </svg>

            <div>
              <h2 className="text-[1.1rem] font-bold text-gray-900">Varmt välkommen! 👋</h2>
              <p className="text-[0.82rem] text-gray-500 leading-relaxed mt-1">
                Nedan hittar du svar på vanliga frågor. Skriv i Hemläkare.se-appen för att få snabb
                kontakt med vårdpersonalen. 📱 Länk i artiklarna 👇
              </p>
            </div>
          </div>

          {/* Status card */}
          <div className="mx-3 bg-white rounded-xl px-3 py-3 shadow-sm border border-gray-100 flex flex-col gap-1">
            <p className="text-[0.82rem] font-semibold text-gray-800">Vi är borta för tillfället</p>
            <p className="text-[0.76rem] text-gray-400">Vi kommer tillbaka online i morgon</p>
            <Link
              href="/kontakt"
              className="flex items-center gap-1 text-[0.82rem] font-semibold mt-1"
              style={{ color: "#E72E8A" }}
            >
              Starta konversation <span>→</span>
            </Link>
          </div>

          {/* Articles card */}
          <div className="mx-3 mt-2 mb-3 bg-white rounded-xl px-3 py-3 shadow-sm border border-gray-100 flex flex-col gap-0.5">
            <p className="text-[0.82rem] font-bold text-gray-900 mb-1.5">Populära artiklar</p>
            {articles.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 text-[0.82rem] text-gray-700 hover:text-gray-900 transition-colors group"
              >
                <span>{a.label}</span>
                <span className="text-gray-400 group-hover:text-gray-700 transition-colors">→</span>
              </Link>
            ))}
            <Link
              href="/faq"
              className="flex items-center gap-1 text-[0.82rem] font-semibold mt-1.5"
              style={{ color: "#E72E8A" }}
            >
              Se alla artiklar <span>→</span>
            </Link>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => { open ? setOpen(false) : handleOpen(); }}
        className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-all active:scale-95 hover:opacity-90"
        style={{
          background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)",
          boxShadow: "0 4px 20px rgba(231,46,138,0.45)",
        }}
        aria-label={open ? "Stäng chatt" : "Öppna chatt"}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
