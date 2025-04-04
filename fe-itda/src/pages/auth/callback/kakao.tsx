import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "../../../features/auth/authSlice"; // Redux 액션 가져오기
import api from "@/utill/api"; // Axios 인스턴스
const KakaoCallback = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    const handleKakaoCallback = async () => {
      try {
        // :일: URL에서 쿼리 파라미터 (예: ?token=xxxxx) 가져오기
        const token = new URLSearchParams(window.location.search).get("token");
        if (token) {
          // :둘: 토큰 저장 (7일 유지)
          Cookies.set("access_token", token, { expires: 7 });
          // :셋: 사용자 정보 가져오기
          const response = await api.get("/auth/login", {
            headers: { Authorization: `Bearer ${token}` },
          });
          // :넷: Redux에 사용자 정보 저장
          dispatch(setUser(response.data.user));
          // :다섯: 메인 페이지로 이동
          router.push("/main");
        }
      } catch (error) {
        console.error("카카오 로그인 처리 실패:", error);
      }
    };
    handleKakaoCallback();
  }, [router, dispatch]);
  return <p>로그인 처리 중...</p>;
};
export default KakaoCallback;
