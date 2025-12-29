import { useEffect, useState } from "react";
import Loader from "../components/AuthLoader";
import HeroSlider from "../components/HeroSlider";
import HomeProducts from "../components/HomeProducts";
import GlobalReach from "../components/DispatchGlobe";
import StickyReviews from "../components/StickyReviews";
import RecentlyPurchasedTicker from "../components/RecentlyPurchasedTicker";
import AIRecommendationStrip from "../components/AIRecommendationStrip";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  loading && <Loader /> 

  return (
    <>
    <HeroSlider/>
    <RecentlyPurchasedTicker/>
    <AIRecommendationStrip
  productName="Oversized Hoodie"
  onClick={() => navigate("/shop")}
/>
    <HomeProducts/>
    <StickyReviews/>
    <GlobalReach/>
    
    </>
  )
}