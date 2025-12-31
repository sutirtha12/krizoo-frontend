import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";
import { clearCart } from "./cartSlice";

/* ================= THUNKS ================= */

/* CREATE RAZORPAY ORDER */
export const createPaymentOrder = createAsyncThunk(
  "order/createPayment",
  async (amount, { rejectWithValue }) => {
    try {
      const res = await api.post("/payment/create-order", { amount });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create payment order"
      );
    }
  }
);

/* VERIFY ONLINE PAYMENT */
export const verifyPayment = createAsyncThunk(
  "order/verify",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post("/payment/verify", payload);

      // 🔥 clear cart after successful order
      dispatch(clearCart());

      return res.data.data; // created order
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Payment verification failed"
      );
    }
  }
);

/* PLACE CASH ON DELIVERY ORDER */
export const placeCOD = createAsyncThunk(
  "order/cod",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post("/payment/cod", payload);

      // 🔥 clear cart after successful order
      dispatch(clearCart());

      return res.data.data; // created order
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "COD order failed"
      );
    }
  }
);

/* FETCH LOGGED-IN USER ORDERS */
export const fetchMyOrders = createAsyncThunk(
  "order/myOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/my-orders");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

/* CANCEL ORDER */
export const cancelMyOrder = createAsyncThunk(
  "order/cancel",
  async (orderId, { rejectWithValue }) => {
    try {
      await api.put("/api/cancel-order", { orderId });
      return orderId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Cancel failed"
      );
    }
  }
);

/* ================= SLICE ================= */

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    error: null,
    paymentOrder: null,
    success: false,
    myOrders: []
  },
  reducers: {
    resetOrderState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.paymentOrder = null;
    }
  },
  extraReducers: builder => {
    builder

      /* CREATE PAYMENT ORDER */
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

      /* VERIFY PAYMENT */
      .addCase(verifyPayment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.myOrders.unshift(action.payload); // instant UI
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* CASH ON DELIVERY */
      .addCase(placeCOD.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeCOD.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.myOrders.unshift(action.payload); // instant UI
      })
      .addCase(placeCOD.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* FETCH MY ORDERS */
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

      /* CANCEL ORDER */
      .addCase(cancelMyOrder.pending, state => {
        state.loading = true;
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

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;