import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axiosInstance";

export const addToCart = createAsyncThunk(
  "cart/add",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/usercart/newcart", data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchCart = createAsyncThunk(
  "cart/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/usercart/fetch");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/update",
  async ({ productId, action }, { rejectWithValue }) => {
    try {
      const res = await axios.put("/usercart/update", {
        productId,
        action
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteCart = createAsyncThunk(
  "cart/delete",
  async ({itemId}, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`/usercart/delete/${itemId}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: { items: [] },
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(updateCart.rejected, (state) => {
        // keep old cart, do NOT overwrite with error object
      })
      .addCase(deleteCart.rejected, (state) => {
        // keep old cart
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  }
});

export default cartSlice.reducer;