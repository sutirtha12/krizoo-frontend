import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function RelatedProducts({ currentId }) {
  const navigate = useNavigate();
  const { items } = useSelector(state => state.products);

  // 🔒 CRITICAL SAFETY FILTER
  const related = items.filter(
    item =>
      item.product && item.product._id !== currentId
  ).slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 pb-32">
      <h2 className="text-3xl font-brand tracking-widest mb-10">
        RELATED PRODUCTS
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {related.map(item => {
          const product = item.product;
          const image =
            item.images?.[0]?.url || "/placeholder.jpg";

          return (
            <div
              key={item._id}
              onClick={() =>
                navigate(`/product/${product._id}`)
              }
              className="
                cursor-pointer
                bg-white/5 rounded-2xl overflow-hidden
                hover:scale-[1.03] transition
              "
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={image}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                <p className="tracking-widest text-sm">
                  {product.name}
                </p>
                <p className="mt-1 font-semibold">
                  ₹{product.discountedPrice || product.price}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}