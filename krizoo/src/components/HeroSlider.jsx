import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

import kz1 from "../media/kz1.png";
import kz2 from "../media/kz2.png";
import kz3 from "../media/kz3.png";

const slides = [kz1, kz2, kz3];

export default function HeroSlider() {
  const slideRefs = useRef([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    slideRefs.current.forEach((el, i) => {
      gsap.set(el, {
        opacity: i === 0 ? 1 : 0,
        scale: 1.1
      });
    });

    const interval = setInterval(() => {
      const current = active;
      const next = (active + 1) % slides.length;

      gsap.to(slideRefs.current[current], {
        opacity: 0,
        scale: 1,
        duration: 1.8,
        ease: "power3.inOut"
      });

      gsap.fromTo(
        slideRefs.current[next],
        { opacity: 0, scale: 1.15 },
        {
          opacity: 1,
          scale: 1,
          duration: 2.4,
          ease: "power3.out"
        }
      );

      setActive(next);
    }, 4500);

    return () => clearInterval(interval);
  }, [active]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {slides.map((img, i) => (
        <div
          key={i}
          ref={(el) => (slideRefs.current[i] = el)}
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4 z-10">
        <h1 className="font-brand font-black
  text-6xl md:text-8xl lg:text-9xl
  tracking-ultra
  text-shadow-black">
          KRIZOO
        </h1>
        <p className="font-body
  mt-4
  text-[10px] md:text-xs
  tracking-widest
  opacity-80">
          SELF IMPROVEMENT MEETS COMFORT
        </p>
        <Link
    to="/shop"
    className="
      mt-8
      px-10 py-4
      font-brand font-semibold
      text-xs tracking-widest
      rounded-full
      bg-white/90 text-black
      backdrop-blur-md
      hover:bg-white
      hover:scale-105
      transition-all duration-300
      shadow-lg
    "
  >
    SHOP ALL
  </Link>
      </div>
    </section>
  );
}