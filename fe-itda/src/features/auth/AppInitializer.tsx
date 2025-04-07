import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { setUser } from "@/features/auth/authSlice"; // Redux 액션

const AppInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get("accessToken"); // 쿠키에서 토큰 가져옴

      if (token) {
        try {
          const response = await axios.get("http://localhost:5001/auth/login", {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log(response.data.user);
          dispatch(setUser(response.data.user)); // Redux에 유저 정보 저장
        } catch (error) {
          console.error("유저 정보 가져오기 실패:", error);
        }
      }
    };

    fetchUser();
  }, []);

  return null; // 아무것도 렌더링하지 않음
};

export default AppInitializer;
