"use client";

import Link from "next/link";
import { useChatDemo } from "@/hooks/useChatDemo";

const demoSteps = [
  {
    number: "01",
    title: "Besökaren startar",
    body: "Välj “Boka eller omboka”, bekräfta säkerhetsgränsen och skicka en administrativ fråga.",
  },
  {
    number: "02",
    title: "Ärendet når kön",
    body: "Öppna adminpanelen. Det nya ärendet visas direkt under Nya med olästmarkering.",
  },
  {
    number: "03",
    title: "Medarbetaren svarar",
    body: "Ta ärendet, använd ett snabbsvar och skicka. Svaret visas direkt i besökarens flik.",
  },
  {
    number: "04",
    title: "Säker överlämning",
    body: "Hänvisa vid behov till säker patientkontakt och avsluta sedan ärendet.",
  },
];

export default function ChatDemoPresentation() {
  const { conversations, resetDemo } = useChatDemo();
  const activeCount = conversations.filter(
    (conversation) => conversation.status !== "resolved",
  ).length;
  const newCount = conversations.filter(
    (conversation) => conversation.status === "new",
  ).length;

  return (
    <main className="min-h-screen overflow-hidden bg-[#fbfafb] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <BrandMark />
            <span className="text-[0.95rem] font-extrabold tracking-tight">
              hemläkare<span className="text-[#e72e8a]">.se</span>
            </span>
            <span className="hidden h-5 w-px bg-slate-200 sm:block" />
            <span className="hidden text-xs font-semibold text-slate-400 sm:block">
              Chat MVP
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={resetDemo}
              className="flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-600 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e72e8a]"
            >
              <RefreshIcon className="size-4" />
              <span className="hidden sm:inline">Återställ demo</span>
            </button>
            <Link
              href="/admin"
              className="btn-cta flex min-h-10 items-center gap-2 rounded-xl px-3.5 text-xs font-bold"
            >
              Öppna admin
              <ArrowRightIcon className="size-4" />
            </Link>
          </div>
        </div>
      </header>

      <section className="relative border-b border-slate-200 bg-[radial-gradient(circle_at_83%_22%,rgba(231,46,138,0.13),transparent_27%),linear-gradient(180deg,#fff_0%,#fdf7fa_100%)]">
        <div className="absolute left-[8%] top-24 size-40 rounded-full bg-pink-100/40 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-3 py-1.5 text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-[#b11e65] shadow-sm">
              <span className="size-2 rounded-full bg-emerald-500" />
              Interaktiv MVP · Fiktiva uppgifter
            </div>
            <h1 className="mt-6 max-w-3xl text-[2.4rem] font-extrabold leading-[1.06] tracking-[-0.045em] text-[#171521] sm:text-[3.4rem] lg:text-[4rem]">
              Från besökarfråga till svar i{" "}
              <span className="bg-[linear-gradient(180deg,#e72e8a,#c91e70)] bg-clip-text text-transparent">
                ett sammanhållet flöde.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              En klickbar prototyp av Hemläkares administrativa kundservicechatt
              – med besökarwidget, gemensam inkorg, tilldelning, realtidssvar och
              säker eskalering.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                target="_blank"
                className="btn-cta flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-bold"
              >
                Testa som besökare
                <ExternalIcon className="size-4" />
              </Link>
              <Link
                href="/admin"
                target="_blank"
                className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
              >
                Öppna adminpanelen
                <ExternalIcon className="size-4" />
              </Link>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500">
              <InfoIcon className="size-4 shrink-0 text-[#d81b7d]" />
              Öppna vyerna i två flikar – de synkroniseras automatiskt i demon.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="absolute -inset-5 rotate-2 rounded-[40px] bg-[linear-gradient(145deg,#f7d5e4,#eee7ef)] opacity-70" />
            <div className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_28px_80px_rgba(49,42,60,0.16)]">
              <div className="flex items-center justify-between border-b border-slate-200 bg-[#fbfbfc] px-5 py-3">
                <div className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-[#ff6b6b]" />
                  <span className="size-2.5 rounded-full bg-[#ffd166]" />
                  <span className="size-2.5 rounded-full bg-[#53c692]" />
                </div>
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-slate-400">
                  Liveöversikt
                </span>
                <span className="w-10" />
              </div>

              <div className="grid grid-cols-[96px_1fr] sm:grid-cols-[132px_1fr]">
                <div className="border-r border-slate-200 bg-[#312a3c] p-3 sm:p-4">
                  <div className="flex items-center gap-2">
                    <span className="grid size-7 place-items-center rounded-lg bg-[#e72e8a] text-white">
                      <HeartIcon className="size-4" />
                    </span>
                    <span className="hidden text-[0.65rem] font-bold text-white sm:inline">
                      Hemläkare
                    </span>
                  </div>
                  <div className="mt-6 space-y-2">
                    {["Nya", "Mina", "Väntar", "Avslutade"].map(
                      (item, index) => (
                        <div
                          key={item}
                          className={`flex items-center justify-between rounded-lg px-2 py-2 text-[0.58rem] font-bold sm:text-[0.65rem] ${
                            index === 0
                              ? "bg-white/12 text-white"
                              : "text-white/45"
                          }`}
                        >
                          <span>{item}</span>
                          {index === 0 && (
                            <span className="grid size-4 place-items-center rounded-full bg-[#e72e8a] text-[0.5rem]">
                              {newCount}
                            </span>
                          )}
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="min-w-0 bg-[#f7f7f8]">
                  <div className="border-b border-slate-200 bg-white px-4 py-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[0.65rem] font-extrabold text-slate-900 sm:text-xs">
                          Kundservice
                        </p>
                        <p className="mt-0.5 text-[0.52rem] font-semibold text-emerald-700 sm:text-[0.6rem]">
                          {activeCount} aktiva ärenden
                        </p>
                      </div>
                      <span className="rounded-lg bg-pink-50 px-2 py-1 text-[0.52rem] font-bold text-[#b11e65] sm:text-[0.6rem]">
                        LIVE
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3 p-4 sm:p-5">
                    <div className="flex justify-end">
                      <div className="max-w-[82%] rounded-2xl rounded-br-md bg-[#332d3d] px-3 py-2 text-[0.6rem] leading-4 text-white sm:text-[0.7rem]">
                        Hej! Jag hjälper dig gärna. Jag skickar en säker länk
                        för ombokningen.
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="max-w-[76%] rounded-2xl rounded-bl-md border border-slate-200 bg-white px-3 py-2 text-[0.6rem] leading-4 text-slate-700 sm:text-[0.7rem]">
                        Tack! Det låter bra. Kan jag välja en ny tid där?
                      </div>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-3">
                      <div className="h-2 w-28 rounded-full bg-slate-100" />
                      <div className="mt-2 h-2 w-4/5 rounded-full bg-slate-100" />
                      <div className="mt-3 flex justify-end">
                        <span className="rounded-lg bg-[#e72e8a] px-3 py-1.5 text-[0.52rem] font-bold text-white sm:text-[0.6rem]">
                          Skicka svar
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-3 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 shadow-xl sm:-left-8">
              <span className="grid size-8 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                <CheckIcon className="size-4" />
              </span>
              <div>
                <p className="text-[0.65rem] font-extrabold text-slate-900">
                  Svar levererat
                </p>
                <p className="text-[0.55rem] font-medium text-slate-400">
                  Synkat mellan båda vyerna
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#c81e70]">
            Presentationsmanus
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-4xl">
            Visa hela flödet på två minuter
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Följ stegen nedan. Då demonstrerar du både användarnytta,
            arbetsflöde och säkerhetsgräns utan att fastna i tekniska detaljer.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {demoSteps.map((step) => (
            <article
              key={step.number}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black tracking-tight text-pink-200 transition group-hover:text-[#e72e8a]">
                  {step.number}
                </span>
                <ArrowRightIcon className="size-4 text-slate-300" />
              </div>
              <h3 className="mt-6 text-base font-extrabold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                {step.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#c81e70]">
                Lösningsbild
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.035em] text-slate-950">
                Enkel att demonstrera. Tydlig att produktionssätta.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Prototypen använder lokal webbläsarlagring för att simulera
                realtid. Produktionslösningen ersätter endast datalagret och
                identiteten – det validerade arbetsflödet kan bestå.
              </p>
              <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <div className="flex gap-3">
                  <ShieldIcon className="mt-0.5 size-5 shrink-0 text-amber-700" />
                  <div>
                    <p className="text-sm font-extrabold text-amber-950">
                      Medveten säkerhetsgräns
                    </p>
                    <p className="mt-1 text-xs leading-5 text-amber-900/75">
                      MVP:n är en administrativ kundservicekanal. Medicinska
                      frågor, bilder och patientuppgifter går vidare till en
                      separat, identifierad och säker patientkontakt.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-[#fafafa] p-5 sm:p-7">
              <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                Produktionsarkitektur
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <ArchitectureCard
                  icon={<BrowserIcon className="size-5" />}
                  title="Besökarwidget"
                  body="Anonym session, ämnesval och meddelanden"
                />
                <ArchitectureCard
                  icon={<ApiIcon className="size-5" />}
                  title="API & realtid"
                  body="Validering, rate limit och händelser"
                />
                <ArchitectureCard
                  icon={<DatabaseIcon className="size-5" />}
                  title="Chattjänst"
                  body="EU-hostad data, köer och revisionslogg"
                />
                <ArchitectureCard
                  icon={<TeamIcon className="size-5" />}
                  title="Personalvy"
                  body="SSO, MFA, roller och tilldelning"
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Kryptering",
                  "Åtkomstlogg",
                  "Datalagring",
                  "Neutrala notifieringar",
                  "Övervakning",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[0.65rem] font-bold text-slate-500"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-5 lg:grid-cols-2">
          <ScopeCard
            tone="included"
            title="Det MVP:n bevisar"
            items={[
              "Besökaren kan starta en administrativ chatt utan konto",
              "Nya ärenden kan prioriteras och tas av en medarbetare",
              "Svar och status synkas mellan besökare och personal",
              "Säkra hänvisningar och avslut ingår i arbetsflödet",
              "Gränssnittet fungerar på mobil och desktop",
            ]}
          />
          <ScopeCard
            tone="production"
            title="Beslut före produktion"
            items={[
              "Godkänd hosting, databas och realtidsleverantör",
              "SSO/MFA, roller och atomär ärendetilldelning",
              "Lagringstid, gallring och eventuell journalhantering",
              "DPIA, personuppgiftsbiträden och informationsklassning",
              "Bemanning, SLA, notifieringar och systemintegrationer",
            ]}
          />
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-[#312a3c]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-8 sm:flex-row sm:items-center sm:px-8">
          <div>
            <p className="text-sm font-extrabold text-white">
              Redo att demonstrera
            </p>
            <p className="mt-1 text-xs text-white/55">
              Återställ demodata före mötet och öppna de två vyerna sida vid
              sida.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={resetDemo}
              className="flex min-h-11 items-center gap-2 rounded-xl border border-white/15 px-4 text-xs font-bold text-white transition hover:bg-white/10"
            >
              <RefreshIcon className="size-4" />
              Återställ demo
            </button>
            <Link
              href="/admin"
              target="_blank"
              className="flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 text-xs font-bold text-[#312a3c] transition hover:bg-pink-50"
            >
              Starta presentationen
              <ArrowRightIcon className="size-4" />
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ArchitectureCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <article className="relative rounded-2xl border border-slate-200 bg-white p-4">
      <span className="grid size-9 place-items-center rounded-xl bg-pink-50 text-[#c81e70]">
        {icon}
      </span>
      <h3 className="mt-4 text-xs font-extrabold text-slate-900">{title}</h3>
      <p className="mt-1.5 text-[0.68rem] leading-5 text-slate-500">{body}</p>
    </article>
  );
}

function ScopeCard({
  tone,
  title,
  items,
}: {
  tone: "included" | "production";
  title: string;
  items: string[];
}) {
  const included = tone === "included";
  return (
    <article
      className={`rounded-3xl border p-6 sm:p-8 ${
        included
          ? "border-emerald-200 bg-emerald-50/60"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`grid size-10 place-items-center rounded-xl ${
            included
              ? "bg-emerald-100 text-emerald-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {included ? (
            <CheckIcon className="size-5" />
          ) : (
            <FlagIcon className="size-5" />
          )}
        </span>
        <h2 className="text-xl font-extrabold tracking-tight text-slate-950">
          {title}
        </h2>
      </div>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-sm leading-6 text-slate-600"
          >
            <span
              className={`mt-2 size-1.5 shrink-0 rounded-full ${
                included ? "bg-emerald-500" : "bg-[#e72e8a]"
              }`}
            />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

function BrandMark() {
  return (
    <span className="grid size-9 place-items-center rounded-xl bg-[linear-gradient(180deg,#e72e8a,#d81b7d)] text-white shadow-sm">
      <HeartIcon className="size-5" />
    </span>
  );
}

type IconProps = { className?: string };

function BaseIcon({
  className,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function ArrowRightIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </BaseIcon>
  );
}

function ExternalIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M14 4h6v6M20 4l-9 9" />
      <path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" />
    </BaseIcon>
  );
}

function RefreshIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M20 7h-6V1" />
      <path d="M20 7a9 9 0 1 0 1 8" />
    </BaseIcon>
  );
}

function InfoIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </BaseIcon>
  );
}

function CheckIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m5 12 4 4L19 6" />
    </BaseIcon>
  );
}

function ShieldIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 22s8-3.8 8-10V5l-8-3-8 3v7c0 6.2 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </BaseIcon>
  );
}

function HeartIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    </BaseIcon>
  );
}

function BrowserIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
    </BaseIcon>
  );
}

function ApiIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" />
    </BaseIcon>
  );
}

function DatabaseIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7" />
    </BaseIcon>
  );
}

function TeamIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c.5-4 2.5-6 6-6s5.5 2 6 6M16 5a3 3 0 0 1 0 6M17 14c2.5.5 3.8 2.5 4 5" />
    </BaseIcon>
  );
}

function FlagIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5 21V4M5 5h10l-1 4 1 4H5" />
    </BaseIcon>
  );
}
