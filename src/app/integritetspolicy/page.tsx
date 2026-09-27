import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Integritetspolicy",
  description:
    "Så behandlar Hemläkartjänst Stockholm AB personuppgifter på Hemläkare.se och i våra digitala tjänster.",
  alternates: { canonical: "/integritetspolicy" },
  openGraph: {
    title: "Integritetspolicy — Hemläkare.se",
    description:
      "Information om hur Hemläkartjänst Stockholm AB behandlar och skyddar personuppgifter.",
    url: `${SITE_URL}/integritetspolicy`,
  },
};

const sections = [
  { id: "ansvarig", label: "Personuppgiftsansvarig" },
  { id: "uppgifter", label: "Uppgifter vi behandlar" },
  { id: "andamal", label: "Ändamål och rättslig grund" },
  { id: "google-ads", label: "Google Ads-integration" },
  { id: "mottagare", label: "Leverantörer och överföringar" },
  { id: "lagring", label: "Lagringstid" },
  { id: "sakerhet", label: "Säkerhet" },
  { id: "rattigheter", label: "Dina rättigheter" },
  { id: "kontakt", label: "Kontakt och klagomål" },
];

function PolicySection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-slate-200 pt-8">
      <h2 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[0.96rem] leading-7 text-slate-600">
        {children}
      </div>
    </section>
  );
}

