import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

/* ---------------- THUNKS ---------------- */

export const createPaymentOrder = createAsyncThunk(
  "order/createPayment",
  async (amount, { rejectWithValue }) => {
    try {
      const res = await api.post("/payment/create-order", { amount });
      return res.data.data;
    } catch {
      return rejectWithValue("Failed to create payment order");
    }
  }
);

export const verifyPayment = createAsyncThunk(
  "order/verify",
  async (payload, { rejectWithValue }) => {
    try {
      await api.post("/payment/verify", payload);
      return true;
    } catch {
      return rejectWithValue("Payment verification failed");
    }
  }
);

export const placeCOD = createAsyncThunk(
  "order/cod",
  async (payload, { rejectWithValue }) => {
    try {
      await api.post("/payment/cod", payload);
      return true;
    } catch {
      return rejectWithValue("COD order failed");
    }
  }
);

export const fetchMyOrders = createAsyncThunk(
  "order/myOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/my-orders");
      return res.data.data;
    } catch {
      return rejectWithValue("Failed to fetch orders");
    }
  }
);

export const cancelMyOrder = createAsyncThunk(
  "order/cancel",
  async (orderId, { rejectWithValue }) => {
    try {
      await api.put("/api/cancel-order", { orderId });
      return orderId;
    } catch {
      return rejectWithValue("Cancel failed");
    }
  }
);

/* ---------------- SLICE ---------------- */

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
    resetOrderState: state => {
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
      })
      .addCase(verifyPayment.fulfilled, state => {
        state.loading = false;
        state.success = true;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* COD */
      .addCase(placeCOD.pending, state => {
        state.loading = true;
      })
      .addCase(placeCOD.fulfilled, state => {
        state.loading = false;
        state.success = true;
      })
      .addCase(placeCOD.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* FETCH MY ORDERS */
      .addCase(fetchMyOrders.pending, state => {
        state.loading = true;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.myOrders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* CANCEL ORDER (USES _id) */
      .addCase(cancelMyOrder.fulfilled, (state, action) => {
        state.myOrders = state.myOrders.map(o =>
          o._id === action.payload
            ? { ...o, status: "CANCELLED" }
            : o
        );
      });
  }
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;