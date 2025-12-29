import { useEffect, useState } from "react";
import { FiShoppingBag } from "react-icons/fi";

const PRODUCTS = [
  "Compression T-Shirt",
  "Oversized Hoodie",
  "Gym Joggers",
  "Sports Bra",
  "Leggings",
  "Training Tee",
  "Zipper Jacket"
];

const CITIES = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Noida",
  "Gurgaon"
];

function RecentlyPurchasedTicker({
  interval = 5000
}) {
  const [purchase, setPurchase] = useState(generatePurchase());

  useEffect(() => {
    const timer = setInterval(() => {
      setPurchase(generatePurchase());
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return (
    <div
      className="
        fixed bottom-6 left-6 z-40
        bg-black/70 backdrop-blur-xl
        border border-white/10
        rounded-xl px-5 py-4
        flex items-center gap-3
        text-xs tracking-widest
        animate-slideIn
      "
    >
      <FiShoppingBag size={14} className="opacity-70" />

      <span className="opacity-90">
        Someone from <b>{purchase.city}</b> bought{" "}
        <b>{purchase.product}</b>
      </span>
    </div>
  );
}

/* ---------- HELPERS ---------- */
function generatePurchase() {
  return {
    product:
      PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)],
    city:
      CITIES[Math.floor(Math.random() * CITIES.length)]
  };
}

export default RecentlyPurchasedTicker;