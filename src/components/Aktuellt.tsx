import Image from "next/image";
import Link from "next/link";
import { articles } from "@/data/articles";

const featured = articles.slice(0, 3);

export default function Aktuellt() {
  return (
    <section className="bg-[#fdf5f9] py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
        <h2 className="text-[2rem] sm:text-[2.4rem] font-bold tracking-tight text-gray-900 text-center">
          Aktuellt
        </h2>

        <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((a) => (
            <article
              key={a.slug}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col"
            >
              <div className="relative w-full aspect-[4/3] bg-gray-100">
                <Image src={a.image} alt={a.title} fill className="object-cover" />
                <span
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-[0.7rem] font-bold text-white tracking-wide"
                  style={{ background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)" }}
                >
                  {a.tag}
                </span>
              </div>

              <div className="flex flex-col gap-3 p-6 flex-1">
                <Link
                  href={`/aktuellt/${a.slug}`}
                  className="text-[1.05rem] font-bold leading-snug hover:opacity-80 transition-opacity"
                  style={{ color: "#E72E8A" }}
                >
                  {a.title}
                </Link>

                <p className="text-[0.9rem] text-gray-600 leading-relaxed flex-1">{a.excerpt}</p>

                <Link
                  href={`/aktuellt/${a.slug}`}
                  className="text-[0.8rem] font-bold tracking-wide uppercase"
                  style={{ color: "#E72E8A" }}
                >
                  Läs artikeln »
                </Link>

                <span className="text-[0.82rem] text-gray-400 border-t border-gray-100 pt-3">
                  {a.date}
                </span>
              </div>
            </article>
          ))}
        </div>

        <Link
          href="/aktuellt"
          className="btn-cta px-10 py-4 rounded-full text-[1rem] font-bold text-white transition-all"
        >
          Se fler artiklar
        </Link>
      </div>
    </section>
  );
}
