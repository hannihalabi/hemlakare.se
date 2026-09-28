export default function CallcenterWorkspace() {
  return (
    <main className="min-h-0 min-w-0 flex-1 overflow-y-auto bg-[#f7f7f8] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px] space-y-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#c81e70]">
            Kundservice
          </p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
            Callcenter
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Arbetsyta för inkommande samtal från Rinkel.
          </p>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
          <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-pink-50 text-[#c81e70]">
            <PhoneIcon />
          </div>
          <h2 className="mt-4 text-lg font-extrabold text-slate-950">
            Callcenter
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
            Sidan är skapad och redo att kopplas till Rinkel.
          </p>
        </section>
      </div>
    </main>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-7"
      aria-hidden="true"
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}
