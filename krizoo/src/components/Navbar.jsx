import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiShoppingBag, FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, user, loading } = useSelector(state => state.auth);
  const { cart } = useSelector(state => state.cart);

  const isAdmin = user?.role === "admin";

  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const cartCount = Array.isArray(cart?.items)
    ? cart.items.reduce((t, i) => t + i.quantity, 0)
    : 0;

  const closeAll = () => {
    setMobileOpen(false);
    setAccountOpen(false);
  };

  const logoutHandler = () => {
    dispatch(logoutUser());
    closeAll();
  };

  // 🔥 PREVENT FLICKER ON RELOAD
  if (loading) return null;

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="
        fixed top-4 left-1/2 -translate-x-1/2
        w-[95%] max-w-7xl
        bg-white/10 backdrop-blur-2xl
        rounded-2xl shadow-2xl
        px-6 py-4
        z-50
      "
    >
      {/* ================= DESKTOP ================= */}
      <div className="hidden md:flex items-center justify-between">

        {/* LEFT */}
        <div className="flex gap-8 text-sm tracking-widest">
          <Link to="/male">MALE</Link>
          <Link to="/female">FEMALE</Link>
          <Link to="/contact">CONTACT</Link>
          <Link to="/about">ABOUT</Link>

          {isAdmin && (
            <Link to="/admin" className="flex items-center gap-2 text-red-500">
              <FiUpload size={14} /> ADMIN
            </Link>
          )}
        </div>

        {/* LOGO */}
        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 font-brand text-2xl tracking-widest"
        >
          KRIZOO
        </Link>

        {/* RIGHT */}
        <div className="flex items-center gap-4 relative">
          <Link to="/cart" className="relative p-2 rounded-full bg-white/10">
            <FiShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="
                absolute -top-1 -right-1
                w-5 h-5 bg-white text-black
                text-[10px] font-bold rounded-full
                flex items-center justify-center
              ">
                {cartCount}
              </span>
            )}
          </Link>

          {!isAuthenticated ? (
            <Link
              to="/login"
              className="px-6 py-2 rounded-full bg-white/15 text-xs"
            >
              LOGIN / SIGNUP
            </Link>
          ) : (
            <>
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className="px-6 py-2 rounded-full bg-white/15 text-xs"
              >
                ACCOUNT
              </button>

              <AnimatePresence>
                {accountOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="
                      absolute right-0 top-12 w-48
                      bg-white/10 backdrop-blur-xl
                      rounded-xl overflow-hidden
                    "
                  >
                    <Link to="/myprofile" onClick={closeAll} className="block px-4 py-3">
                      My Profile
                    </Link>
                    <Link to="/myorders" onClick={closeAll} className="block px-4 py-3">
                      My Orders
                    </Link>

                    {isAdmin && (
                      <Link to="/admin" onClick={closeAll} className="block px-4 py-3 text-red-400">
                        Admin Dashboard
                      </Link>
                    )}

                    <button
                      onClick={logoutHandler}
                      className="w-full text-left px-4 py-3 text-red-400"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden flex items-center justify-between">
        <button onClick={() => setMobileOpen(true)}>
          <FiMenu size={22} />
        </button>

        <Link to="/" onClick={closeAll} className="font-brand text-xl">
          KRIZOO
        </Link>

        <Link to="/cart" onClick={closeAll} className="relative">
          <FiShoppingBag size={20} />
          {cartCount > 0 && (
            <span className="
              absolute -top-2 -right-3
              min-w-[20px] h-[20px]
              bg-white text-black text-[11px]
              font-bold rounded-full
              flex items-center justify-center
            ">
              {cartCount}
            </span>
          )}
        </Link>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 p-6 z-50"
          >
            <div className="flex justify-between mb-10">
              <span className="font-brand text-xl">KRIZOO</span>
              <button onClick={closeAll}><FiX size={22} /></button>
            </div>

            <div className="flex flex-col gap-6 text-sm tracking-widest">
              {["/male","/female","/contact","/about"].map(p => (
                <Link key={p} to={p} onClick={closeAll}>
                  {p.replace("/", "").toUpperCase()}
                </Link>
              ))}
              {accountOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="
                      absolute right-0 top-12 w-48
                      bg-white/10 backdrop-blur-xl
                      rounded-xl overflow-hidden
                    "
                  >
                    <Link to="/myprofile" onClick={closeAll} className="block px-4 py-3">
                      My Profile
                    </Link>
                    <Link to="/myorders" onClick={closeAll} className="block px-4 py-3">
                      My Orders
                    </Link>
                    </motion.div>
              )}
                {isAdmin && (
                      <Link to="/admin" onClick={closeAll} className="block px-4 py-3 text-red-400">
                        Admin Dashboard
                      </Link>
                    )}
              {!isAuthenticated ? (
                <Link to="/login" onClick={closeAll}>LOGIN / SIGNUP</Link>
              ) : (
                <button onClick={logoutHandler} className="text-red-400">
                  LOGOUT
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;