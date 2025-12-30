import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { useNavigate } from "react-router-dom";

const HomeProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ SAFE SELECTOR
  const { items = [], loading = false } = useSelector(
    state => state.products || {}
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // ✅ LOADING STATE
  if (loading) {
    return (
      <div className="text-center py-20 tracking-widest">
        LOADING PRODUCTS...
      </div>
    );
  }

  // ✅ SAFE DATA NORMALIZATION
  const safeItems = Array.isArray(items)
    ? items
        .filter(item => item?.product) // product must exist
        .slice(0, 6) // show only first 6
    : [];

  // ✅ EMPTY STATE
  if (safeItems.length === 0) {
    return (
      <div className="text-center py-20 tracking-widest opacity-60">
        NO PRODUCTS AVAILABLE
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
      <h2
        className="
          text-center mb-10 sm:mb-14
          font-brand font-black
          text-2xl sm:text-3xl lg:text-4xl
          tracking-widest
        "
      >
        FEATURED PRODUCTS
      </h2>

      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-4 sm:gap-6
        "
      >
        {safeItems.map(item => {
          const product = item.product;
          if (!product) return null;

          const image =
            item.images?.[0]?.url ||
            product.thumbnail ||
            "/placeholder.jpg";

          return (
            <div
              key={item._id}
              onClick={() => navigate(`/product/${product._id}`)}
              className="
                cursor-pointer group
                bg-white/5 backdrop-blur-xl
                rounded-2xl overflow-hidden
                transition
                active:scale-[0.97]
                sm:hover:scale-[1.03]
                shadow-lg sm:shadow-xl
              "
            >
              {/* IMAGE */}
              <div
                className="
                  relative
                  h-[220px]
                  sm:h-[280px]
                  md:h-[320px]
                  lg:h-[360px]
                  overflow-hidden
                "
              >
                <img
                  src={image}
                  alt={product.name || "Product"}
                  className="
                    w-full h-full
                    object-cover object-top
                    transition-transform duration-500
                    sm:group-hover:scale-110
                  "
                />
              </div>

              {/* CONTENT */}
              <div className="p-3 sm:p-4">
                <h3
                  className="
                    text-xs sm:text-sm
                    tracking-widest
                    font-semibold
                    line-clamp-2
                  "
                >
                  {product.name || "Unnamed Product"}
                </h3>

                <p
                  className="
                    text-[10px] sm:text-xs
                    opacity-60
                    mt-1
                    uppercase
                  "
                >
                  {product.category?.replace("-", " ") || ""}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm sm:text-base font-semibold">
                    ₹{product.discountedPrice ?? product.price ?? "—"}
                  </span>

                  {product.discountedPrice && product.price && (
                    <span className="text-[10px] sm:text-xs line-through opacity-50">
                      ₹{product.price}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HomeProducts;