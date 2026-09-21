import GoHealthRadar from "@/components/GoHealthRadar";

export default function GoHealth() {
  return (
    <section className="bg-[linear-gradient(180deg,#ffffff_0%,#fff8fb_100%)] px-6 py-16 sm:py-20">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 text-center">
        <span
          className="inline-flex w-fit items-center gap-1.5 rounded-full px-4 py-1.5 text-[0.75rem] font-bold text-white"
          style={{ background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)" }}
        >
          🔥 NYHET
        </span>

        <div className="flex flex-col gap-3">
          <h2 className="text-[2rem] font-bold tracking-tight text-gray-900 sm:text-[2.4rem]">
            GoHealth – din hälsa, alltid uppkopplad
          </h2>
          <p className="mx-auto max-w-2xl text-[1rem] leading-relaxed text-gray-600">
            En efterfrågad tjänst är äntligen här. Med GoHealth bär du ett pulsarmband som
            kontinuerligt mäter din hälsa – och vår AI larmar våra läkare direkt om något
            avviker, så att du blir uppringd och får hjälp i tid.
          </p>
        </div>

        <GoHealthRadar />

        <p className="max-w-md text-sm text-gray-500">
          Dina värden strömmar löpande till vår AI, dygnet runt. Upptäcks något avvikande
          går ett larm direkt till våra läkare.
        </p>

        <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-[#f4f4f8] px-6 py-5 sm:flex-row sm:gap-4 sm:px-8">
          <span className="text-[1.4rem] font-bold text-[#D81B7D]">995 kr/mån</span>
          <span className="hidden h-8 w-px bg-gray-200 sm:block" aria-hidden="true" />
          <p className="max-w-md text-sm text-gray-600">
            Larmar automatiskt vid avvikande värden – då ringer läkaren upp för att kolla läget.
          </p>
        </div>

        <p className="text-sm font-semibold text-gray-400">Kommer snart – håll utkik</p>
      </div>
    </section>
  );
}
