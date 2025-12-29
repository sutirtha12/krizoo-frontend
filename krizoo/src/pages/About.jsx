import React from 'react'
import kz4 from "../media/kz4.png"
import kz5 from "../media/kz5.png"
import kz6 from "../media/kz6.png"
const About=()=> {
  return (
    <section className="max-w-7xl mx-auto px-6 py-32">
      {/* TITLE */}
      <div className="mb-20 text-center">
        <h1 className="text-4xl md:text-5xl font-brand tracking-widest">
          ABOUT KRIZOO
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-sm md:text-base opacity-70 tracking-wide">
          KRIZOO is not fashion. It is engineered discipline — built for bodies
          that train hard, think sharp, and live with intent.
        </p>
      </div>

      {/* SECTION 1 — BRAND & PACKAGING */}
      <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
        {/* IMAGE */}
        <div className="rounded-3xl overflow-hidden bg-white/5 p-6">
          <img
            src={kz4}
            alt="KRIZOO Premium Packaging"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* TEXT */}
        <div>
          <h2 className="text-2xl font-bold tracking-widest mb-6">
            BUILT WITH INTENT
          </h2>
          <p className="opacity-75 leading-relaxed">
            Every detail — from packaging to fabric — is intentional.
            KRIZOO products are designed to feel premium, perform under pressure,
            and represent discipline beyond the gym.
          </p>
          <p className="mt-4 opacity-75 leading-relaxed">
            This is not mass-produced apparel. This is precision-built gear
            for those who demand more from themselves.
          </p>
        </div>
      </div>

      {/* SECTION 2 — PRODUCT IDENTITY */}
      <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
        {/* TEXT */}
        <div>
          <h2 className="text-2xl font-bold tracking-widest mb-6">
            PERFORMANCE OVER EVERYTHING
          </h2>
          <p className="opacity-75 leading-relaxed">
            KRIZOO apparel is crafted for real performance — compression,
            breathability, durability, and aesthetics aligned into one system.
          </p>
          <p className="mt-4 opacity-75 leading-relaxed">
            If it doesn’t enhance movement, posture, or confidence —
            it doesn’t make it into production.
          </p>
        </div>

        {/* IMAGE */}
        <div className="rounded-3xl overflow-hidden bg-white/5 p-6">
          <img
            src={kz5}
            alt="KRIZOO Product Detailing"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* SECTION 3 — FOUNDER / MINDSET */}
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* IMAGE — FACE SAFE */}
        <div className="rounded-3xl overflow-hidden bg-black">
          <img
            src={kz6}
            alt="KRIZOO Founder"
            className="w-full h-[520px] object-contain"
          />
        </div>

        {/* TEXT */}
        <div>
          <h2 className="text-2xl font-bold tracking-widest mb-6">
            THE MIND BEHIND KRIZOO
          </h2>
          <p className="opacity-75 leading-relaxed">
            KRIZOO was born from obsession — obsession with strength,
            discipline, and personal evolution.
          </p>
          <p className="mt-4 opacity-75 leading-relaxed">
            This brand represents the silent grind, the unseen work,
            and the mindset of those who don’t seek validation —
            only results.
          </p>

          <p className="mt-6 font-semibold tracking-widest">
            BUILT FOR ELITE PERFORMANCE.
          </p>
        </div>
      </div>
    </section>
  );
}
export default About;
