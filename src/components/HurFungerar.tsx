import { Fragment } from "react";
import Link from "next/link";

const steps = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: "Välj en tid",
    desc: "Boka en tid som passar dig direkt i vår onlinekalender – när som helst på dygnet.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Beskriv ditt ärende",
    desc: "Berätta kort vad du behöver hjälp med så förbereder vi ditt besök.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "Få kontakt",
    desc: "Du träffar läkaren digitalt eller på plats – oftast samma dag. Vi svarar snabbt.",
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
          href="/mottagningar"
          className="btn-cta px-10 py-4 rounded-full text-[1rem] font-bold text-white transition-all"
        >
          Boka direkt
        </Link>
      </div>
    </section>
  );
}
