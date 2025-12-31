import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

/* ================= THUNKS ================= */

// ADD TO CART
export const addToCart = createAsyncThunk(
  "cart/add",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/usercart/newcart", data);
      return res.data.data; // { items: [...] }
    } catch (err) {
      return rejectWithValue(err.response?.data || "Add to cart failed");
    }
  }
);

// FETCH CART
export const fetchCart = createAsyncThunk(
  "cart/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/usercart/fetch");
      return res.data.data; // { items: [...] }
    } catch (err) {
      return rejectWithValue(err.response?.data || "Fetch cart failed");
    }
  }
);

// UPDATE CART (INC / DEC)
export const updateCart = createAsyncThunk(
  "cart/update",
  async ({ productId, action }, { rejectWithValue }) => {
    try {
      const res = await api.put("/usercart/update", {
        productId,
        action
      });
      return res.data.data; // { items: [...] }
    } catch (err) {
      return rejectWithValue(err.response?.data || "Update cart failed");
    }
  }
);

// DELETE CART ITEM
export const deleteCart = createAsyncThunk(
  "cart/delete",
  async (itemId, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/usercart/delete/${itemId}`);
      return res.data.data; // { items: [...] }
    } catch (err) {
      return rejectWithValue(err.response?.data || "Delete cart item failed");
    }
  }
);

/* ================= SLICE ================= */

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: { items: [] },
    loading: false,
    error: null
  },
  reducers: {
    // 🔥 MUST be called on logout
    clearCart: (state) => {
      state.cart = { items: [] };
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder

      /* ================= FETCH CART ================= */
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= ADD TO CART ================= */
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload; // instant UI update
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= UPDATE CART ================= */
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= DELETE CART ITEM ================= */
      .addCase(deleteCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;