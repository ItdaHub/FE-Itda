import { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setUser } from "@/features/auth/authSlice";

const AuthHandler = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user); // Redux에서 유저 정보 가져오기

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get("access_token");

      if (token && !user) {
        // ✅ Redux에 유저 정보가 없을 때만 요청
        try {
          const response = await axios.get("http://localhost:5001/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch(setUser(response.data.user)); // ✅ Redux에 저장
        } catch (error) {
          console.error("유저 정보 가져오기 실패:", error);
        }
      }
    };

    fetchUser();
  }, [dispatch, user]); // ✅ user가 없을 때만 실행

  return null;
};

export default AuthHandler;
