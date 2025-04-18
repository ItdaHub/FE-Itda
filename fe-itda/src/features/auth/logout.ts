import api from "@/utill/api";
import { signOut } from "./authSlice";
import { AppDispatch } from "@/store/store";
export const logoutUser = () => async (dispatch: AppDispatch) => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    console.error("로그아웃 에러:", error);
  } finally {
    dispatch(signOut());
  }
};
