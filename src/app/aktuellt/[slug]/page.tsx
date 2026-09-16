import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, articlesBySlug } from "@/data/articles";
import { resolveArticleImage } from "@/data/article-images";
import type { Article } from "@/data/articles";
import { getPublishedContentBySlugSafe, getPublishedContentSlugsSafe } from "@/lib/content-server";

export async function generateStaticParams() {
  const cmsSlugs = await getPublishedContentSlugsSafe();
  return [...new Set([...articles.map((a) => a.slug), ...cmsSlugs])].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articlesBySlug[slug];
  const cmsArticle = article ? null : await getPublishedContentBySlugSafe(slug);
  const title = article?.seoTitle ?? article?.title ?? cmsArticle?.title ?? "Aktuellt";
  const description = article?.metaDescription ?? article?.excerpt ?? cmsArticle?.metaDescription ?? cmsArticle?.excerpt ?? "Nyheter och hälsoråd från Hemläkare.se.";
  const cmsImage = cmsArticle ? resolveArticleImage(cmsArticle.slug, cmsArticle.ogImage) : null;
  return {
    title,
    description,
    alternates: {
      canonical: cmsArticle?.canonicalUrl?.replace("https://hemlakare.se", "https://xn--hemlkare-3za.se") ?? `https://xn--hemlkare-3za.se/aktuellt/${slug}`,
    },
    robots: cmsArticle?.robots.includes("noindex") ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title: `${title} — Hemläkare.se`,
      description,
      url: `https://xn--hemlkare-3za.se/aktuellt/${slug}`,
      images: article?.image ? [{ url: article.image, alt: article.imageAlt ?? article.title }] : cmsImage ? [{ url: cmsImage.src, alt: cmsImage.alt ?? cmsArticle?.title }] : undefined,
    },
    twitter: article?.image || cmsImage ? {
      card: "summary_large_image",
      title: `${title} — Hemläkare.se`,
      description,
      images: [article?.image ?? cmsImage!.src],
    } : undefined,
  };
}

export default async function AktuelltSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const legacyArticle = articlesBySlug[slug];
  const cmsArticle = legacyArticle ? null : await getPublishedContentBySlugSafe(slug);
  const article = legacyArticle ?? cmsArticle;

  if (!article) notFound();

  const articleSchema = cmsArticle ? {
    "@context": "https://schema.org",
    "@type": cmsArticle.schemaType || "Article",
    headline: cmsArticle.h1 || cmsArticle.title,
    description: cmsArticle.metaDescription ?? cmsArticle.excerpt,
    datePublished: cmsArticle.publishedAt,
    dateModified: cmsArticle.updatedAt,
    mainEntityOfPage: `https://xn--hemlkare-3za.se/aktuellt/${cmsArticle.slug}`,
    author: cmsArticle.authorName ? { "@type": "Person", name: cmsArticle.authorName } : undefined,
    reviewedBy: cmsArticle.reviewerName ? { "@type": "Person", name: cmsArticle.reviewerName } : undefined,
  } : getLegacyArticleSchema(legacyArticle);

  return (
    <>
      {articleSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />}
      <Header />
      <main>
        {legacyArticle?.sections ? (
          <RichLegacyArticle article={legacyArticle} />
        ) : (
          <article className="max-w-3xl mx-auto px-6 py-20 flex flex-col gap-6">
            <BackLink />
            <ArticleMeta tag={article.tag} date={legacyArticle?.date ?? (cmsArticle?.publishedAt ? new Intl.DateTimeFormat("sv-SE", { dateStyle: "long" }).format(new Date(cmsArticle.publishedAt)) : "Publicerad")} />
            <h1 className="text-[2rem] font-bold text-gray-900 leading-snug">{legacyArticle?.title ?? cmsArticle?.h1 ?? article.title}</h1>
            <div className="space-y-4 text-[1rem] leading-relaxed text-gray-600">{article.body.split(/\n{2,}/).filter(Boolean).map((paragraph, index) => <p key={`${index}-${paragraph.slice(0, 12)}`}>{paragraph}</p>)}</div>
            {cmsArticle && cmsArticle.sources.length > 0 && <div className="mt-6 border-t border-gray-200 pt-5"><p className="text-xs font-bold uppercase tracking-wide text-gray-500">Källor</p>{cmsArticle.sources.map((source) => <a key={source.id} href={source.url} target="_blank" rel="noreferrer" className="mt-2 block text-sm text-[#E72E8A] hover:underline">{source.title}</a>)}</div>}
            {cmsArticle?.ctaHref && <Link href={cmsArticle.ctaHref} className="btn-cta inline-flex min-h-11 items-center rounded-xl px-5 text-sm font-extrabold">{cmsArticle.ctaLabel ?? "Boka tid"}</Link>}
          </article>
        )}
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}

