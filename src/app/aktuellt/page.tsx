import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Link from "next/link";
import { articles } from "@/data/articles";

export const metadata = {
  title: "Aktuellt",
  description: "Nyheter, hälsoråd och information från Hemläkare.se.",
  openGraph: {
    title: "Aktuellt — Hemläkare.se",
    description: "Nyheter, hälsoråd och information från Hemläkare.se.",
    url: "https://hemlakare.se/aktuellt",
  },
};

export default function AktuelltPage() {
  return (
    <>
      <Header />
      <main className="bg-[#fdf5f9] min-h-screen py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <h1 className="text-[2.4rem] font-bold text-gray-900">Aktuellt</h1>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((a) => (
              <article
                key={a.slug}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col"
              >
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
