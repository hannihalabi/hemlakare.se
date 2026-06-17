import Link from "next/link";

const vardcentral = [
  "Veckor av väntetid för en tid",
  "Stressad personal och hög arbetsbelastning",
  "Snabba bedömningar under tidspress",
  "Ny läkare nästan varje besök",
  "Styrs av regionens budget och köer",
];

const hemlakare = [
  "Hjälp samma dag – ofta inom timmar",
  "Din egen läkare och sköterska, varje gång",
  "Tid och lugn för en noggrann bedömning",
  "Kvalitet före kvantitet – vi prioriterar dig",
  "Privatfinansierad – fri från regionens budgettryck",
];

function CrossIcon() {
  return (
    <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center shrink-0 mt-0.5">
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
        <path d="M3 3l6 6M9 3l-6 6" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function CheckIcon() {
  return (
    <span
      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
      style={{ background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)" }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function VarforHemlakare() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
        {/* Heading */}
        <div className="text-center flex flex-col gap-3 max-w-2xl">
          <span
            className="w-fit mx-auto px-4 py-1.5 rounded-full text-[0.75rem] font-bold text-white"
            style={{ background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)" }}
          >
            VARFÖR HEMLÄKARE.SE
          </span>
          <h2 className="text-[2rem] sm:text-[2.4rem] font-bold tracking-tight text-gray-900">
            Snabb vård med kvalitet – inte en plats i kön
          </h2>
          <p className="text-[1rem] text-gray-600 leading-relaxed">
            Vi finansieras inte av regionen. Du betalar privat – och får i gengäld det som
            den hårt belastade primärvården sällan hinner med: tid, kontinuitet och en läkare
            som hinner göra rätt från början.
          </p>
        </div>

        {/* Comparison */}
        <div className="w-full grid md:grid-cols-2 gap-6 max-w-4xl">
          {/* Vanlig vårdcentral */}
          <div className="bg-[#f4f4f8] rounded-3xl border border-gray-100 p-8 flex flex-col gap-5">
            <h3 className="text-[1.15rem] font-bold text-gray-500">Vanlig vårdcentral</h3>
            <ul className="flex flex-col gap-3.5">
              {vardcentral.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.95rem] text-gray-500 leading-snug">
                  <CrossIcon />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Hemläkare.se */}
          <div
            className="bg-white rounded-3xl p-8 flex flex-col gap-5 border-2"
            style={{
              borderColor: "rgba(231, 46, 138, 0.25)",
              boxShadow: "0 18px 40px -16px rgba(231, 46, 138, 0.3)",
            }}
          >
            <h3 className="text-[1.15rem] font-bold" style={{ color: "#D81B7D" }}>
              Hemläkare.se
            </h3>
            <ul className="flex flex-col gap-3.5">
              {hemlakare.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.95rem] text-gray-800 font-medium leading-snug">
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Closing + CTA */}
        <div className="flex flex-col items-center gap-5 text-center">
          <p className="text-[0.98rem] text-gray-600 max-w-xl leading-relaxed">
            Vården i Sverige håller hög medicinsk klass – men systemet är överbelastat. Det vill vi
            ändra på. Hos oss är du aldrig ett ärende i mängden.
          </p>
          <Link
            href="/mottagningar"
            className="btn-cta px-10 py-4 rounded-full text-[1rem] font-bold text-white transition-all"
          >
            Boka tid
          </Link>
        </div>
      </div>
    </section>
  );
}
