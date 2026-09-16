import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Image from "next/image";
import Link from "next/link";
import { articles } from "@/data/articles";
import { getPublishedContentSafe } from "@/lib/content-server";
import { SITE_URL } from "@/lib/site";

export const revalidate = 300;

export const metadata = {
  title: "Aktuellt",
  description: "Nyheter, hälsoråd och information från Hemläkare.se.",
  alternates: { canonical: "/aktuellt" },
  openGraph: {
    title: "Aktuellt — Hemläkare.se",
    description: "Nyheter, hälsoråd och information från Hemläkare.se.",
    url: `${SITE_URL}/aktuellt`,
  },
};

export default async function AktuelltPage() {
  const cmsContent = await getPublishedContentSafe();
  const cmsSlugs = new Set(cmsContent.map((item) => item.slug));
  const allContent = [
    ...cmsContent.map((item) => ({ ...item, date: item.publishedAt ? new Intl.DateTimeFormat("sv-SE", { dateStyle: "long" }).format(new Date(item.publishedAt)) : "Publicerad", image: item.ogImage ?? "" })),
    ...articles.filter((article) => !cmsSlugs.has(article.slug)),
  ];

  function hasArticleImage(image: string | null | undefined) {
    return Boolean(image?.trim()) && !image?.startsWith("/bilder/aktuellt-");
  }

  return (
    <>
      <Header />
      <main className="bg-[#fdf5f9] min-h-screen py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <h1 className="text-[2.4rem] font-bold text-gray-900">Aktuellt</h1>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allContent.map((a) => (
              <article
                key={a.slug}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col"
              >
                {hasArticleImage(a.image) && (
                  <Link
                    href={`/aktuellt/${a.slug}`}
                    className="relative block aspect-[16/9] w-full overflow-hidden bg-pink-50"
                    aria-label={`Läs artikeln ${a.title}`}
                  >
                    <Image
                      src={a.image}
                      alt={"imageAlt" in a && a.imageAlt ? a.imageAlt : a.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 hover:scale-[1.03]"
                    />
                  </Link>
                )}

                <div className="flex flex-col gap-3 p-6 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="px-3 py-1 rounded-full text-[0.7rem] font-bold text-white"
                      style={{ background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)" }}
                    >
                      {a.tag}
                    </span>
                    <span className="text-[0.76rem] text-gray-400">{a.date}</span>
                  </div>

                  <Link
                    href={`/aktuellt/${a.slug}`}
                    className="text-[1rem] font-bold leading-snug hover:opacity-80 transition-opacity"
                    style={{ color: "#E72E8A" }}
                  >
                    {a.title}
                  </Link>

                  <p className="text-[0.88rem] text-gray-600 leading-relaxed flex-1">{a.excerpt}</p>

                  <Link
                    href={`/aktuellt/${a.slug}`}
                    className="text-[0.8rem] font-bold tracking-wide uppercase mt-auto"
                    style={{ color: "#E72E8A" }}
                  >
                    Läs artikeln »
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
