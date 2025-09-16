import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {};
      state.isLoggedIn = false;
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
