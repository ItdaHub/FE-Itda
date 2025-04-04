import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import api from "@/utill/api";

export const useSocialLogin = (provider: "google" | "naver" | "kakao") => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const token = router.query.token as string;

      if (token) {
        try {
          // 1. 토큰을 쿠키에 저장
          Cookies.set("access_token", token, { expires: 7 });

          // 2. 유저 정보 가져오기
          const response = await api.get("/auth/login", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // 3. Redux에 저장
          dispatch(setUser(response.data.user));

          // 4. 메인 페이지 이동
          router.push("/main");
        } catch (err) {
          console.error("카카오 로그인 처리 실패:", err);
        }
      }
    };

    fetchUser();
  }, [router.query.token]);
};
