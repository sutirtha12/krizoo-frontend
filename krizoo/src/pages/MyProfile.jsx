import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../api/axiosInstance";

export default function MyProfile() {
  const { user } = useSelector(state => state.auth);

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    address: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        phonenumber: user.phonenumber || "",
        address: user.address || ""
      });
      setLoading(false);
    }
  }, [user]);

  const updateHandler = async () => {
    try {
      setSaving(true);
      setSuccess(false);

      await api.put("/api/update-profile", form);

      setSuccess(true);
    } catch {
      setSuccess(false);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-40 text-center tracking-widest">
        LOADING PROFILE...
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-28">
      <h1 className="text-4xl font-brand tracking-widest mb-14">
        MY PROFILE
      </h1>

      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 space-y-8">

        {/* NAME */}
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="FIRST NAME"
            value={form.firstname}
            onChange={v => setForm({ ...form, firstname: v })}
          />
          <Input
            label="LAST NAME"
            value={form.lastname}
            onChange={v => setForm({ ...form, lastname: v })}
          />
        </div>

        {/* EMAIL (READ ONLY) */}
        <Input
          label="EMAIL"
          value={form.email}
          disabled
        />

        {/* PHONE */}
        <Input
          label="PHONE NUMBER"
          value={form.phonenumber}
          onChange={v => setForm({ ...form, phonenumber: v })}
        />

        {/* ADDRESS */}
        <Textarea
          label="ADDRESS"
          value={form.address}
          onChange={v => setForm({ ...form, address: v })}
        />

        {/* ACTION */}
        <div className="pt-6 flex items-center justify-between">
          <button
            onClick={updateHandler}
            disabled={saving}
            className="
              px-10 py-4 rounded-full
              bg-white text-black
              tracking-widest font-bold
              disabled:opacity-50
            "
          >
            {saving ? "SAVING..." : "UPDATE PROFILE"}
          </button>

          {success && (
            <span className="text-green-400 tracking-widest text-sm">
              UPDATED SUCCESSFULLY
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- INPUT ---------- */
function Input({ label, value, onChange, disabled }) {
  return (
    <div>
      <p className="text-xs tracking-widest opacity-60 mb-2">
        {label}
      </p>
      <input
        value={value}
        disabled={disabled}
        onChange={e => onChange?.(e.target.value)}
        className="
          w-full p-4 rounded-xl
          bg-black border border-white/15
          disabled:opacity-50
        "
      />
    </div>
  );
}

/* ---------- TEXTAREA ---------- */
function Textarea({ label, value, onChange }) {
  return (
    <div>
      <p className="text-xs tracking-widest opacity-60 mb-2">
        {label}
      </p>
      <textarea
        rows={4}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="
          w-full p-4 rounded-xl
          bg-black border border-white/15
        "
      />
    </div>
  );
}