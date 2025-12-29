import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function LandingGate() {
  return (
    <section className="
      min-h-screen
      flex items-center justify-center
      bg-black
      px-6
    ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          max-w-xl w-full text-center
          bg-white/5 backdrop-blur-xl
          rounded-3xl p-12
          shadow-2xl
        "
      >
        <h1 className="font-brand text-4xl tracking-widest mb-4">
          KRIZOO
        </h1>

        <p className="text-sm opacity-60 tracking-widest mb-12">
          SELF IMPROVEMENT MEETS COMFORT
        </p>

        <div className="flex flex-col gap-5">
          <Link
            to="/login"
            className="
              py-4 rounded-full
              bg-white text-black
              font-bold tracking-widest
              hover:scale-[1.02] transition
            "
          >
            LOGIN
          </Link>

          <Link
            to="/signup"
            className="
              py-4 rounded-full
              border border-white/30
              tracking-widest
              hover:bg-white/10 transition
            "
          >
            CREATE ACCOUNT
          </Link>

          <Link
            to="/shop"
            className="text-xs tracking-widest opacity-60 hover:opacity-100"
          >
            CONTINUE WITHOUT LOGIN →
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default LandingGate;