import Link from "next/link";
import { healthPackages } from "@/data/healthPackages";
import { vaccinePriceGroups } from "@/data/services";

export function BloodTestPackages() {
  return (
    <section aria-labelledby="paket" className="rounded-[2rem] border border-pink-100 bg-[#fff8fb] p-5 sm:p-8">
      <div className="max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#d81b7d]">Paket och priser</p>
        <h2 id="paket" className="mt-2 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
          Jämför våra hälsokontroller
        </h2>
        <p className="mt-3 leading-relaxed text-gray-600">
          Öppna ett paket för att se samtliga analyser. Antalet markörer beskriver paketets omfattning,
          men inte ensamt dess medicinska relevans för just dig.
        </p>
      </div>

      <div className="mt-7 grid gap-3">
        {healthPackages.map((item) => (
          <details key={item.name} className="group rounded-2xl border border-pink-100 bg-white open:shadow-[0_10px_28px_rgba(216,27,125,0.08)]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 marker:content-none sm:px-5">
              <span>
                <span className="block font-bold text-gray-950">{item.name}</span>
                <span className="mt-1 block text-sm text-gray-500">{item.level} · {item.markers} markörer</span>
              </span>
              <span className="flex shrink-0 items-center gap-3">
                <span className="font-bold text-[#d81b7d]">{item.price}</span>
                <span aria-hidden="true" className="grid size-7 place-items-center rounded-full bg-pink-50 text-lg text-[#d81b7d] transition-transform group-open:rotate-45">+</span>
              </span>
            </summary>
            <div className="border-t border-pink-100 px-4 pb-5 pt-4 sm:px-5">
              <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.1em] text-[#d81b7d]">
                Samtliga {item.markers} markörer
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {item.markerList.map((marker) => (
                  <li key={marker} className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-gray-700">
                    {marker}
                  </li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export function VaccinationPrices() {
  return (
    <section aria-labelledby="prislista" className="rounded-[2rem] border border-pink-100 bg-[#fff8fb] p-5 sm:p-8">
      <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#d81b7d]">Prislista</p>
      <h2 id="prislista" className="mt-2 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
        Vaccin och frånpriser
      </h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-gray-600">
        Priserna gäller per dos. Flera doser kan behövas och avgift för hembesök kan tillkomma.
        Tillgänglighet och slutligt pris bekräftas vid bokning.
      </p>
      <div className="mt-7 grid gap-5 lg:grid-cols-3">
        {vaccinePriceGroups.map((group) => (
          <article key={group.category} className="rounded-2xl border border-pink-100 bg-white p-5">
            <h3 className="font-bold text-gray-950">{group.category}</h3>
            <ul className="mt-4 divide-y divide-gray-100">
              {group.items.map((item) => (
                <li key={item.name} className="flex items-start justify-between gap-3 py-3 text-sm first:pt-0 last:pb-0">
                  <span className="text-gray-700">{item.name}</span>
                  <span className="shrink-0 font-semibold text-gray-950">{item.price}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <Link href="/mottagningar#vaccination-hemma" className="btn-cta mt-6 inline-flex min-h-12 items-center justify-center rounded-full px-6 font-bold">
        Fråga om vaccin och tid
      </Link>
    </section>
  );
}
