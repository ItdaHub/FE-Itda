import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  email: string;
  nickname: string;
  name: string;
  type: "local" | "kakao" | "naver";
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
