import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";

/* ================= THUNKS ================= */

// SIGNUP
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/signup", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data));

      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Signup failed"
      );
    }
  }
);

// LOGIN
export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/login", formData);
      console.log("FULL LOGIN RESPONSE:", res.data);
      console.log("TOKEN:", res.data.token);
      console.log("USER:", res.data.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data));

      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

// LOGOUT
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }
);

/* ================= INITIAL STATE ================= */

const storedUser = localStorage.getItem("user");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser ? JSON.parse(storedUser) : null,
    isAuthenticated: !!localStorage.getItem("token"),
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder

      /* LOGIN */
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      /* SIGNUP */
      .addCase(signupUser.pending, state => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* LOGOUT */
      .addCase(logoutUser.fulfilled, state => {
        state.user = null;
        state.isAuthenticated = false;
      });
  }
});

export default authSlice.reducer;