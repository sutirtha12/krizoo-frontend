import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, updateCart, deleteCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const items = Array.isArray(cart?.items) ? cart.items : [];

  if (items.length === 0) {
    return <div className="py-40 text-center">YOUR CART IS EMPTY</div>;
  }

  // ✅ TOTAL AMOUNT CALCULATION
  const totalAmount = items.reduce((total, item) => {
    const price =
      item.productId.discountedPrice || item.productId.price;
    return total + price * item.quantity;
  }, 0);

  return (
    <section className="max-w-6xl mx-auto px-6 py-32">
      <h1 className="font-brand text-4xl tracking-widest mb-12">
        YOUR CART
      </h1>

      {items.map(item => (
        <div
          key={item._id}
          className="flex justify-between items-center bg-white/5 p-6 rounded-2xl mb-6"
        >
          <div>
            <h3 className="tracking-widest">
              {item.productId.name}
            </h3>
            <p className="text-xs opacity-60">
              Size: {item.size}
            </p>
            <p className="mt-2 font-semibold">
              ₹{item.productId.discountedPrice || item.productId.price}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                dispatch(updateCart({
                  productId: item.productId._id,
                  action: "dec"
                }))
              }
            >−</button>

            <span>{item.quantity}</span>

            <button
              onClick={() =>
                dispatch(updateCart({
                  productId: item.productId._id,
                  action: "inc"
                }))
              }
            >+</button>

            <button
              onClick={() =>
                dispatch(deleteCart({
                  itemId: item._id
                }))
              }
              className="text-red-400 ml-4"
            >
              REMOVE
            </button>
          </div>
        </div>
      ))}

      {/* ✅ TOTAL + CHECKOUT */}
      <div className="mt-14 flex justify-between items-center border-t border-white/10 pt-8">
        <p className="text-xl tracking-widest">
          TOTAL: <span className="font-bold">₹{totalAmount}</span>
        </p>

        <button
          onClick={() => navigate("/checkout")}
          className="
            px-10 py-4
            rounded-full
            bg-white text-black
            font-bold tracking-widest
            hover:scale-[1.03]
            transition
          "
        >
          CHECKOUT
        </button>
      </div>
    </section>
  );
}