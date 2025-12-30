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

    /* ================= CREATE PAYMENT ORDER ================= */
    .addCase(createPaymentOrder.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createPaymentOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.paymentOrder = action.payload;
    })
    .addCase(createPaymentOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    /* ================= VERIFY PAYMENT ================= */
    .addCase(verifyPayment.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(verifyPayment.fulfilled, state => {
      state.loading = false;
      state.success = true;
    })
    .addCase(verifyPayment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    /* ================= CASH ON DELIVERY ================= */
    .addCase(placeCOD.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(placeCOD.fulfilled, state => {
      state.loading = false;
      state.success = true;
    })
    .addCase(placeCOD.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    /* ================= FETCH MY ORDERS ================= */
    .addCase(fetchMyOrders.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchMyOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.myOrders = action.payload;
    })
    .addCase(fetchMyOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    /* ================= CANCEL ORDER ================= */
    .addCase(cancelMyOrder.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(cancelMyOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.myOrders = state.myOrders.map(order =>
        order._id === action.payload
          ? { ...order, status: "CANCELLED" }
          : order
      );
    })
    .addCase(cancelMyOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
}
});

export default cartSlice.reducer;