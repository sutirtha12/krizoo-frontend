import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(form)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-black">

      <div className="
        w-full max-w-md
        rounded-3xl
        bg-white/5 backdrop-blur-2xl
        shadow-[0_30px_80px_rgba(0,0,0,0.6)]
        p-10
      ">
        <h1 className="
          font-brand font-black
          text-4xl tracking-widest
          text-center mb-2
        ">
          KRIZOO
        </h1>

        <p className="text-center text-xs tracking-widest opacity-70 mb-8">
          ACCESS YOUR WORLD
        </p>

        {error && (
          <p className="text-red-400 text-xs text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={submitHandler} className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            className="
              w-full px-5 py-4
              rounded-xl
              bg-black/40
              outline-none
              text-sm tracking-widest
              placeholder:text-white/40
            "
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="
              w-full px-5 py-4
              rounded-xl
              bg-black/40
              outline-none
              text-sm tracking-widest
              placeholder:text-white/40
            "
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="
              w-full mt-4
              py-4 rounded-full
              font-brand tracking-widest
              bg-white text-black
              hover:scale-105
              transition-all
              shadow-xl
            "
          >
            {loading ? "ENTERING..." : "LOGIN"}
          </button>
        </form>

        <p className="text-xs text-center mt-8 opacity-70">
          New to Krizoo?{" "}
          <Link to="/signup" className="underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;