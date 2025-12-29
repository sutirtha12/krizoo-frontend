export default function SizeStockHeatmap({ sizes = [], onSelect, selectedSize }) {
  return (
    <section
      className="
        mt-10 sm:mt-16
        bg-white/5 backdrop-blur-xl
        rounded-2xl sm:rounded-3xl
        p-4 sm:p-8
      "
    >
      <h3
        className="
          font-brand
          text-lg sm:text-2xl
          tracking-widest
          mb-6 sm:mb-8
        "
      >
        SIZE AVAILABILITY
      </h3>

      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
        {sizes.map(s => {
          const level =
            s.stock === 0
              ? "OUT"
              : s.stock <= 5
              ? "LOW"
              : "HIGH";

          return (
            <button
              key={s.size}
              disabled={s.stock === 0}
              onClick={() => onSelect?.(s.size)}
              className={`
                relative
                p-3 sm:p-4
                rounded-lg sm:rounded-xl
                text-xs sm:text-sm
                tracking-widest
                transition-all duration-300
                ${
                  s.stock === 0
                    ? "bg-white/5 opacity-40 cursor-not-allowed"
                    : level === "LOW"
                    ? "bg-yellow-500/20 active:bg-yellow-500/30 sm:hover:bg-yellow-500/30"
                    : "bg-green-500/20 active:bg-green-500/30 sm:hover:bg-green-500/30"
                }
                ${
                  selectedSize === s.size
                    ? "ring-2 ring-white"
                    : ""
                }
              `}
            >
              {/* SIZE */}
              <span className="block font-semibold">
                {s.size}
              </span>

              {/* STOCK */}
              <span className="block mt-1 text-[9px] sm:text-[10px] opacity-70">
                {s.stock === 0
                  ? "OUT OF STOCK"
                  : s.stock <= 5
                  ? "LOW STOCK"
                  : "IN STOCK"}
              </span>

              {/* HEAT DOT */}
              {s.stock > 0 && (
                <span
                  className={`
                    absolute top-2 right-2
                    w-2 h-2 rounded-full
                    ${level === "LOW" ? "bg-yellow-400" : "bg-green-400"}
                  `}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* LEGEND */}
      <div
        className="
          flex flex-wrap
          gap-4 sm:gap-6
          mt-6 sm:mt-8
          text-[10px] sm:text-xs
          tracking-widest
          opacity-70
        "
      >
        <Legend color="bg-green-400" label="IN STOCK" />
        <Legend color="bg-yellow-400" label="LOW STOCK" />
        <Legend color="bg-white/30" label="OUT" />
      </div>
    </section>
  );
}

/* ---------- LEGEND ---------- */
function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
      <span>{label}</span>
    </div>
  );
}