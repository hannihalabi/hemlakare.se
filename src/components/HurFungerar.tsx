import { Fragment } from "react";
import Link from "next/link";

const steps = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="8 17 12 21 16 17" />
        <line x1="12" y1="12" x2="12" y2="21" />
        <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29" />
      </svg>
    ),
    title: "Ladda ner appen",
    desc: (
      <>
        Med några enkla klick laddar du ner appen på{" "}
        <a href="#" style={{ color: "#E72E8A" }} className="font-semibold">
          Apple App Store
        </a>{" "}
        eller{" "}
        <a href="#" style={{ color: "#E72E8A" }} className="font-semibold">
          Google Play.
        </a>
      </>
    ),
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Starta nytt ärende",
    desc: 'Väl inne i appen klickar du på den stora rosa knappen "Starta nytt ärende".',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "Få kontakt",
    desc: "Med ett klick startar du en konversation i appen. Våra läkare eller sköterskor svarar snabbt.",
  },
];

function Arrow() {
  return (
    <div className="hidden lg:flex items-center justify-center pt-4">
      <svg width="100" height="48" viewBox="0 0 100 48" fill="none">
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 L2 4 Z" fill="#cbd5e1" />
          </marker>
        </defs>
        <path
          d="M8 10 Q50 -4 88 34"
          stroke="#cbd5e1"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          markerEnd="url(#arrowhead)"
        />
      </svg>
    </div>
  );
}

export default function HurFungerar() {
  return (
    <section className="bg-[#f4f4f8] py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-14">
        {/* Steps */}
        <div className="w-full grid lg:grid-cols-5 gap-6 items-start">
          {steps.map((step, i) => (
            <Fragment key={step.title}>
              <div className="flex flex-col items-center text-center gap-4">
                {/* Icon circle */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)",
                    boxShadow: "0 4px 16px rgba(231,46,138,0.3)",
                  }}
                >
                  {step.icon}
                </div>

                <h3 className="text-[1.2rem] font-bold text-gray-900 leading-snug">
                  {step.title}
                </h3>
                <p className="text-[0.92rem] text-gray-600 leading-relaxed max-w-[220px]">
                  {step.desc}
                </p>
              </div>

              {i < steps.length - 1 && <Arrow />}
            </Fragment>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/appen"
          className="btn-cta px-10 py-4 rounded-full text-[1rem] font-bold text-white transition-all"
        >
          Boka direkt
        </Link>
      </div>
    </section>
  );
}
