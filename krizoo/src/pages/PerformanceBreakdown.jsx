import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PerformanceBreakdown({ product }) {
  const barsRef = useRef([]);

  // Default performance values (fallback)
  const performance = {
    stretch: product?.performance?.stretch ?? 92,
    breathability: product?.performance?.breathability ?? 85,
    sweatWicking: product?.performance?.sweatWicking ?? 90,
    durability: product?.performance?.durability ?? 88
  };

  useEffect(() => {
    gsap.fromTo(
      barsRef.current,
      { width: "0%" },
      {
        width: i => `${Object.values(performance)[i]}%`,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15
      }
    );
  }, []);

  return (
    <section className="mt-20 bg-white/5 backdrop-blur-xl rounded-3xl p-8">
      {/* TITLE */}
      <h3 className="font-brand text-2xl tracking-widest mb-10">
        PERFORMANCE BREAKDOWN
      </h3>

      <div className="space-y-8">
        <Metric
          label="STRETCH"
          value={performance.stretch}
          refEl={el => (barsRef.current[0] = el)}
        />

        <Metric
          label="BREATHABILITY"
          value={performance.breathability}
          refEl={el => (barsRef.current[1] = el)}
        />

        <Metric
          label="SWEAT WICKING"
          value={performance.sweatWicking}
          refEl={el => (barsRef.current[2] = el)}
        />

        <Metric
          label="DURABILITY"
          value={performance.durability}
          refEl={el => (barsRef.current[3] = el)}
        />
      </div>

      {/* FOOT NOTE */}
      <p className="mt-10 text-xs opacity-60 tracking-widest">
        TESTED UNDER INTENSE TRAINING CONDITIONS
      </p>
    </section>
  );
}

/* ---------------- METRIC BAR ---------------- */
function Metric({ label, value, refEl }) {
  return (
    <div>
      <div className="flex justify-between text-xs tracking-widest mb-2">
        <span>{label}</span>
        <span>{value}%</span>
      </div>

      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
        <div
          ref={refEl}
          className="h-full bg-white rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}