import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const [form, setForm] = useState({
    username: "",
    firstname: "",
    lastname: "",
    dob: "",
    phonenumber: "",
    email: "",
    password: "",
    address: ""
  });

  const [localError, setLocalError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    for (const key in form) {
      if (!form[key]) {
        setLocalError("Please fill all details");
        return;
      }
    }

    const res = await dispatch(signupUser(form));
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-6 py-20">
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-3xl
          bg-zinc-900/90
          p-12
          rounded-3xl
          space-y-6
          shadow-2xl
        "
      >
        <h1 className="text-4xl font-black tracking-widest text-center mb-2">
          CREATE ACCOUNT
        </h1>

        <p className="text-center text-xs tracking-widest opacity-60 mb-6">
          JOIN THE KRIZOO MOVEMENT
        </p>

        {/* ERRORS */}
        {localError && (
          <p className="text-red-500 text-sm text-center">
            {localError}
          </p>
        )}
        {error && (
          <p className="text-red-500 text-sm text-center">
            {error}
          </p>
        )}

        {/* NAME */}
        <div className="grid grid-cols-2 gap-6">
          <input
            name="firstname"
            placeholder="First Name"
            className="input"
            onChange={handleChange}
          />
          <input
            name="lastname"
            placeholder="Last Name"
            className="input"
            onChange={handleChange}
          />
        </div>

        {/* USERNAME */}
        <input
          name="username"
          placeholder="Username"
          className="input"
          onChange={handleChange}
        />

        {/* EMAIL – BIGGER */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="input py-4 text-base"
          onChange={handleChange}
        />

        {/* DOB – BIGGER */}
        <input
          type="date"
          name="dob"
          className="input py-4 text-base"
          onChange={handleChange}
        />

        {/* PHONE */}
        <input
          name="phonenumber"
          placeholder="Phone Number"
          className="input"
          onChange={handleChange}
        />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input"
          onChange={handleChange}
        />

        {/* ADDRESS */}
        <input
          name="address"
          placeholder="Address"
          className="input"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="
            w-full mt-6 py-4
            rounded-full
            bg-white text-black
            font-bold tracking-widest
            hover:scale-[1.02]
            transition-all
          "
        >
          {loading ? "CREATING ACCOUNT..." : "SIGN UP"}
        </button>
      </form>
    </div>
  );
};

export default Signup;