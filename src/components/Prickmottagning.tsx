import { Fragment, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

const steps = [
  {
    num: 1,
    title: "Skicka bilder digitalt",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="6" y="2" width="12" height="20" rx="2.5" />
        <path d="M11 18h2" />
      </svg>
    ),
  },
  {
    num: 2,
    title: "Få snabb bedömning av läkare",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 2 3 14h8l-1 8 10-12h-8l1-8Z" />
      </svg>
    ),
  },
  {
    num: 3,
    title: "Fysisk undersökning vid behov",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m8.5 12 2.2 2.2 4.8-4.8" />
      </svg>
    ),
  },
];

function ArrowIcon({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function Prickmottagning() {
  return (
    <section className="bg-[#f4f4f8] pb-20 pt-16 lg:pt-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
        <h2 className="text-center text-[2rem] font-bold tracking-tight text-gray-900 sm:text-[2.4rem]">
          Kolla upp dina hudförändringar
        </h2>

        <div className="w-full grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[400px] lg:h-[400px] lg:-mt-32">
              <Image
                src="/bilder/hud-bild.png"
                alt="Illustration av prickmottagning"
                fill
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 400px"
                className="object-contain drop-shadow-xl"
              />
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <ol className="relative grid grid-cols-3 items-stretch gap-1.5 sm:gap-2">
              {steps.map((step, index) => (
                <Fragment key={step.num}>
                  <li className="relative flex h-full flex-col items-center justify-center gap-2.5 rounded-2xl border border-pink-100/90 bg-white p-3 text-center shadow-[0_12px_30px_rgba(110,51,82,0.07)] sm:p-4">
                    <span
                      className="grid size-11 shrink-0 place-items-center rounded-full text-white shadow-[0_10px_24px_rgba(231,46,138,0.32)] sm:size-12"
                      style={{ background: "linear-gradient(145deg, #f0529e 0%, #d81b7d 55%, #a71668 100%)" }}
                    >
                      <span className="size-5 sm:size-[1.35rem]">{step.icon}</span>
                    </span>
                    <span className="text-[0.78rem] font-bold leading-snug text-gray-900 sm:text-[0.85rem]">
                      {step.title}
                    </span>
                  </li>
                  {index < steps.length - 1 && (
                    <ArrowIcon
                      className="absolute top-1/2 z-10 size-4 text-[#e72e8a]/60 sm:size-5"
                      style={{ left: `${(index + 1) * (100 / 3)}%`, transform: "translate(-50%, -50%)" }}
                    />
                  )}
                </Fragment>
              ))}
            </ol>

            <div className="flex flex-col items-center gap-4 mt-2 text-center">
              <Link
                href="/mottagningar"
                className="btn-cta inline-flex w-full items-center justify-center px-10 py-4 rounded-full text-[1rem] font-bold text-white transition-all"
              >
                Boka direkt
              </Link>

              <Link
                href="/mottagningar#specialmottagningar"
                className="text-[0.95rem] font-semibold"
                style={{ color: "#E72E8A" }}
              >
                Läs mer om prickmottagningen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
