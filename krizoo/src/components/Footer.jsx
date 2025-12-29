import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Footer() {
  const footerRef = useRef(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | success

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-animate", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const submitHandler = e => {
    e.preventDefault();
    if (!email) return;

    setStatus("success");
    setEmail("");
  };

  return (
    <footer
      ref={footerRef}
      className="mt-24 sm:mt-32 border-t border-white/10 bg-black"
    >
      <div
        className="
          max-w-7xl mx-auto
          px-6 sm:px-8
          py-16 sm:py-24
          grid grid-cols-1
          sm:grid-cols-2
          md:grid-cols-4
          gap-12 sm:gap-16
        "
      >
        {/* BRAND */}
        <div className="footer-animate text-center sm:text-left">
          <h2 className="font-brand text-xl sm:text-2xl tracking-widest mb-4">
            KRIZOO
          </h2>
          <p className="text-sm opacity-60 leading-relaxed max-w-sm mx-auto sm:mx-0">
            Self Improvement Meets Comfort.  
            Built for those who don’t blend in.
          </p>
        </div>

        {/* SHOP */}
        <div className="footer-animate text-center sm:text-left">
          <p className="text-xs tracking-widest opacity-60 mb-4">
            SHOP
          </p>
          <FooterLink to="/male">Men</FooterLink>
          <FooterLink to="/female">Women</FooterLink>
          <FooterLink to="/shop">Shop All</FooterLink>
        </div>

        {/* COMPANY */}
        <div className="footer-animate text-center sm:text-left">
          <p className="text-xs tracking-widest opacity-60 mb-4">
            COMPANY
          </p>
          <FooterLink to="/about">About</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
          <FooterLink to="/privacy">Privacy</FooterLink>
        </div>

        {/* NEWSLETTER */}
        <div className="footer-animate text-center sm:text-left">
          <p className="text-xs tracking-widest opacity-60 mb-4">
            NEWSLETTER
          </p>

          {status === "success" ? (
            <p className="text-sm tracking-widest text-white">
              YOU’RE IN.
            </p>
          ) : (
            <form
              onSubmit={submitHandler}
              className="space-y-4 max-w-sm mx-auto sm:mx-0"
            >
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                placeholder="ENTER YOUR EMAIL"
                className="
                  w-full bg-transparent
                  border border-white/20
                  px-4 py-3 rounded-xl
                  text-sm tracking-widest
                  focus:outline-none focus:border-white
                "
              />
              <button
                type="submit"
                className="
                  w-full py-3 rounded-xl
                  bg-white text-black
                  text-xs tracking-widest font-bold
                  hover:opacity-90
                  active:scale-[0.98]
                  transition
                "
              >
                SUBSCRIBE
              </button>
            </form>
          )}
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div
        className="
          border-t border-white/10
          py-6 px-4
          text-center
          text-[10px] sm:text-xs
          tracking-widest
          opacity-50
        "
      >
        © {new Date().getFullYear()} KRIZOO. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}

/* ---------- SMALL COMPONENT ---------- */

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="
        block mb-3
        text-sm
        opacity-70
        hover:opacity-100
        transition
      "
    >
      {children}
    </Link>
  );
}

export default Footer;