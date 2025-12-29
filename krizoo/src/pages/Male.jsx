import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { useNavigate } from "react-router-dom";

function Male() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items = [], loading } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const maleProducts = items.filter(
    p => p?.product?.gender === "men" || p?.product?.gender === "unisex"
  );

  if (loading) {
    return (
      <div className="py-32 sm:py-40 text-center tracking-widest">
        LOADING MEN COLLECTION...
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
      <h1
        className="
          font-brand
          text-3xl sm:text-4xl
          tracking-widest
          mb-12 sm:mb-16
          text-center
        "
      >
        MEN
      </h1>

      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-4 sm:gap-6 lg:gap-8
        "
      >
        {maleProducts.map(item => {
          const product = item.product;
          const image = item.images?.[0]?.url;

          return (
            <div
              key={item._id}
              onClick={() => navigate(`/product/${product._id}`)}
              className="
                cursor-pointer group
                bg-white/5 backdrop-blur-xl
                rounded-2xl overflow-hidden
                transition
                hover:scale-[1.03]
                active:scale-[0.98]
              "
            >
              {/* IMAGE */}
              <div
                className="
                  h-[220px]
                  sm:h-[300px]
                  md:h-[340px]
                  lg:h-[380px]
                  overflow-hidden
                "
              >
                <img
                  src={image}
                  alt={product.name}
                  className="
                    w-full h-full
                    object-cover object-top
                    transition duration-500
                    group-hover:scale-110
                  "
                />
              </div>

              {/* INFO */}
              <div className="p-3 sm:p-4">
                <h3
                  className="
                    text-xs sm:text-sm
                    tracking-widest
                    font-semibold
                    line-clamp-1
                  "
                >
                  {product.name}
                </h3>

                <p
                  className="
                    text-[10px] sm:text-xs
                    opacity-60
                    mt-1
                    uppercase
                    line-clamp-1
                  "
                >
                  {product.category.replace("-", " ")}
                </p>

                <div className="mt-3 flex justify-between items-center">
                  <span className="text-sm sm:text-base font-semibold">
                    ₹{product.discountedPrice || product.price}
                  </span>

                  {product.discountedPrice && (
                    <span className="text-[10px] sm:text-xs line-through opacity-40">
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
}

export default Male;