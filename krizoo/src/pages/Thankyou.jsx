import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ThankYou() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 6000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <section className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="
          text-center
          bg-white/5 backdrop-blur-xl
          p-16 rounded-3xl
          border border-white/10
        "
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="
            w-20 h-20 mx-auto mb-8
            rounded-full
            bg-green-500/20
            flex items-center justify-center
            text-green-400 text-4xl
          "
        >
          ✓
        </motion.div>

        <h1 className="font-brand text-4xl tracking-widest mb-4">
          ORDER PLACED
        </h1>

        <p className="opacity-70 tracking-wide mb-10">
          Your order is confirmed and being processed
        </p>

        <button
          onClick={() => navigate("/")}
          className="
            px-10 py-4 rounded-full
            bg-white text-black
            font-bold tracking-widest
          "
        >
          BACK TO HOME
        </button>
      </motion.div>
    </section>
  );
}