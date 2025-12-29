import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminOrders,
  updateAdminOrder
} from "../../redux/adminSlice";

export default function AdminOrders() {
  const dispatch = useDispatch();
  const { orders = [], loading } = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(fetchAdminOrders());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="py-40 text-center tracking-widest">
        LOADING ORDERS...
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-8 py-24">
      <h1 className="text-4xl font-brand tracking-widest mb-14">
        ALL ORDERS
      </h1>

      <div className="space-y-10">
        {orders.length === 0 && (
          <p className="text-center opacity-50">
            No orders found
          </p>
        )}

        {orders.map(order => {
          const items = Array.isArray(order.items) ? order.items : [];
          const shipping = order.shippingDetails || {};

          const totalAmount =
            order.amount && order.amount > 0
              ? order.amount
              : items.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0
                );

          return (
            <div
              key={order._id}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-xl"
            >
              {/* HEADER */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="tracking-widest font-semibold">
                    {order.user?.name || "Unknown User"}
                  </p>
                  <p className="text-xs opacity-60">
                    {order.user?.email || "—"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold">
                    ₹{totalAmount}
                  </p>
                  <p className="text-xs opacity-60">
                    {order.paymentMethod}
                  </p>
                </div>
              </div>

              {/* SHIPPING DETAILS */}
              <div className="border border-white/10 rounded-2xl p-5 mb-6">
                <p className="text-xs tracking-widest opacity-60 mb-3">
                  SHIPPING DETAILS
                </p>

                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <p>
                    <span className="opacity-50">Name:</span>{" "}
                    {shipping.firstname} {shipping.lastname}
                  </p>
                  <p>
                    <span className="opacity-50">Phone:</span>{" "}
                    {shipping.phone}
                  </p>
                  <p>
                    <span className="opacity-50">Email:</span>{" "}
                    {shipping.email}
                  </p>
                  <p>
                    <span className="opacity-50">Pincode:</span>{" "}
                    {shipping.pincode}
                  </p>
                  <p className="md:col-span-2">
                    <span className="opacity-50">Address:</span>{" "}
                    {shipping.addressLine}, {shipping.city},{" "}
                    {shipping.state}
                  </p>
                </div>
              </div>

              {/* ITEMS */}
              <div className="border-t border-white/10 pt-4 space-y-3">
                {items.length > 0 ? (
                  items.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {item.productId?.name || "Product"} ×{" "}
                        {item.quantity}
                      </span>
                      <span>₹{item.price}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs opacity-50">
                    No items
                  </p>
                )}
              </div>

              {/* CONTROLS */}
              <div className="mt-8 flex flex-wrap gap-6 items-center">
                {/* ORDER STATUS */}
                <div>
                  <p className="text-xs mb-1 tracking-widest opacity-60">
                    ORDER STATUS
                  </p>
                  <select
                    value={order.status}
                    onChange={e =>
                      dispatch(
                        updateAdminOrder({
                          orderId: order._id,
                          status: e.target.value
                        })
                      )
                    }
                    className="bg-black border border-white/20 rounded-lg px-4 py-2"
                  >
                    <option value="PLACED">PLACED</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>

                {/* PAYMENT STATUS */}
                <div>
                  <p className="text-xs mb-1 tracking-widest opacity-60">
                    PAYMENT STATUS
                  </p>
                  <select
                    value={order.paymentStatus}
                    onChange={e =>
                      dispatch(
                        updateAdminOrder({
                          orderId: order._id,
                          paymentStatus: e.target.value
                        })
                      )
                    }
                    className="bg-black border border-white/20 px-4 py-2 rounded-xl text-xs tracking-widest"
                  >
                    <option value="PAID">PAID</option>
                    <option value="PENDING">PENDING</option>
                    <option value="FAILED">FAILED</option>
                    <option value="COD">COD</option>
                  </select>
                </div>

                {/* DATE */}
                <span className="ml-auto text-xs opacity-60">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString()
                    : ""}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}