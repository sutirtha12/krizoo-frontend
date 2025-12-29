import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelMyOrder, fetchMyOrders } from "../redux/orderSlice";

function MyOrders() {
    const dispatch = useDispatch();
    const { myOrders = [], loading } = useSelector(state => state.orders);

    useEffect(() => {
        dispatch(fetchMyOrders());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="py-40 text-center tracking-widest">
                LOADING ORDERS...
            </div>
        );
    }

    if (myOrders.length === 0) {
        return (
            <div className="py-40 text-center opacity-50">
                You haven’t placed any orders yet.
            </div>
        );
    }

    return (
        <section className="max-w-6xl mx-auto px-6 py-28">
            <h1 className="text-4xl font-brand tracking-widest mb-14">
                MY ORDERS
            </h1>

            <div className="space-y-10">
                {myOrders.map(order => {
                    const items = Array.isArray(order.items) ? order.items : [];

                    const totalAmount =
                        order.amount ??
                        items.reduce(
                            (sum, i) => sum + i.price * i.quantity,
                            0
                        );

                    return (
                        <div
                            key={order.orderId}
                            className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-xl"
                        >
                            {/* HEADER */}
                            <div className="flex justify-between mb-6">
                                <div>
                                    <p className="tracking-widest font-semibold">ORDER ID</p>
                                    <p className="text-xs opacity-60">{order.orderId}</p>
                                </div>

                                <div className="text-right">
                                    <p className="text-lg font-bold">₹{totalAmount}</p>
                                    <p className="text-xs opacity-60">{order.paymentMethod}</p>
                                </div>
                            </div>

                            {/* ITEMS */}
                            <div className="border-t border-white/10 pt-4 space-y-3">
                                {items.map((item, i) => (
                                    <div key={i} className="flex justify-between text-sm">
                                        <span>
                                            {item.productId?.name || "Product"} × {item.quantity}
                                            {item.size && ` (${item.size})`}
                                        </span>
                                        <span>₹{item.price}</span>
                                    </div>
                                ))}
                            </div>

                            {/* STATUS */}
                            {/* STATUS */}
                            <div className="mt-8 flex justify-between items-center text-xs tracking-widest">
                                <span
                                    className={`px-4 py-2 rounded-full ${order.status === "DELIVERED"
                                            ? "bg-green-500/20 text-green-400"
                                            : order.status === "CANCELLED"
                                                ? "bg-red-500/20 text-red-400"
                                                : "bg-white/10"
                                        }`}
                                >
                                    {order.status}
                                </span>

                                {order.status === "PLACED" || order.status === "CONFIRMED" ? (
                                    <button
                                        onClick={() => dispatch(cancelMyOrder(order.orderId))}
                                        className="text-red-400 hover:underline"
                                    >
                                        CANCEL ORDER
                                    </button>
                                ) : null}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default MyOrders;