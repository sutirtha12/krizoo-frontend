import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

/* ================= FETCH ALL PRODUCTS ================= */
export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/product/fetch");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Fetch failed");
    }
  }
);

/* ================= FETCH SINGLE PRODUCT (WITH IMAGES) ================= */
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/product/fetch/${id}`);
      return res.data.data; // { product, images }
    } catch (err) {
      if (err.response?.status === 404) {
        return { product: null, images: [] };
      }
      return rejectWithValue("Fetch product failed");
    }
  }
);

/* ================= SLICE ================= */
const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    current: null, // { product, images }
    loading: false,
    error: null
  },
  reducers: {
    clearCurrentProduct(state) {
      state.current = null;
    }
  },
  extraReducers: builder => {
    builder
      /* All products */
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* Single product */
      .addCase(fetchProductById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.current = null;
        state.error = action.payload;
      });
  }
});

export const { clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer;