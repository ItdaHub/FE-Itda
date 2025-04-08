// import { createSlice } from "@reduxjs/toolkit";
// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: null,
//   },
//   reducers: {
//     setUser(state, action) {
//       state.user = action.payload;
//     },
//     signOut(state) {
//       state.user = null;
//     },
//   },
// });
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 여기서 바로 User 타입 선언
interface User {
  email: string;
  nickname: string;
  name: string;
  birthYear: string;
  phone: string;
  profile_img?: string | null;
}

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
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
