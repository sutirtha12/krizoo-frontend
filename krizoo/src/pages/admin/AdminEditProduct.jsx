import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  editAdminProduct,
  uploadAdminImages
} from "../../redux/adminSlice";

import { fetchProductById } from "../../redux/productSlice";
import api from "../../api/axiosInstance";

export default function AdminEditProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { products } = useSelector(state => state.admin);
  const { current, loading } = useSelector(state => state.products);

  const product = products.find(p => p._id === id);

  const [form, setForm] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [images, setImages] = useState([]);

  /* ================= LOAD PRODUCT META ================= */
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        price: product.price,
        discountedPrice: product.discountedPrice || "",
        category: product.category,
        gender: product.gender,
        material: product.material,
        fit: product.fit
      });
    }
  }, [product]);

  /* ================= LOAD PRODUCT IMAGES ================= */
  useEffect(() => {
    dispatch(fetchProductById(id))
      .unwrap()
      .then(data => {
        setImages(data?.images || []);
      })
      .catch(() => {
        // 404 = product exists but no images
        setImages([]);
      });
  }, [dispatch, id]);

  if (!form || loading) {
    return (
      <div className="py-40 text-center tracking-widest">
        LOADING PRODUCT...
      </div>
    );
  }

  /* ================= UPDATE HANDLER ================= */
  const updateHandler = async () => {
    try {
      await dispatch(
        editAdminProduct({
          id,
          data: {
            ...form,
            price: Number(form.price),
            discountedPrice: form.discountedPrice
              ? Number(form.discountedPrice)
              : undefined
          }
        })
      ).unwrap();

      if (newImages.length > 0) {
        await dispatch(
          uploadAdminImages({
            productId: id,
            images: newImages
          })
        ).unwrap();
      }

      alert("Product updated successfully");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  /* ================= DELETE IMAGE ================= */
  const deleteImage = async (imageId) => {
    if (!window.confirm("Delete this image?")) return;

    await api.delete(`/product/delete-image/${imageId}`);
    setImages(prev => prev.filter(img => img._id !== imageId));
  };

  return (
    <section className="max-w-6xl mx-auto py-32 px-6">
      <h1 className="text-4xl tracking-widest mb-12">
        EDIT PRODUCT
      </h1>

      {/* PRODUCT FORM */}
      <div className="grid gap-5 mb-10">
        {Object.keys(form).map(key => (
          <input
            key={key}
            value={form[key]}
            placeholder={key.toUpperCase()}
            className="p-4 bg-white/5 rounded-xl"
            onChange={e =>
              setForm({ ...form, [key]: e.target.value })
            }
          />
        ))}
      </div>

      {/* IMAGES */}
      <h2 className="tracking-widest mb-4">IMAGES</h2>

      {images.length === 0 && (
        <p className="text-sm opacity-50 mb-4">
          No images uploaded yet
        </p>
      )}

      <div className="grid grid-cols-4 gap-4 mb-6">
        {images.map(img => (
          <div key={img._id} className="relative">
            <img
              src={img.url}
              alt=""
              className="rounded-xl object-cover h-40 w-full"
            />
            <button
              onClick={() => deleteImage(img._id)}
              className="absolute top-2 right-2 bg-black/70 px-2 py-1 text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <input
        type="file"
        multiple
        onChange={e => setNewImages([...e.target.files])}
      />

      <button
        onClick={updateHandler}
        className="mt-10 w-full py-5 bg-white text-black rounded-full font-bold"
      >
        UPDATE PRODUCT
      </button>
    </section>
  );
}