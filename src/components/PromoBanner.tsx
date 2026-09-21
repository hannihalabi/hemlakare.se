export default function PromoBanner() {
  return (
    <div
      className="w-full text-white"
      style={{ background: "linear-gradient(90deg, #a71668 0%, #d81b7d 50%, #a71668 100%)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 px-4 py-2 text-center text-[0.8rem] font-semibold sm:text-[0.85rem]">
        <span>
          🔥 Få <span className="font-black">20% rabatt</span> med kod{" "}
          <span className="rounded-md bg-white/20 px-1.5 py-0.5 font-black tracking-wide">
            HALSA26
          </span>
        </span>
      </div>
    </div>
  );
}
