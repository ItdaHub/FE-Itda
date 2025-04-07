import { useEffect } from "react";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUser } from "@/features/auth/authSlice";
import api from "@/utill/api";

const AuthHandler = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user); // Redux에서 유저 정보 가져오기

  useEffect(() => {
    console.log("✅ AuthHandler 실행됨");
    const fetchUser = async () => {
      const token = Cookies.get("accessToken");
      console.log("⏳ 토큰:", token);
      console.log("⏳ Redux user:", user);

      if (token && !user) {
        // Redux에 유저 정보가 없을 때만 요청
        try {
          const response = await api.get("/auth/login", {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("✅ 찍혀라", response.data);
          dispatch(setUser(response.data.user)); // Redux에 저장
        } catch (error) {
          console.error("유저 정보 가져오기 실패:", error);
        }
      }
    };

    fetchUser();
  }, [dispatch, user]); // user가 없을 때만 실행

  return null;
};

export default AuthHandler;
