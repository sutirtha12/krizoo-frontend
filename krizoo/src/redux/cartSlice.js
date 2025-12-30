import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axiosInstance";

/* ADD TO CART */
export const addToCart = createAsyncThunk(
  "cart/add",
  async (data, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await axios.post(
        "/usercart/newcart",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

/* FETCH CART */
export const fetchCart = createAsyncThunk(
  "cart/fetch",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await axios.get(
        "/usercart/fetch",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

/* UPDATE CART */
export const updateCart = createAsyncThunk(
  "cart/update",
  async ({ productId, action }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await axios.put(
        "/usercart/update",
        { productId, action },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

/* DELETE CART ITEM */
export const deleteCart = createAsyncThunk(
  "cart/delete",
  async ({ itemId }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await axios.delete(
        `/usercart/delete/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

/* SLICE */
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: { items: [] },
    loading: false
  },
  reducers: {},
  extraReducers: builder => {
  builder

    /* ================= FETCH CART ================= */
    .addCase(fetchCart.pending, state => {
      state.loading = true;
      state.error = null;
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
    .addCase(addToCart.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(addToCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    })
    .addCase(addToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    /* ================= UPDATE CART ================= */
    .addCase(updateCart.pending, state => {
      state.loading = true;
      state.error = null;
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
    .addCase(deleteCart.pending, state => {
      state.loading = true;
      state.error = null;
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

export default cartSlice.reducer;