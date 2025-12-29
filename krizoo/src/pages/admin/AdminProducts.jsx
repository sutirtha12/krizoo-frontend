import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAdminProducts,
  deleteAdminProduct
} from "../../redux/adminSlice";

export default function AdminProducts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products = [], loading } = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const handleDelete = (productId) => {
    if (window.confirm("Delete this product permanently?")) {
      dispatch(deleteAdminProduct(productId));
    }
  };

  if (loading) {
    return (
      <div className="py-40 text-center tracking-widest">
        LOADING PRODUCTS...
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="py-40 text-center opacity-50">
        No products found
      </div>
    );
  }

  return (
    <>
      <h1 className="text-4xl font-brand tracking-widest mb-10">
        PRODUCTS
      </h1>

      <div className="grid grid-cols-1 gap-6">
        {products.map(product => {
          const imageUrl =
            product.images && product.images.length > 0
              ? product.images[0].url
              : null;

          return (
            <div
              key={product._id}
              className="flex items-center gap-6 bg-white/5 p-6 rounded-2xl"
            >
              {/* IMAGE */}
              <div className="w-32 h-40 rounded-xl overflow-hidden bg-black/30">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs opacity-50">
                    NO IMAGE
                  </div>
                )}
              </div>

              {/* DETAILS */}
              <div className="flex-1">
                <h2 className="text-lg tracking-widest">
                  {product.name}
                </h2>

                <p className="text-sm opacity-60 mt-1">
                  ₹{product.price}
                </p>

                <p className="text-xs opacity-40 mt-1">
                  {product.category} • {product.gender}
                </p>

                <div className="flex gap-6 mt-6 text-sm tracking-widest">
                  <button
                    className="underline"
                    onClick={() =>
                      navigate(`/admin/products/edit/${product._id}`)
                    }
                  >
                    EDIT
                  </button>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-400"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}