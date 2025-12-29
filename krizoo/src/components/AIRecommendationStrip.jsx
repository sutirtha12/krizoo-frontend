import { useEffect, useState } from "react";
import { FiCpu, FiArrowRight } from "react-icons/fi";

const REASONS = [
  "based on your browsing",
  "popular in your area",
  "frequently bought together",
  "trending this week",
  "high conversion product",
  "recommended for your size"
];

function AIRecommendationStrip({
  productName = "Compression T-Shirt",
  onClick
}) {
  const [reason, setReason] = useState("");

  useEffect(() => {
    setReason(pickReason());
  }, []);

  return (
    <div
      className="
        w-full max-w-7xl mx-auto
        mt-10 px-6
      "
    >
      <div
        className="
          group
          flex items-center justify-between
          bg-white/5 backdrop-blur-xl
          border border-white/10
          rounded-2xl px-6 py-4
          hover:bg-white/10 transition
          cursor-pointer
        "
        onClick={onClick}
      >
        <div className="flex items-center gap-4">
          <div
            className="
              w-10 h-10 rounded-full
              bg-white/10
              flex items-center justify-center
              group-hover:rotate-12 transition
            "
          >
            <FiCpu size={18} />
          </div>

          <div className="text-sm tracking-widest">
            <p className="opacity-60 text-xs mb-1">
              AI RECOMMENDATION
            </p>

            <p>
              <span className="opacity-80">
                We suggest
              </span>{" "}
              <b>{productName}</b>{" "}
              <span className="opacity-70">
                ({reason})
              </span>
            </p>
          </div>
        </div>

        <FiArrowRight
          className="
            opacity-60
            group-hover:translate-x-1
            transition
          "
        />
      </div>
    </div>
  );
}

/* ---------- HELPERS ---------- */
function pickReason() {
  return REASONS[
    Math.floor(Math.random() * REASONS.length)
  ];
}

export default AIRecommendationStrip;