import { useEffect } from "react";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUser } from "@/features/auth/authSlice";
import api from "@/utill/api";
const AuthHandler = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user); // Redux에서 유저 정보 가져오기
  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        try {
          const response = await api.get("/auth/login");
          console.log("로그인된 유저 정보:", response.data);
          dispatch(setUser(response.data.user));
        } catch (error: any) {
          if (error.response?.status === 401) {
            console.log(":x: 로그인되지 않은 상태입니다.");
            // 로그인 상태 아님 -> 아무 처리 안 해도 OK
          } else {
            console.error("유저 정보 가져오기 실패:", error);
          }
        }
      }
    };
    fetchUser();
  }, [dispatch, user]);
  return null;
};
export default AuthHandler;
