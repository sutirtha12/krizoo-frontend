import { Outlet, NavLink, Link } from "react-router-dom";
import { FiGrid, FiUpload, FiBox, FiShoppingBag, FiArrowLeft, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  const closeSidebar = () => setOpen(false);

  return (
    <div className="min-h-screen flex bg-black text-white relative">

      {/* MOBILE HEADER */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-black border-b border-white/10 flex items-center justify-between px-5 py-4">
        <button onClick={() => setOpen(true)}>
          <FiMenu size={22} />
        </button>

        <h1 className="font-brand tracking-widest text-lg">
          KRIZOO ADMIN
        </h1>

        <div className="w-6" />
      </div>

      {/* OVERLAY (MOBILE) */}
      {open && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50
          h-full w-72 bg-black border-r border-white/10
          p-6 flex flex-col
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-brand text-2xl tracking-widest">
            KRIZOO
          </h1>

          <button
            onClick={closeSidebar}
            className="md:hidden"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* NAV */}
        <nav className="flex flex-col gap-4 text-sm tracking-widest flex-1">
          <NavLink
            to="/admin"
            onClick={closeSidebar}
            className="flex gap-3 items-center"
          >
            <FiGrid /> DASHBOARD
          </NavLink>

          <NavLink
            to="/admin/products"
            onClick={closeSidebar}
            className="flex gap-3 items-center"
          >
            <FiBox /> PRODUCTS
          </NavLink>

          <NavLink
            to="/admin/upload"
            onClick={closeSidebar}
            className="flex gap-3 items-center"
          >
            <FiUpload /> UPLOAD
          </NavLink>

          <NavLink
            to="/admin/orders"
            onClick={closeSidebar}
            className="flex gap-3 items-center"
          >
            <FiShoppingBag /> ORDERS
          </NavLink>
        </nav>

        {/* BACK TO STORE */}
        <Link
          to="/"
          onClick={closeSidebar}
          className="
            mt-8 flex items-center gap-3
            text-sm tracking-widest
            px-4 py-3 rounded-xl
            bg-white/10 hover:bg-white/20
          "
        >
          <FiArrowLeft />
          BACK TO STORE
        </Link>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto pt-24 md:pt-10">
        <Outlet />
      </main>
    </div>
  );
}