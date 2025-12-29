import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  createPaymentOrder,
  verifyPayment,
  placeCOD
} from "../redux/orderSlice";

import { fetchCart } from "../redux/cartSlice";
import ShippingForm from "../components/ShippingForm";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* ================= GLOBAL STATE ================= */
  const { cart } = useSelector(state => state.cart);
  const items = Array.isArray(cart?.items) ? cart.items : [];

  /* ================= FETCH CART ON LOAD ================= */
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  /* ================= SHIPPING STATE (ALWAYS FIRST) ================= */
  const [shipping, setShipping] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: ""
  });

  const isShippingValid = Object.values(shipping).every(
    v => v.trim().length > 0
  );

  /* ================= PRICE ================= */
  const subtotal = items.reduce((sum, item) => {
    const price =
      item.productId?.discountedPrice ||
      item.productId?.price ||
      0;

    return sum + price * item.quantity;
  }, 0);

  const [discount, setDiscount] = useState(0);
  const [offer, setOffer] = useState(null);

  const total = Math.max(subtotal - discount, 0);

  /* ================= EMPTY CART (AFTER HOOKS) ================= */
  if (!items.length) {
    return (
      <section className="max-w-5xl mx-auto px-6 py-32 text-center">
        <h1 className="text-3xl tracking-widest mb-6">
          CART IS EMPTY
        </h1>
        <button
          onClick={() => navigate("/")}
          className="px-8 py-4 bg-white text-black rounded-full font-bold"
        >
          CONTINUE SHOPPING
        </button>
      </section>
    );
  }

  /* ================= OFFERS ================= */
  const applyOffer = (type) => {
    if (type === "PREPAID") {
      setDiscount(200);
      setOffer("Prepaid ₹200 OFF");
    }

    if (type === "HDFC") {
      setDiscount(Math.min(300, subtotal * 0.1));
      setOffer("HDFC Bank 10% OFF");
    }

    if (type === "ICICI") {
      setDiscount(Math.min(250, subtotal * 0.08));
      setOffer("ICICI Bank 8% OFF");
    }
  };

  /* ================= PAY ONLINE ================= */
  const payOnline = async () => {
    if (!isShippingValid) {
      alert("Fill all shipping details");
      return;
    }

    const order = await dispatch(
      createPaymentOrder(total)
    ).unwrap();

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: order.amount,
      currency: "INR",
      name: "KRIZOO",
      order_id: order.id,
      handler: async (response) => {
        await dispatch(
          verifyPayment({
            ...response,
            amount: total,
            discount,
            shippingDetails: shipping
          })
        );
        navigate("/thankyou");
      },
      theme: { color: "#000000" }
    };

    new window.Razorpay(options).open();
  };

  /* ================= COD ================= */
  const payCOD = async () => {
    if (!isShippingValid) {
      alert("Fill all shipping details");
      return;
    }

    await dispatch(
      placeCOD({
        amount: total,
        discount,
        shippingDetails: shipping
      })
    );

    navigate("/thankyou");
  };

  /* ================= UI ================= */
  return (
    <section className="max-w-5xl mx-auto px-6 py-32 text-white">
      <h1 className="font-brand text-4xl tracking-widest mb-12">
        CHECKOUT
      </h1>

      {/* SHIPPING */}
      <ShippingForm
        shipping={shipping}
        setShipping={setShipping}
      />

      {/* SUMMARY */}
      <div className="bg-white/5 p-6 rounded-2xl mb-10">
        {items.map(item => (
          <div key={item._id} className="flex justify-between mb-3">
            <span>
              {item.productId.name} × {item.quantity}
            </span>
            <span>
              ₹{(item.productId.discountedPrice || item.productId.price) * item.quantity}
            </span>
          </div>
        ))}

        <div className="border-t border-white/10 mt-6 pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-green-400">
              <span>{offer}</span>
              <span>-₹{discount}</span>
            </div>
          )}

          <div className="flex justify-between text-2xl font-bold mt-4">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>

      {/* OFFERS */}
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        <button onClick={() => applyOffer("PREPAID")} className="p-4 bg-white/10 rounded-xl">
          💳 PREPAID<br />₹200 OFF
        </button>
        <button onClick={() => applyOffer("HDFC")} className="p-4 bg-white/10 rounded-xl">
          🏦 HDFC BANK<br />10% OFF
        </button>
        <button onClick={() => applyOffer("ICICI")} className="p-4 bg-white/10 rounded-xl">
          🏦 ICICI BANK<br />8% OFF
        </button>
      </div>

      {/* PAY */}
      <div className="grid gap-4">
        <button
          onClick={payOnline}
          className="py-5 rounded-full bg-white text-black font-bold tracking-widest"
        >
          PAY ONLINE ₹{total}
        </button>

        <button
          onClick={payCOD}
          className="py-5 rounded-full border border-white/30 tracking-widest"
        >
          CASH ON DELIVERY (+₹99)
        </button>
      </div>
    </section>
  );
}

export default Checkout;