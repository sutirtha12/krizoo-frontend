import { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";

function LiveViewers({
  min = 3,
  max = 18,
  interval = 4000
}) {
  const [viewers, setViewers] = useState(
    Math.floor(Math.random() * (max - min + 1)) + min
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setViewers(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const next = prev + change;

        if (next < min) return min;
        if (next > max) return max;
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [min, max, interval]);

  return (
    <div
      className="
        flex items-center gap-3
        bg-white/5 backdrop-blur-xl
        px-5 py-3 rounded-full
        text-xs tracking-widest
        animate-pulse
      "
    >
      <FiEye size={14} className="opacity-70" />
      <span>{viewers} people viewing this product</span>
    </div>
  );
}

export default LiveViewers;