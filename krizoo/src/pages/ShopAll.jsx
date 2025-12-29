import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { useNavigate } from "react-router-dom";

function ShopAll() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items = [], loading } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="py-40 text-center tracking-widest">
        LOADING PRODUCTS...
      </div>
    );
  }

  const safeItems = items.filter(i => i.product);

  return (
    <section className="max-w-7xl mx-auto px-6 py-32">
      <h1 className="text-4xl font-brand tracking-widest mb-16 text-center">
        SHOP ALL
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {safeItems.map(item => {
          const product = item.product;
          const image =
            item.images?.[0]?.url || "/placeholder.jpg";

          return (
            <div
              key={product._id}
              onClick={() => navigate(`/product/${product._id}`)}
              className="
                cursor-pointer
                bg-white/5 rounded-2xl overflow-hidden
                hover:scale-[1.03] transition
              "
            >
              <div className="h-[360px] overflow-hidden">
                <img
                  src={image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-4">
                <p className="tracking-widest text-sm font-semibold">
                  {product.name}
                </p>

                <p className="text-xs opacity-60 mt-1 uppercase">
                  {product.category?.replace("-", " ")}
                </p>

                <div className="mt-3 flex items-center gap-3">
                  <span className="font-semibold">
                    ₹{product.discountedPrice || product.price}
                  </span>

                  {product.discountedPrice && (
                    <span className="text-xs line-through opacity-50">
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

export default ShopAll;