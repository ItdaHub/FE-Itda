import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    signOut(state) {
      state.user = null;
    },
  },
});
export const { setUser, signOut } = authSlice.actions;
export const logout = signOut;
export default authSlice.reducer;
