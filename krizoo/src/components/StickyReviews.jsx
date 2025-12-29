import { reviews } from "../data/reviews";

const Stars = ({ rating }) => {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-sm ${
            i < rating ? "text-yellow-400" : "text-white/20"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default function StickyReviews() {
  return (
    <section className="relative bg-black py-40">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">

        {/* LEFT — STICKY INTRO */}
        <div className="sticky top-32 h-fit">
          <h2 className="font-brand font-black text-4xl tracking-widest mb-6">
            REVIEWS FROM THE COMMUNITY
          </h2>
          <p className="text-white/60 tracking-wide max-w-sm">
            Real athletes. Real performance.  
            Tested across workouts, climates, and lifestyles.
          </p>
        </div>

        {/* RIGHT — REVIEW CARDS */}
        <div className="space-y-10">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="
                bg-white/5 backdrop-blur-xl
                rounded-2xl p-8
                shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                transition-all
                hover:scale-[1.02]
              "
            >
              {/* ⭐ RATING */}
              <Stars rating={r.rating} />

              {/* TEXT */}
              <p className="text-sm leading-relaxed text-white/80 mb-6">
                “{r.text}”
              </p>

              {/* USER */}
              <div className="flex items-center justify-between text-xs tracking-widest text-white/60">
                <span className="font-semibold">{r.name}</span>
                <span>{r.location}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}