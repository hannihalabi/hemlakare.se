import Image from "next/image";
import Link from "next/link";

const steps = [
  {
    num: 1,
    emoji: "📱",
    title: "Skicka bilder digitalt",
    desc: "Skriv textmeddelanden, skicka bilder eller ha videosamtal om dina prickar via vår app.",
  },
  {
    num: 2,
    emoji: "⚡",
    title: "Få snabb bedömning",
    desc: (
      <>
        En läkare med kompetens inom hudåkommor tittar på bilderna och vid svårare fall kopplas en
        hudläkare eller{" "}
        <a
          href="#"
          className="font-semibold"
          style={{ color: "#E72E8A" }}
        >
          hudspecialist
        </a>{" "}
        in för ytterligare bedömning.
      </>
    ),
  },
  {
    num: 3,
    emoji: "🚗",
    title: "Fysisk undersökning",
    desc: "Om vi behöver titta närmare på dina prickar träffas vi där du är.",
  },
];

export default function Prickmottagning() {
  return (
    <section className="bg-[#f4f4f8] py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
        {/* Heading */}
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-[2rem] sm:text-[2.4rem] font-bold tracking-tight text-gray-900">
            Prickmottagning – kolla dina prickar
          </h2>
          <p className="text-[1rem] text-gray-500">Orolig över hudförändringar?</p>
        </div>

        {/* Body */}
        <div className="w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Illustration */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-[340px] h-[340px] sm:w-[400px] sm:h-[400px]">
              <Image
                src="/bilder/hud-bild.png"
                alt="Illustration av prickmottagning"
                fill
                className="object-contain drop-shadow-md"
                priority
              />
            </div>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-8">
            <p className="text-[1rem] font-semibold text-gray-900">
              Så fungerar prickmottagningen:
            </p>

            <ol className="flex flex-col gap-6">
              {steps.map((step) => (
                <li key={step.num} className="flex gap-4">
                  <span className="text-[1.1rem] font-bold text-gray-900 w-5 shrink-0 pt-0.5">
                    {step.num}.
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-[1rem] font-bold text-gray-900">
                      {step.title} {step.emoji}
                    </span>
                    <p className="text-[0.95rem] text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Links */}
            <div className="flex flex-col gap-5 mt-2">
              <Link
                href="/prickmottagning"
                className="text-[0.95rem] font-semibold"
                style={{ color: "#E72E8A" }}
              >
                Läs mer om prickmottagningen
              </Link>

              <Link
                href="/appen"
                className="inline-flex items-center justify-center w-fit px-10 py-4 rounded-full text-[1rem] font-bold text-white transition-all active:scale-[0.97] hover:opacity-90"
                style={{
                  background: "linear-gradient(180deg, #E72E8A 0%, #D81B7D 100%)",
                  boxShadow: "0 4px 20px rgba(231,46,138,0.35)",
                }}
              >
                Ladda ner appen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
