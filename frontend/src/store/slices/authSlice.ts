import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../interfaces/auth";
import { TOKEN_NAME } from "../../services/authService";

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem(TOKEN_NAME),
  token: localStorage.getItem(TOKEN_NAME),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem(TOKEN_NAME);
      state.isAuthenticated = false;
      state.token = null;
    },
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
      localStorage.setItem(TOKEN_NAME, action.payload);
    }
  },
});

export const { logout, login } = authSlice.actions;
export default authSlice.reducer;