export default function IntegritetspolicyPage() {
  return (
    <>
      <Header />
      <main className="bg-[#f7f7f8] px-5 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <header className="border-b border-slate-200 px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#c81e70]">
                Juridisk information
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Integritetspolicy
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                Den här policyn beskriver hur Hemläkartjänst Stockholm AB behandlar
                personuppgifter när du använder Hemläkare.se, kontaktar oss, bokar en
                tjänst eller använder våra digitala funktioner.
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-500">
                Senast uppdaterad: 27 september 2026
              </p>
            </header>

            <div className="grid gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[230px_minmax(0,1fr)] lg:px-14">
              <aside className="lg:sticky lg:top-24 lg:self-start">
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-400">
                  Innehåll
                </p>
                <nav className="mt-4 flex flex-wrap gap-2 lg:flex-col" aria-label="Sidans innehåll">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-pink-50 hover:text-[#c81e70]"
                    >
                      {section.label}
                    </a>
                  ))}
                </nav>
              </aside>

              <article className="min-w-0 space-y-10">
                <PolicySection id="ansvarig" title="1. Personuppgiftsansvarig">
                  <p>
                    Hemläkartjänst Stockholm AB, organisationsnummer 559123-3282, är
                    personuppgiftsansvarig för den behandling som beskrivs i denna policy.
                  </p>
                  <p>
                    Du når oss på{" "}
                    <a className="font-semibold text-[#c81e70] underline underline-offset-4" href="mailto:info@hemlakare.se">
                      info@hemlakare.se
                    </a>
                    .
                  </p>
                </PolicySection>

                <PolicySection id="uppgifter" title="2. Vilka uppgifter vi behandlar">
                  <p>Beroende på hur du använder tjänsten kan vi behandla:</p>
                  <ul className="list-disc space-y-2 pl-6 marker:text-[#c81e70]">
                    <li>namn, e-postadress och telefonnummer,</li>
                    <li>bokad tjänst, vald tid, bokningsstatus och meddelanden du lämnar i bokningen,</li>
                    <li>betalnings- och transaktionsreferenser; kortuppgifter hanteras av Stripe och lagras inte av oss,</li>
                    <li>namn, ämne och meddelanden som du lämnar i webbchatten,</li>
                    <li>teknisk information om enhet, webbläsare, besök och fel som behövs för drift, säkerhet och webbstatistik,</li>
                    <li>uppgifter som krävs för att administrera vård och uppfylla skyldigheter enligt tillämplig vårdlagstiftning, samt</li>
                    <li>annonskontots identitet och aggregerade rapportvärden från Google Ads när en behörig administratör ansluter kontot.</li>
                  </ul>
                  <p>
                    Skriv inte personnummer, diagnoser eller andra känsliga hälsouppgifter i
                    den öppna webbchatten. När sådana uppgifter behövs hänvisar vi till en
                    avsedd och säker vårdkanal.
                  </p>
                </PolicySection>

                <PolicySection id="andamal" title="3. Ändamål och rättslig grund">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[620px] border-separate border-spacing-0 overflow-hidden rounded-xl border border-slate-200 text-left text-sm">
                      <thead className="bg-slate-50 text-slate-800">
                        <tr>
                          <th className="border-b border-slate-200 px-4 py-3 font-bold">Ändamål</th>
                          <th className="border-b border-slate-200 px-4 py-3 font-bold">Rättslig grund</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border-b border-slate-100 px-4 py-3">Hantera bokningar, betalningar och avtalade tjänster</td>
                          <td className="border-b border-slate-100 px-4 py-3">Avtal eller åtgärder innan avtal</td>
                        </tr>
                        <tr>
                          <td className="border-b border-slate-100 px-4 py-3">Kontakta och hjälpa besökare via chatt eller e-post</td>
                          <td className="border-b border-slate-100 px-4 py-3">Avtal eller berättigat intresse av att ge service</td>
                        </tr>
                        <tr>
                          <td className="border-b border-slate-100 px-4 py-3">Tillhandahålla vård, föra journal och uppfylla krav på patientsäkerhet</td>
                          <td className="border-b border-slate-100 px-4 py-3">Rättslig förpliktelse och hälso- och sjukvårdsändamål</td>
                        </tr>
                        <tr>
                          <td className="border-b border-slate-100 px-4 py-3">Säkerhet, felsökning och förbättring av webbplatsen</td>
                          <td className="border-b border-slate-100 px-4 py-3">Berättigat intresse; samtycke när det krävs för kakor eller liknande teknik</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3">Intern uppföljning av annonsering</td>
                          <td className="px-4 py-3">Berättigat intresse av att mäta och förbättra vår marknadsföring</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </PolicySection>

                <PolicySection id="google-ads" title="4. Google Ads-integrationen">
                  <p>
                    En behörig administratör kan ansluta Hemläkares eget Google Ads-konto
                    genom Google OAuth. Integrationen används enbart för intern, läsande
                    rapportering. Den skapar, ändrar eller tar inte bort annonser.
                  </p>
                  <p>Vi hämtar och behandlar följande uppgifter från Google Ads:</p>
                  <ul className="list-disc space-y-2 pl-6 marker:text-[#c81e70]">
                    <li>kund- och kampanj-ID samt kampanjnamn,</li>
                    <li>datum och kontovaluta,</li>
                    <li>kostnad, visningar, klick, konverteringar och konverteringsvärde, samt</li>
                    <li>status, tidpunkt och eventuella fel för synkroniseringar.</li>
                  </ul>
                  <p>
                    Uppgifterna används för att visa kampanjresultat i en inloggningsskyddad
                    adminvy. De används inte för patientbehandling, medicinska beslut,
                    kreditbedömning eller försäljning av personuppgifter. Google Ads-data
                    kombineras inte med patientjournaler.
                  </p>
                  <p>
                    OAuth-klientuppgifter och refresh token lagras som skyddade
                    serverhemligheter. Åtkomsten kan återkallas i Google-kontots
                    säkerhetsinställningar. När anslutningen inte längre behövs ska token
                    återkallas och lagrade rapportuppgifter raderas eller anonymiseras när de
                    inte längre behövs för ändamålet.
                  </p>
                  <p>
                    Vår användning av information från Google API:er följer{" "}
                    <a
                      href="https://developers.google.com/terms/api-services-user-data-policy"
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-[#c81e70] underline underline-offset-4"
                    >
                      Google API Services User Data Policy
                    </a>
                    , inklusive kraven om Limited Use.
                  </p>
                </PolicySection>

                <PolicySection id="mottagare" title="5. Leverantörer och överföringar">
                  <p>
                    Vi använder leverantörer som behandlar uppgifter för vår räkning eller
                    som självständigt ansvarar för sin behandling. Det gäller bland annat:
                  </p>
                  <ul className="list-disc space-y-2 pl-6 marker:text-[#c81e70]">
                    <li>Vercel för webbdrift, prestanda- och besöksmätning,</li>
                    <li>Neon för databasdrift,</li>
                    <li>Stripe för betalning,</li>
                    <li>Google för kalenderfunktion och Google Ads-rapportering, samt</li>
                    <li>andra leverantörer som krävs för säker drift och kommunikation.</li>
                  </ul>
                  <p>
                    Uppgifter lämnas också ut när det krävs enligt lag eller ett bindande
                    myndighetsbeslut. Vissa leverantörer kan behandla uppgifter utanför
                    EU/EES. När det sker ska överföringen ha stöd i ett giltigt
                    överföringsverktyg och omfattas av lämpliga skyddsåtgärder.
                  </p>
                </PolicySection>

                <PolicySection id="lagring" title="6. Hur länge uppgifter sparas">
                  <p>
                    Vi sparar personuppgifter endast så länge de behövs för det ändamål de
                    samlades in för eller så länge lag kräver. Boknings- och
                    betalningsunderlag kan behöva sparas för att hantera tjänsten,
                    reklamationer, bokföring och rättsliga anspråk. Patientjournaler och
                    annan vårddokumentation bevaras enligt patientdatalagen och annan
                    tillämplig vårdlagstiftning.
                  </p>
                  <p>
                    Chatt- och kontaktuppgifter gallras när ärendet är avslutat och
                    uppgifterna inte längre behövs för service, säkerhet eller rättsliga
                    anspråk. Google Ads-rapportdata sparas medan integrationen används och
                    så länge uppgifterna behövs för jämförelse och verksamhetsuppföljning.
                    Uppgifter raderas eller anonymiseras därefter.
                  </p>
                </PolicySection>

                <PolicySection id="sakerhet" title="7. Säkerhet">
                  <p>
                    Vi använder tekniska och organisatoriska skyddsåtgärder anpassade till
                    uppgifternas känslighet. Det omfattar bland annat åtkomstbegränsning,
                    inloggningsskyddade administrativa funktioner, krypterad överföring,
                    serverbaserad hantering av hemligheter och uppföljning av fel och
                    behörigheter.
                  </p>
                  <p>
                    Endast personer som behöver uppgifterna för sina arbetsuppgifter ska ha
                    åtkomst till dem.
                  </p>
                </PolicySection>

                <PolicySection id="rattigheter" title="8. Dina rättigheter">
                  <p>Du kan, beroende på behandling och rättslig grund, ha rätt att:</p>
                  <ul className="list-disc space-y-2 pl-6 marker:text-[#c81e70]">
                    <li>få information och tillgång till dina personuppgifter,</li>
                    <li>få felaktiga uppgifter rättade,</li>
                    <li>begära radering eller begränsning,</li>
                    <li>invända mot behandling som grundas på berättigat intresse,</li>
                    <li>få ut uppgifter i ett strukturerat format när dataportabilitet gäller, och</li>
                    <li>återkalla ett samtycke utan att det påverkar tidigare laglig behandling.</li>
                  </ul>
                  <p>
                    Rätten till radering och vissa andra rättigheter kan vara begränsade när
                    vi måste bevara uppgifter enligt exempelvis patientdatalagen eller
                    bokföringslagen. För patientjournaler gäller dessutom särskilda regler.
                  </p>
                </PolicySection>

                <PolicySection id="kontakt" title="9. Kontakt och klagomål">
                  <p>
                    Kontakta oss på{" "}
                    <a className="font-semibold text-[#c81e70] underline underline-offset-4" href="mailto:info@hemlakare.se">
                      info@hemlakare.se
                    </a>{" "}
                    om du har frågor eller vill utöva en rättighet. Vi kan behöva verifiera
                    din identitet innan vi lämnar ut eller ändrar uppgifter.
                  </p>
                  <p>
                    Du har också rätt att lämna klagomål till{" "}
                    <a
                      href="https://www.imy.se"
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-[#c81e70] underline underline-offset-4"
                    >
                      Integritetsskyddsmyndigheten (IMY)
                    </a>
                    .
                  </p>
                  <p>
                    Vi kan uppdatera policyn när tjänster, leverantörer eller regler ändras.
                    Den senaste versionen finns alltid på denna sida.
                  </p>
                  <Link
                    href="/"
                    className="mt-2 inline-flex min-h-11 items-center justify-center rounded-full bg-[#e72e8a] px-6 text-sm font-bold text-white transition hover:bg-[#cf1f79]"
                  >
                    Till startsidan
                  </Link>
                </PolicySection>
              </article>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
