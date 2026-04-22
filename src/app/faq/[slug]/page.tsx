import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Link from "next/link";
import { notFound } from "next/navigation";

const articles: Record<string, { title: string; body: string }> = {
  "vad-kostar-det": {
    title: "Vad kostar det?",
    body: "Hos Hemläkare.se gäller vanliga patientavgifter och frikort. Du betalar samma avgift som på en vanlig vårdcentral. Frikort och högkostnadsskydd gäller som vanligt.",
  },
  "lista-mig": {
    title: "Behöver jag lista mig?",
    body: "Ja, för att få tillgång till din egen läkare och sköterska behöver du lista dig hos oss. Det gör du enkelt via appen på bara några minuter.",
  },
  "var-finns-ni": {
    title: "Var finns ni?",
    body: "Vi har fysiska vårdcentraler i Region Stockholm och Västra Götalandsregionen. Du kan också söka vård digitalt oavsett var i Sverige du befinner dig.",
  },
  "hur-fungerar-det": {
    title: "Hur fungerar det?",
    body: "Ladda ner appen, lista dig och starta ett ärende. Din läkare eller sköterska svarar snabbt digitalt. Behöver du ett fysiskt möte kommer vi till dig — hemma, på jobbet eller på vårdcentralen.",
  },
  "bokning": {
    title: "Fråga om bokning",
    body: "Du bokar tid direkt i appen. Välj om du vill ha ett digitalt möte, hembesök eller besök på vårdcentralen. Vi erbjuder tider som passar din vardag.",
  },
  "prata-i-appen": {
    title: "Prata med vårdpersonalen i appen",
    body: "I appen kan du skriva meddelanden, skicka bilder och ha videosamtal med din läkare eller sköterska. Du når oss snabbt utan att behöva sitta i telefonkö.",
  },
};

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];
  return {
    title: article ? `${article.title} — Hemläkare.se` : "FAQ — Hemläkare.se",
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
