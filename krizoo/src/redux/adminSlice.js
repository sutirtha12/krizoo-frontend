import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

/* ================= DASHBOARD ================= */

export const fetchAdminDashboard = createAsyncThunk(
  "admin/dashboard",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/admin/dashboard");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Dashboard fetch failed");
    }
  }
);

/* ================= PRODUCTS ================= */

/* 🔹 Fetch all products (admin) */
export const fetchAdminProducts = createAsyncThunk(
  "admin/products",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/product/admin/all");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Product fetch failed");
    }
  }
);

/* 🔹 Create product (JSON ONLY) */
export const createAdminProduct = createAsyncThunk(
  "admin/createProduct",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/product/upload",
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Create product failed");
    }
  }
);

/* 🔹 Upload images */
export const uploadAdminImages = createAsyncThunk(
  "admin/uploadImages",
  async ({ productId, images }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      images.forEach(img => formData.append("images", img));

      const res = await api.post(
        `/product/upload-image/${productId}`,
        formData
      );

      return res.data.data; // ProductImage doc
    } catch (err) {
      return rejectWithValue(err.response?.data || "Image upload failed");
    }
  }
);

/* 🔹 Edit product */
export const editAdminProduct = createAsyncThunk(
  "admin/editProduct",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(
        `/product/update/${id}`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Edit failed");
    }
  }
);

/* 🔹 Delete product */
export const deleteAdminProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/product/delete/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Delete failed");
    }
  }
);

/* ================= ORDERS ================= */

export const fetchAdminOrders = createAsyncThunk(
  "admin/orders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/admin/orders");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Order fetch failed");
    }
  }
);

export const updateAdminOrder = createAsyncThunk(
  "admin/updateOrder",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.put("/admin/order/update", payload);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Order update failed");
    }
  }
);

/* ================= ABANDONED CARTS ================= */

export const fetchAbandonedCarts = createAsyncThunk(
  "admin/carts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/admin/abandoned-carts");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Cart fetch failed");
    }
  }
);

/* ================= SLICE ================= */

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    dashboard: null,
    products: [],
    orders: [],
    carts: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder

      /* DASHBOARD */
      .addCase(fetchAdminDashboard.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(fetchAdminDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* PRODUCTS */
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })

      .addCase(createAdminProduct.pending, state => {
        state.loading = true;
      })
      .addCase(createAdminProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.unshift(action.payload); // ✅ instant UI
      })
      .addCase(createAdminProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(uploadAdminImages.pending, state => {
        state.loading = true;
      })
      .addCase(uploadAdminImages.fulfilled, (state, action) => {
        state.loading = false;

        const { product, images } = action.payload;
        const index = state.products.findIndex(p => p._id === product);

        if (index !== -1) {
          state.products[index] = {
            ...state.products[index],
            images
          };
        }
      })
      .addCase(uploadAdminImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(editAdminProduct.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editAdminProduct.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.products.findIndex(
          p => p._id === action.payload._id
        );

        if (index !== -1) {
          state.products[index] = {
            ...state.products[index],
            ...action.payload
          };
        }
      })
      .addCase(editAdminProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteAdminProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          p => p._id !== action.payload
        );
      })

      /* ORDERS */
      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(updateAdminOrder.fulfilled, (state, action) => {
        const { orderId, status, paymentStatus } = action.payload;
        const order = state.orders.find(o => o._id === orderId);

        if (order) {
          if (status !== undefined) order.status = status;
          if (paymentStatus !== undefined) order.paymentStatus = paymentStatus;
        }
      })

      /* CARTS */
      .addCase(fetchAbandonedCarts.fulfilled, (state, action) => {
        state.carts = action.payload;
      });
  }
});

export default adminSlice.reducer;