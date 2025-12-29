import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createAdminProduct,
  uploadAdminImages
} from "../../redux/adminSlice";

export default function AdminUpload() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    discountedPrice: "",
    category: "compression-tshirt",
    gender: "men",
    material: "",
    fit: "regular"
  });

  const [sizes, setSizes] = useState([
    { size: "S", stock: 0 },
    { size: "M", stock: 0 },
    { size: "L", stock: 0 },
    { size: "XL", stock: 0 }
  ]);

  const [colors, setColors] = useState([{ name: "", hex: "#000000" }]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    try {
      if (!form.name || !form.description || !form.price || !form.material) {
        alert("Please fill all required fields");
        return;
      }

      setLoading(true);

      const payload = {
        ...form,
        slug: form.name.toLowerCase().replace(/\s+/g, "-"),
        price: Number(form.price),
        discountedPrice: form.discountedPrice
          ? Number(form.discountedPrice)
          : undefined,
        sizes: sizes.filter(s => s.stock > 0),
        colors: colors.filter(c => c.name)
      };

      const product = await dispatch(
        createAdminProduct(payload)
      ).unwrap();

      if (images.length > 0) {
        await dispatch(
          uploadAdminImages({
            productId: product._id,
            images
          })
        ).unwrap();
      }

      alert("Product uploaded successfully");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-32">
      <h1 className="text-4xl tracking-widest mb-12">
        UPLOAD PRODUCT
      </h1>

      {/* BASIC INFO */}
      <div className="grid gap-5 mb-10">
        <input placeholder="NAME" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="p-4 bg-white/5 rounded-xl" />
        <input placeholder="DESCRIPTION" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="p-4 bg-white/5 rounded-xl" />
        <input placeholder="PRICE" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="p-4 bg-white/5 rounded-xl" />
        <input placeholder="DISCOUNTED PRICE" type="number" value={form.discountedPrice} onChange={e => setForm({ ...form, discountedPrice: e.target.value })} className="p-4 bg-white/5 rounded-xl" />
        <input placeholder="MATERIAL" value={form.material} onChange={e => setForm({ ...form, material: e.target.value })} className="p-4 bg-white/5 rounded-xl" />
      </div>

      {/* SIZES */}
      <h2 className="mb-4">SIZES</h2>
      {sizes.map((s, i) => (
        <div key={i} className="flex gap-4 mb-3">
          <span className="w-12">{s.size}</span>
          <input
            type="number"
            placeholder="Stock"
            onChange={e => {
              const updated = [...sizes];
              updated[i].stock = Number(e.target.value);
              setSizes(updated);
            }}
          />
        </div>
      ))}

      {/* COLORS */}
      <h2 className="mt-8 mb-4">COLORS</h2>
      {colors.map((c, i) => (
        <div key={i} className="flex gap-4 mb-3">
          <input
            placeholder="Color name"
            onChange={e => {
              const updated = [...colors];
              updated[i].name = e.target.value;
              setColors(updated);
            }}
          />
          <input
            type="color"
            value={c.hex}
            onChange={e => {
              const updated = [...colors];
              updated[i].hex = e.target.value;
              setColors(updated);
            }}
          />
        </div>
      ))}

      {/* IMAGE META CONTROLS */}
      <h2 className="mt-12 mb-4">IMAGE SETTINGS</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <select
          value={form.gender}
          onChange={e => setForm({ ...form, gender: e.target.value })}
          className="p-4 bg-white/5 rounded-xl"
        >
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="unisex">Unisex</option>
        </select>

        <select
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
          className="p-4 bg-white/5 rounded-xl"
        >
          <option value="compression-tshirt">Compression T-Shirt</option>
          <option value="sports-bra">Sports Bra</option>
          <option value="leggings">Leggings</option>
          <option value="oversize-tshirt">Oversize T-Shirt</option>
          <option value="joggers">Joggers</option>
          <option value="hoodie">Hoodie</option>
        </select>

        <select
          value={form.fit}
          onChange={e => setForm({ ...form, fit: e.target.value })}
          className="p-4 bg-white/5 rounded-xl"
        >
          <option value="regular">Regular</option>
          <option value="compression">Compression</option>
          <option value="oversized">Oversized</option>
        </select>
      </div>

      {/* IMAGE UPLOAD */}
      <h2 className="mb-4">UPLOAD IMAGES</h2>
      <input
        type="file"
        multiple
        onChange={e => setImages([...e.target.files])}
      />

      <button
        disabled={loading}
        onClick={submitHandler}
        className="mt-10 w-full py-5 bg-white text-black rounded-full font-bold"
      >
        {loading ? "UPLOADING..." : "UPLOAD PRODUCT"}
      </button>
    </section>
  );
}