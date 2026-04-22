import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, articlesBySlug } from "@/data/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articlesBySlug[slug];
  const title = article ? article.title : "Aktuellt";
  const description = article?.excerpt ?? "Nyheter och hälsoråd från Hemläkare.se.";
  return {
    title,
    description,
    openGraph: {
      title: `${title} — Hemläkare.se`,
      description,
      url: `https://hemlakare.se/aktuellt/${slug}`,
    },
  };
}

export default async function AktuelltSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articlesBySlug[slug];

  if (!article) notFound();

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-20 flex flex-col gap-6">
        <Link href="/aktuellt" className="text-[0.88rem] font-semibold" style={{ color: "#E72E8A" }}>
          ← Tillbaka till Aktuellt
        </Link>
        <div className="flex items-center gap-2">
          <span
            className="px-3 py-1 rounded-full text-[0.7rem] font-bold text-white"
            style={{ background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)" }}
          >
            {article.tag}
          </span>
          <span className="text-[0.82rem] text-gray-400">{article.date}</span>
        </div>
        <h1 className="text-[2rem] font-bold text-gray-900 leading-snug">{article.title}</h1>
        <p className="text-[1rem] text-gray-600 leading-relaxed">{article.body}</p>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
