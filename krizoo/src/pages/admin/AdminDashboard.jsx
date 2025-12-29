import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminDashboard } from "../../redux/adminSlice";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { dashboard, loading } = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(fetchAdminDashboard());
  }, [dispatch]);

  if (loading || !dashboard) {
    return (
      <div className="py-40 text-center tracking-widest">
        LOADING DASHBOARD...
      </div>
    );
  }

  const chartData = [
    { name: "Users", value: Number(dashboard.totalUsers || 0) },
    { name: "Orders", value: Number(dashboard.totalOrders || 0) },
    { name: "Carts", value: Number(dashboard.cartsFilled || 0) }
  ];

  return (
    <section className="max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-brand tracking-widest mb-12">
        DASHBOARD
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-14">
        <StatCard title="USERS" value={dashboard.totalUsers} />
        <StatCard title="ORDERS" value={dashboard.totalOrders} />
        <StatCard title="ABANDONED CARTS" value={dashboard.cartsFilled} />
        <StatCard
          title="TOTAL REVENUE"
          value={`₹${dashboard.totalRevenue}`}
          highlight
        />
      </div>

      {/* CHART */}
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-4 md:p-6 h-[300px] md:h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.08)"
            />
            <XAxis dataKey="name" stroke="#aaa" />
            <YAxis stroke="#aaa" allowDecimals={false} />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
              contentStyle={{
                backgroundColor: "#000",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "10px",
                color: "#fff"
              }}
            />
            <Bar
              dataKey="value"
              fill="#ffffff"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

/* ---------- STAT CARD ---------- */
function StatCard({ title, value, highlight }) {
  return (
    <div
      className={`
        rounded-2xl p-4 md:p-6
        ${highlight ? "bg-white text-black" : "bg-white/5"}
      `}
    >
      <p className="text-xs tracking-widest opacity-70">{title}</p>
      <p className="text-2xl md:text-3xl mt-2 font-semibold">
        {value ?? 0}
      </p>
    </div>
  );
}