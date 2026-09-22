import Link from "next/link";
import ChatWidget from "@/components/ChatWidget";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { BloodTestPackages, VaccinationPrices } from "@/components/ServicePageExtras";
import { healthcareServicesBySlug, type HealthcareService } from "@/data/services";
import { SITE_URL } from "@/lib/site";

export function ServicePageBody({
  service,
  canonicalPath = service.slug,
}: {
  service: HealthcareService;
  canonicalPath?: string;
}) {
  const related = service.relatedSlugs
    .map((relatedSlug) => healthcareServicesBySlug.get(relatedSlug))
    .filter((item): item is HealthcareService => Boolean(item));

  const canonicalUrl = `${SITE_URL}/${canonicalPath}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: service.seoTitle,
        description: service.metaDescription,
        inLanguage: "sv-SE",
        about: { "@id": `${canonicalUrl}#service` },
      },
      {
        "@type": "Service",
        "@id": `${canonicalUrl}#service`,
        name: service.name,
        description: service.metaDescription,
        provider: {
          "@type": "MedicalOrganization",
          name: "Hemläkare.se",
          url: SITE_URL,
          telephone: "+46-10-808-60-84",
        },
        areaServed: { "@type": "AdministrativeArea", name: "Stockholm" },
        url: canonicalUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Hem", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Tjänster", item: `${SITE_URL}/#halsokontroller` },
          { "@type": "ListItem", position: 3, name: service.name, item: canonicalUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replaceAll("<", "\\u003c") }}
      />
      <Header />
      <main className="bg-white">
        <ServiceHero service={service} />

        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-12 sm:space-y-16">
            <ContentSection title={service.suitableTitle} intro={service.suitableIntro}>
              <CheckList items={service.suitableFor} />
            </ContentSection>

            <section aria-labelledby="sa-gar-det-till">
              <SectionEyebrow>Steg för steg</SectionEyebrow>
              <h2 id="sa-gar-det-till" className="mt-2 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                Så går det till
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {service.steps.map((step, index) => (
                  <article key={step.title} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_8px_25px_rgba(15,23,42,0.04)]">
                    <span className="grid size-9 place-items-center rounded-full bg-[#e72e8a] text-sm font-black text-white">{index + 1}</span>
                    <h3 className="mt-4 font-bold text-gray-950">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.description}</p>
                  </article>
                ))}
              </div>
            </section>

            {service.slug === "blodprovstagning" ? <BloodTestPackages /> : null}
            {service.slug === "vaccination-hemma" ? <VaccinationPrices /> : null}

            <ContentSection title={service.scopeTitle} intro={service.scopeIntro}>
              <CheckList items={service.scopeItems} />
            </ContentSection>

            <section aria-labelledby="viktigt" className="rounded-[2rem] border border-amber-200 bg-amber-50 p-5 sm:p-8">
              <div className="flex items-start gap-4">
                <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full bg-amber-100 text-xl text-amber-900">!</span>
                <div>
                  <h2 id="viktigt" className="text-xl font-bold text-gray-950 sm:text-2xl">{service.importantTitle}</h2>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-gray-700 sm:text-base">
                    {service.important.map((item) => <li key={item}>• {item}</li>)}
                  </ul>
                </div>
              </div>
            </section>

            <section aria-labelledby="fragor">
              <SectionEyebrow>Frågor och svar</SectionEyebrow>
              <h2 id="fragor" className="mt-2 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">Vanliga frågor om {service.name.toLowerCase()}</h2>
              <div className="mt-6 divide-y divide-gray-200 border-y border-gray-200">
                {service.faq.map((item) => (
                  <details key={item.question} className="group py-1">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-bold text-gray-950 marker:content-none">
                      {item.question}
                      <span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-full bg-pink-50 text-lg text-[#d81b7d] transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="max-w-3xl pb-5 pr-10 leading-relaxed text-gray-600">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section aria-labelledby="relaterade">
              <h2 id="relaterade" className="text-2xl font-bold tracking-tight text-gray-950">Relaterade tjänster</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {related.map((item) => (
                  <Link key={item.slug} href={`/${servicePath(item.slug)}`} className="group rounded-2xl border border-gray-200 p-5 transition hover:-translate-y-0.5 hover:border-pink-200 hover:shadow-lg">
                    <h3 className="font-bold text-gray-950 group-hover:text-[#d81b7d]">{item.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.price}</p>
                    <span className="mt-4 inline-block text-sm font-bold text-[#d81b7d]">Läs mer →</span>
                  </Link>
                ))}
              </div>
            </section>

            <section aria-labelledby="kallor" className="border-t border-gray-200 pt-6">
              <h2 id="kallor" className="text-sm font-bold uppercase tracking-[0.1em] text-gray-500">Medicinska källor och vidare läsning</h2>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                {service.sources.map((source) => (
                  <li key={source.href}>
                    <a href={source.href} target="_blank" rel="noreferrer" className="text-sm font-semibold text-[#d81b7d] hover:underline">{source.label} ↗</a>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-gray-500">
                Informationen är generell och ersätter inte en individuell medicinsk bedömning. Medicinskt innehåll bör granskas regelbundet när rekommendationer eller tjänstens upplägg ändras.
              </p>
            </section>
          </div>

          <aside className="lg:order-none">
            <div className="sticky top-24 rounded-[2rem] border border-pink-100 bg-[#fff8fb] p-6 shadow-[0_16px_40px_rgba(216,27,125,0.08)]">
              <p className="text-sm font-bold text-[#d81b7d]">{service.name}</p>
              <p className="mt-2 text-3xl font-black tracking-tight text-gray-950">{service.price}</p>
              {service.originalPrice ? <p className="mt-1 text-sm text-gray-400 line-through">Ordinarie {service.originalPrice}</p> : null}
              <p className="mt-4 text-sm leading-relaxed text-gray-600">{service.priceNote}</p>
              <Link href={service.bookingHref} className="btn-cta mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full px-6 font-bold">
                {getCtaLabel(service.slug)}
              </Link>
              <a href="tel:0108086084" className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-full border-2 border-[#e72e8a] px-6 font-bold text-[#d81b7d] transition hover:bg-pink-50">
                Ring 010 808 60 84
              </a>
              <p className="mt-5 border-t border-pink-100 pt-5 text-xs leading-relaxed text-gray-500">
                Inte akutvård. Ring 112 vid livshotande tillstånd eller 1177 för sjukvårdsrådgivning.
              </p>
            </div>
          </aside>
        </div>

        <section className="bg-[#2b2d3b] px-5 py-14 text-white sm:px-6">
          <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Redo att ta nästa steg?</h2>
              <p className="mt-2 max-w-2xl text-white/70">Boka {service.name.toLowerCase()} eller kontakta oss om du vill veta om tjänsten passar dig.</p>
            </div>
            <Link href={service.bookingHref} className="btn-cta inline-flex min-h-12 shrink-0 items-center justify-center rounded-full px-7 font-bold">
              {getCtaLabel(service.slug)}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}

function ServiceHero({ service }: { service: HealthcareService }) {
  return (
    <section className="overflow-hidden border-b border-pink-100 bg-[radial-gradient(circle_at_85%_15%,rgba(231,46,138,0.17),transparent_32%),linear-gradient(180deg,#fff_0%,#fff5fa_100%)] px-5 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <nav aria-label="Brödsmulor" className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#d81b7d]">Hem</Link><span aria-hidden="true">/</span>
          <Link href="/#halsokontroller" className="hover:text-[#d81b7d]">Tjänster</Link><span aria-hidden="true">/</span>
          <span aria-current="page" className="text-gray-800">{service.name}</span>
        </nav>
        <div className="mt-8 grid items-center gap-9 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.13em] text-[#d81b7d]">{service.eyebrow}</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-black leading-[1.08] tracking-[-0.035em] text-gray-950 sm:text-5xl lg:text-6xl">{service.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-600 sm:text-xl">{service.lead}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={service.bookingHref} className="btn-cta inline-flex min-h-12 items-center justify-center rounded-full px-7 font-bold">{getCtaLabel(service.slug)}</Link>
              <a href="#sa-gar-det-till" className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-gray-300 bg-white px-7 font-bold text-gray-800 transition hover:border-pink-300">Så fungerar det</a>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white bg-white/90 p-6 shadow-[0_24px_65px_rgba(93,29,66,0.12)] backdrop-blur sm:p-8">
            <p className="text-sm font-bold text-[#d81b7d]">Pris</p>
            <div className="mt-1 flex flex-wrap items-baseline gap-3">
              <p className="text-4xl font-black tracking-tight text-gray-950">{service.price}</p>
              {service.originalPrice ? <p className="text-base text-gray-400 line-through">{service.originalPrice}</p> : null}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">{service.priceNote}</p>
            <ul className="mt-6 space-y-3 border-t border-pink-100 pt-5">
              {service.highlights.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-semibold text-gray-800">
                  <span aria-hidden="true" className="grid size-6 shrink-0 place-items-center rounded-full bg-pink-50 text-[#d81b7d]">✓</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#d81b7d]">{children}</p>;
}

function ContentSection({ title, intro, children }: { title: string; intro: string; children: React.ReactNode }) {
  return (
    <section>
      <SectionEyebrow>Om tjänsten</SectionEyebrow>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">{title}</h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-gray-600 sm:text-lg">{intro}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 rounded-2xl border border-gray-200 bg-white p-4 text-sm leading-relaxed text-gray-700 shadow-[0_5px_18px_rgba(15,23,42,0.03)] sm:text-base">
          <span aria-hidden="true" className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-pink-50 font-bold text-[#d81b7d]">✓</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function servicePath(slug: string) {
  return slug === "fysiskt-lakarbesok" ? "lakare/hembesok" : slug;
}

function getCtaLabel(slug: string) {
  if (slug === "blodprovstagning") return "Se paket och boka";
  if (slug === "vaccination-hemma") return "Fråga om tid";
  if (slug === "medicinsk-viktminskning") return "Starta din bedömning";
  return "Boka tid";
}
