import Link from "next/link";
import { healthPackages } from "@/data/healthPackages";

export default function HealthPackages() {
  return (
    <section id="halsokontroller" className="scroll-mt-24 bg-white px-6 py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12">
        <div className="flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="rounded-full bg-[#E72E8A] px-4 py-1.5 text-[0.75rem] font-bold text-white">
            HÄLSOKONTROLLER I STOCKHOLM
          </span>
          <h2 className="text-[2rem] font-bold tracking-tight text-gray-900 sm:text-[2.4rem]">
            Välj den nivå som passar dig
          </h2>
          <p className="text-[1rem] leading-relaxed text-gray-600">
            Tre paket gör det enkelt att välja hur omfattande hälsokontroll du vill ha.
          </p>
        </div>

        <div className="grid w-full gap-5 md:grid-cols-3">
          {healthPackages.map((healthPackage) => (
            <article
              key={healthPackage.name}
              className="flex min-h-64 flex-col rounded-3xl border border-gray-100 bg-[#fdf5f9] p-7"
            >
              <p className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-[#D81B7D]">
                {healthPackage.level}
              </p>
              <h3 className="mt-3 text-[1.25rem] font-bold text-gray-900">
                {healthPackage.name}
              </h3>
              <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-gray-600">
                {healthPackage.description}
              </p>
              <Link
                href="/patientavgifter#halsokontroller"
                className="mt-6 font-semibold text-[#D81B7D] underline decoration-[#E72E8A]/30 underline-offset-4 hover:decoration-[#E72E8A]"
              >
                Läs mer om paketet
              </Link>
            </article>
          ))}
        </div>

        <div className="flex w-full flex-col items-start justify-between gap-5 rounded-3xl bg-[#2b2d3b] p-7 text-white sm:flex-row sm:items-center sm:p-9">
          <div>
            <p className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-pink-300">
              Vi kommer till dig
            </p>
            <h3 className="mt-2 text-[1.35rem] font-bold">Vaccination hemma i Stockholm</h3>
            <p className="mt-2 max-w-2xl text-[0.92rem] leading-relaxed text-white/70">
              Boka vaccination i hemmet och slipp resan till mottagningen. Tillgänglighet och pris beror på vaccin och område.
            </p>
          </div>
          <Link
            href="/mottagningar#vaccination-hemma"
            className="btn-cta inline-flex shrink-0 items-center justify-center rounded-full px-7 py-3.5 text-[0.92rem] font-bold"
          >
            Läs om vaccination hemma
          </Link>
        </div>
      </div>
    </section>
  );
}
