export default function ImagePlaceholder({
  label,
  aspect = "aspect-[16/9]",
}: {
  label: string;
  aspect?: string;
}) {
  return (
    <div
      className={`w-full ${aspect} rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center gap-2 shadow-md`}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#d1d5db"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <span className="text-[0.78rem] text-gray-400">{label}</span>
    </div>
  );
}