function BackLink() {
  return (
    <Link href="/aktuellt" className="text-[0.88rem] font-semibold" style={{ color: "#E72E8A" }}>
      ← Tillbaka till Aktuellt
    </Link>
  );
}

function ArticleMeta({ tag, date }: { tag: string; date: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className="px-3 py-1 rounded-full text-[0.7rem] font-bold text-white"
        style={{ background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)" }}
      >
        {tag}
      </span>
      <span className="text-[0.82rem] text-gray-400">{date}</span>
    </div>
  );
}

function RichLegacyArticle({ article }: { article: Article }) {
  return (
    <article className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_280px] lg:py-20">
        <div className="min-w-0">
          <BackLink />
          <div className="mt-8">
            <ArticleMeta tag={article.tag} date={article.updatedAt ? `Uppdaterad ${article.updatedAt}` : article.date} />
          </div>

          <h1 className="mt-5 text-[2.15rem] font-extrabold leading-tight tracking-tight text-gray-950 sm:text-[3rem]">
            {article.h1 ?? article.title}
          </h1>
          <p className="mt-5 max-w-3xl text-[1.12rem] leading-8 text-gray-600">{article.excerpt}</p>

          {(article.authorName || article.reviewerName) && (
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-y border-gray-200 py-4 text-sm text-gray-500">
              {article.authorName && <span>Skriven av <span className="font-semibold text-gray-800">{article.authorName}</span></span>}
              {article.reviewerName && <span>Medicinskt granskad av <span className="font-semibold text-gray-800">{article.reviewerName}</span></span>}
              {article.reviewedAt && <span>Granskad {article.reviewedAt}</span>}
            </div>
          )}

          <div className="mt-8 overflow-hidden rounded-2xl border border-gray-100 bg-[#fdf5f9]">
            <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_300px]">
              <div className="p-6 sm:p-8">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#C81E70]">Kort svar</p>
                <p className="mt-3 text-[1.05rem] leading-8 text-gray-700">{article.summary}</p>
              </div>
              <div className="relative min-h-[320px] bg-gray-100">
                <Image
                  src={article.image}
                  alt={article.imageAlt ?? article.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {article.keyTakeaways && (
            <section className="mt-8 rounded-2xl border border-pink-100 bg-pink-50/60 p-6">
              <h2 className="text-[1.25rem] font-extrabold text-gray-950">Viktigast att komma ihåg</h2>
              <ul className="mt-4 space-y-3 text-[0.98rem] leading-7 text-gray-700">
                {article.keyTakeaways.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-[#E72E8A]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-10 space-y-5 text-[1.02rem] leading-8 text-gray-700">
            {article.body.split(/\n{2,}/).filter(Boolean).map((paragraph, index) => <p key={`${index}-${paragraph.slice(0, 12)}`}>{paragraph}</p>)}
          </div>

          <div className="mt-12 space-y-12">
            {article.sections?.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="text-[1.55rem] font-extrabold tracking-tight text-gray-950">{section.title}</h2>
                {section.body && <div className="mt-4 space-y-4 text-[1.02rem] leading-8 text-gray-700">{section.body.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}</div>}
                {section.bullets && (
                  <ul className="mt-5 space-y-3 rounded-2xl border border-gray-100 bg-gray-50 p-5 text-[0.98rem] leading-7 text-gray-700">
                    {section.bullets.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gray-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.table && (
                  <div className="mt-5 overflow-x-auto rounded-2xl border border-gray-200">
                    <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                      <thead className="bg-gray-50 text-gray-950">
                        <tr>
                          {section.table.headers.map((header) => <th key={header} className="border-b border-gray-200 px-4 py-3 font-extrabold">{header}</th>)}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-gray-700">
                        {section.table.rows.map((row) => (
                          <tr key={row.join("-")}>
                            {row.map((cell) => <td key={cell} className="px-4 py-4 align-top leading-6">{cell}</td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}
          </div>

          {article.cta && (
            <div className="mt-12 overflow-hidden rounded-2xl border border-pink-100 bg-[#fff7fb] shadow-[0_18px_50px_rgba(231,46,138,0.12)]">
              <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_290px]">
                <div className="p-6 sm:p-8">
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#C81E70]">Nästa steg</p>
                  <h2 className="mt-3 text-[1.6rem] font-extrabold leading-tight tracking-tight text-gray-950 sm:text-[1.9rem]">
                    {article.cta.title ?? "Orolig för en hudförändring?"}
                  </h2>
                  <p className="mt-4 max-w-2xl text-[1rem] leading-8 text-gray-700">
                    {article.cta.body ?? "Beskriv förändringen och bifoga tydliga bilder så kan vården hjälpa dig vidare till rätt bedömning."}
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Link href={article.cta.href} className="btn-cta inline-flex min-h-12 items-center justify-center rounded-full px-7 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(231,46,138,0.28)]">
                      {article.cta.label}
                    </Link>
                    {article.cta.note && <p className="text-sm font-semibold text-gray-500">{article.cta.note}</p>}
                  </div>
                </div>

                <div className="border-t border-pink-100 bg-white/70 p-6 sm:p-8 lg:border-l lg:border-t-0">
                  <p className="text-sm font-extrabold text-gray-950">Du får hjälp med</p>
                  <ul className="mt-4 space-y-3 text-sm font-semibold leading-6 text-gray-700">
                    {(article.cta.bullets ?? ["Snabb första bedömning", "Råd om nästa steg", "Trygg kontakt med vården"]).map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#E72E8A] text-[0.72rem] font-black text-white">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {article.faq && (
            <section id="fragor" className="mt-12 scroll-mt-28 border-t border-gray-200 pt-10">
              <h2 className="text-[1.55rem] font-extrabold tracking-tight text-gray-950">Vanliga frågor</h2>
              <div className="mt-5 divide-y divide-gray-200">
                {article.faq.map((item) => (
                  <details key={item.question} className="group py-5">
                    <summary className="cursor-pointer list-none text-[1rem] font-extrabold text-gray-950">
                      {item.question}
                    </summary>
                    <p className="mt-3 text-[0.98rem] leading-7 text-gray-700">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {article.sources && (
            <section className="mt-12 border-t border-gray-200 pt-6">
              <h2 className="text-xs font-bold uppercase tracking-wide text-gray-500">Källor</h2>
              <div className="mt-3 grid gap-2">
                {article.sources.map((source) => (
                  <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="text-sm font-semibold text-[#E72E8A] hover:underline">
                    {source.title} - {source.publisher}
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>

        {article.sections && (
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-gray-400">I artikeln</p>
              <nav className="mt-4 flex flex-col gap-3 text-sm font-semibold text-gray-600">
                {article.sections.map((section) => (
                  <a key={section.id} href={`#${section.id}`} className="hover:text-[#E72E8A]">
                    {section.title}
                  </a>
                ))}
                {article.faq && <a href="#fragor" className="hover:text-[#E72E8A]">Vanliga frågor</a>}
              </nav>
            </div>
          </aside>
        )}
      </div>
    </article>
  );
}

function getLegacyArticleSchema(article?: Article) {
  if (!article) return null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    headline: article.h1 ?? article.title,
    description: article.metaDescription ?? article.excerpt,
    datePublished: article.publishedAtIso ?? article.date,
    dateModified: article.updatedAtIso ?? article.publishedAtIso ?? article.date,
    mainEntityOfPage: `https://xn--hemlkare-3za.se/aktuellt/${article.slug}`,
    image: `https://xn--hemlkare-3za.se${article.image}`,
    author: article.authorName ? { "@type": "Organization", name: article.authorName } : undefined,
    reviewedBy: article.reviewerName ? { "@type": "Organization", name: article.reviewerName } : undefined,
    publisher: { "@type": "Organization", name: "Hemläkare.se" },
    about: article.targetQuery,
  };

  if (!article.faq) return articleSchema;

  return {
    "@context": "https://schema.org",
    "@graph": [
      articleSchema,
      {
        "@type": "FAQPage",
        mainEntity: article.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}
