import { motion } from "framer-motion";

export default function AuthLoader() {
  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">
      
      {/* 3D CORE */}
      <motion.div
        className="relative w-24 h-24"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: 360, rotateX: 360 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* RING 1 */}
        <motion.div
          className="absolute inset-0 rounded-full border border-white/40"
          animate={{ rotateZ: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ transform: "translateZ(30px)" }}
        />

        {/* RING 2 */}
        <motion.div
          className="absolute inset-2 rounded-full border border-white/20"
          animate={{ rotateZ: -360 }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ transform: "translateZ(-20px)" }}
        />

        {/* CORE */}
        <motion.div
          className="
            absolute inset-6 rounded-full
            bg-white
            shadow-[0_0_40px_rgba(255,255,255,0.8)]
          "
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* TEXT */}
      <motion.div
  className="
    absolute bottom-[18%]
    left-1/2 -translate-x-1/2
    text-center
    text-xs tracking-[0.4em]
    text-white/60
    font-semibold
    leading-relaxed
    whitespace-pre-line
  "
  animate={{ opacity: [0.3, 1, 0.3] }}
  transition={{ duration: 1.8, repeat: Infinity }}
>
  AUTHENTICATING
  {"\n"}
  WELCOME TO THE WORLD OF POWER
</motion.div>
    </div>
  );
}