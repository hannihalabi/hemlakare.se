import Link from "next/link";

export default function Lunchforelasning() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
        {/* Heading */}
        <div className="text-center flex flex-col gap-2 max-w-3xl">
          <h2 className="text-[2rem] sm:text-[2.4rem] font-bold tracking-tight text-gray-900">
            Digitala lunchföreläsningar om ungas psykiska hälsa
          </h2>
          <p className="text-[1rem] font-semibold" style={{ color: "#E72E8A" }}>
            Deltagandet är helt kostnadsfritt
          </p>
        </div>

        {/* Body */}
        <div className="w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Image — ersätt div med <Image> när barn-bild.jpg laddas upp till /public/bilder/ */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-pink-50 to-pink-100 shadow-sm flex items-center justify-center">
            <span className="text-pink-300 text-sm font-medium">Bild kommer snart</span>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-6">
            <p className="text-[1rem] text-gray-700 leading-relaxed">
              Du som är förälder till barn mellan 6–17 år, kan delta i våra kostnadsfria digitala
              lunchföreläsningar, där du får praktiska tips till hur du kan stärka relationen till
              ditt barn, samt att främja den mentala hälsan.
            </p>

            <p className="text-[1rem] text-gray-700 leading-relaxed">
              Föreläsningarna arrangeras av{" "}
              <a
                href="#"
                className="font-semibold"
                style={{ color: "#E72E8A" }}
              >
                mottagningen för Ungas Psykiska Hälsa
              </a>{" "}
              och hålls digitalt varje vecka under lunchtid, kl. 12–13.
            </p>

            <Link
              href="/lunchforelasning"
              className="btn-cta inline-flex items-center justify-center w-fit px-10 py-4 rounded-full text-[1rem] font-bold text-white transition-all"
            >
              Läs mer och säkra din plats
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
