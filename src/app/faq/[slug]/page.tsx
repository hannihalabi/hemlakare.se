import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/site";

const articles: Record<string, { title: string; body: string }> = {
  "vad-kostar-det": {
    title: "Vad kostar det?",
    body: "Hemläkare.se är privatfinansierad vård. Läkarhjälp kostar 995 kr, jämfört med ordinarie pris 2 790 kr. Frikort och högkostnadsskydd gäller inte hos oss.",
  },
  "lista-mig": {
    title: "Behöver jag bli patient hos er?",
    body: "Ja, för att få tillgång till din egen läkare och sköterska behöver du bli patient hos oss. Det gör du enkelt online på bara några minuter.",
  },
  "var-finns-ni": {
    title: "Var finns ni?",
    body: "Vi finns just nu enbart i Stockholm. Här erbjuder vi mottagningsbesök, digital vård, hembesök och vaccination hemma.",
  },
  "hur-fungerar-det": {
    title: "Hur fungerar det?",
    body: "Boka en tid i vår onlinekalender och beskriv ditt ärende. Din läkare eller sköterska svarar snabbt digitalt. Behöver du ett fysiskt möte kommer vi till dig — hemma, på jobbet eller på mottagningen.",
  },
  "bokning": {
    title: "Fråga om bokning",
    body: "Du bokar tid direkt i vår onlinekalender. Välj om du vill ha ett digitalt möte, hembesök eller besök på mottagningen. Vi erbjuder tider som passar din vardag.",
  },
  "prata-med-oss": {
    title: "Prata med vårdpersonalen",
    body: "När du har bokat tid kan du skriva meddelanden, skicka bilder och ha videosamtal med din läkare eller sköterska – allt online. Du når oss snabbt utan att behöva sitta i telefonkö.",
  },
};

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];
  return {
    title: article ? `${article.title} — Hemläkare.se` : "Frågor & svar — Hemläkare.se",
    alternates: {
      canonical: `/faq/${slug}`,
    },
    openGraph: {
      url: `${SITE_URL}/faq/${slug}`,
    },
  };
}

export default async function FaqSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) notFound();

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-20 flex flex-col gap-6">
        <Link href="/faq" className="text-[0.88rem] font-semibold" style={{ color: "#E72E8A" }}>
          ← Tillbaka till FAQ
        </Link>
        <h1 className="text-[2rem] font-bold text-gray-900">{article.title}</h1>
        <p className="text-[1rem] text-gray-600 leading-relaxed">{article.body}</p>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
