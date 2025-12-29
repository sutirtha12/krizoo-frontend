import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../redux/productSlice";
import { addToCart } from "../redux/cartSlice";

import ProductFAQ from "../components/ProductFAQ";
import RelatedProducts from "../components/RelatedProducts";
import PerformanceBreakdown from "./PerformanceBreakdown";
import SizeStockHeatmap from "../components/SizeStockHeatmap";
import LiveViewers from "../components/LiverViewers";
import AIRecommendationStrip from "../components/AIRecommendationStrip";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { current, loading } = useSelector(state => state.products);

  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState("");

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id, dispatch]);

  if (loading) {
    return <div className="py-40 text-center">LOADING...</div>;
  }

  if (!current) {
    return <div className="py-40 text-center">PRODUCT NOT FOUND</div>;
  }

  const { product, images } = current;

  const addHandler = () => {
    dispatch(
      addToCart({
        productId: product._id,
        size
      })
    ).then(() => navigate("/cart"));
  };

  return (
    <>
      <section
        className="
          max-w-7xl mx-auto
          px-4 sm:px-6
          py-20 sm:py-32
          grid gap-12
          lg:grid-cols-2
        "
      >
        {/* IMAGES */}
        <div>
          <div
            className="
              rounded-2xl sm:rounded-3xl
              overflow-hidden
              bg-white/5
              aspect-[3/4]
            "
          >
            <img
              src={images?.[activeImg]?.url}
              alt={product.name}
              className="
                w-full h-full
                object-cover
                object-center
              "
            />
          </div>

          {images?.length > 1 && (
            <div
              className="
                flex gap-3 sm:gap-4
                mt-4 sm:mt-6
                overflow-x-auto
              "
            >
              {images.map((img, i) => (
                <img
                  key={img._id || i}
                  src={img.url}
                  alt=""
                  onClick={() => setActiveImg(i)}
                  className={`
                    w-20 h-24 sm:w-24 sm:h-28
                    rounded-lg sm:rounded-xl
                    object-cover cursor-pointer
                    flex-shrink-0
                    ${activeImg === i ? "ring-2 ring-white" : "opacity-50"}
                  `}
                />
              ))}
            </div>
          )}
        </div>

        {/* INFO */}
        <div>
          <h1
            className="
              font-brand font-black
              text-2xl sm:text-4xl
              tracking-widest
            "
          >
            {product.name}
          </h1>

          <div className="mt-4 sm:mt-6 text-xl sm:text-2xl font-semibold">
            ₹{product.discountedPrice || product.price}
          </div>

          <LiveViewers />

          {/* SIZE */}
          <div className="mt-8 sm:mt-10">
            <p className="tracking-widest mb-4 text-sm">
              SELECT SIZE
            </p>

            <SizeStockHeatmap
              sizes={product.sizes}
              selectedSize={size}
              onSelect={setSize}
            />
          </div>

          <AIRecommendationStrip />

          <button
            disabled={!size}
            onClick={addHandler}
            className="
              w-full mt-8 sm:mt-12
              py-4 sm:py-5
              rounded-full
              bg-white text-black
              font-bold tracking-widest
              disabled:opacity-40
              active:scale-95
              transition
            "
          >
            ADD TO CART
          </button>

          <PerformanceBreakdown product={product} />
          <ProductFAQ product={product} />
        </div>
      </section>

      <RelatedProducts currentId={id} />
    </>
  );
}