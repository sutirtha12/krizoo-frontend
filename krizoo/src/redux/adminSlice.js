import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

/* ================= DASHBOARD ================= */

export const fetchAdminDashboard = createAsyncThunk(
  "admin/dashboard",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await api.get(
        "/admin/dashboard",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Dashboard fetch failed");
    }
  }
);

/* ================= PRODUCTS ================= */

export const fetchAdminProducts = createAsyncThunk(
  "admin/products",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await api.get(
        "/product/admin/all",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Product fetch failed");
    }
  }
);

export const createAdminProduct = createAsyncThunk(
  "admin/createProduct",
  async (data, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await api.post(
        "/product/upload",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Create product failed");
    }
  }
);

export const uploadAdminImages = createAsyncThunk(
  "admin/uploadImages",
  async ({ productId, images }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const formData = new FormData();
      images.forEach(img => formData.append("images", img));

      const res = await api.post(
        `/product/upload-image/${productId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Image upload failed");
    }
  }
);

export const editAdminProduct = createAsyncThunk(
  "admin/editProduct",
  async ({ id, data }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await api.put(
        `/product/update/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Edit failed");
    }
  }
);

export const deleteAdminProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      await api.delete(
        `/product/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Delete failed");
    }
  }
);

/* ================= ORDERS ================= */

export const fetchAdminOrders = createAsyncThunk(
  "admin/orders",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await api.get(
        "/admin/orders",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Order fetch failed");
    }
  }
);

export const updateAdminOrder = createAsyncThunk(
  "admin/updateOrder",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await api.put(
        "/admin/order/update",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Order update failed");
    }
  }
);

/* ================= ABANDONED CARTS ================= */

export const fetchAbandonedCarts = createAsyncThunk(
  "admin/carts",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await api.get(
        "/admin/abandoned-carts",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

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

    /* ================= DASHBOARD ================= */
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

    /* ================= PRODUCTS ================= */
    .addCase(fetchAdminProducts.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchAdminProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    })
    .addCase(fetchAdminProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase(createAdminProduct.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createAdminProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products.unshift(action.payload);
    })
    .addCase(createAdminProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase(uploadAdminImages.pending, state => {
      state.loading = true;
      state.error = null;
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

    .addCase(deleteAdminProduct.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteAdminProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = state.products.filter(
        p => p._id !== action.payload
      );
    })
    .addCase(deleteAdminProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    /* ================= ORDERS ================= */
    .addCase(fetchAdminOrders.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchAdminOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    })
    .addCase(fetchAdminOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase(updateAdminOrder.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateAdminOrder.fulfilled, (state, action) => {
      state.loading = false;

      const { orderId, status, paymentStatus } = action.payload;
      const order = state.orders.find(o => o._id === orderId);

      if (order) {
        if (status !== undefined) order.status = status;
        if (paymentStatus !== undefined) order.paymentStatus = paymentStatus;
      }
    })
    .addCase(updateAdminOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    /* ================= ABANDONED CARTS ================= */
    .addCase(fetchAbandonedCarts.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchAbandonedCarts.fulfilled, (state, action) => {
      state.loading = false;
      state.carts = action.payload;
    })
    .addCase(fetchAbandonedCarts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
}
});

export default adminSlice.reducer;