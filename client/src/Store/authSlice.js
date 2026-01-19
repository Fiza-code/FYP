// src/Store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const savedAuth = JSON.parse(localStorage.getItem("auth")) || {
  isLoggedIn: false,
  user: null,
  token: null,
};

const initialState = {
  isLoggedIn: savedAuth.isLoggedIn,
  user: savedAuth.user,
  token: savedAuth.token,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("auth", JSON.stringify({ isLoggedIn: true, user: state.user, token: state.token }));
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("auth");
    },
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("auth", JSON.stringify({ isLoggedIn: state.isLoggedIn, user: state.user, token: state.token }));
    },
  },
});

export const { loginSuccess, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
