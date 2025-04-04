// import { useEffect } from "react";
// import { useRouter } from "next/router";
// import Cookies from "js-cookie";
// import { useDispatch } from "react-redux";
// import { setUser } from "../../../features/auth/authSlice"; // Redux 액션 가져오기
// import api from "@/utill/api"; // Axios 인스턴스
// const KakaoCallback = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   useEffect(() => {
//     const handleKakaoCallback = async () => {
//       try {
//         // :일: URL에서 쿼리 파라미터 (예: ?token=xxxxx) 가져오기
//         const token = new URLSearchParams(window.location.search).get("token");
//         if (token) {
//           // :둘: 토큰 저장 (7일 유지)
//           Cookies.set("access_token", token, { expires: 7 });
//           // :셋: 사용자 정보 가져오기
//           const response = await api.get("/auth/login", {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           // :넷: Redux에 사용자 정보 저장
//           dispatch(setUser(response.data.user));
//           // :다섯: 메인 페이지로 이동
//           router.push("/main");
//         }
//       } catch (error) {
//         console.error("카카오 로그인 처리 실패:", error);
//       }
//     };
//     handleKakaoCallback();
//   }, [router, dispatch]);
//   return <p>로그인 처리 중...</p>;
// };
// export default KakaoCallback;

import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../../features/auth/authSlice"; // Redux에 저장한다고 가정
export default function KakaoCallback() {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    const handleLogin = async () => {
      const token = router.query.token as string;
      if (token) {
        try {
          // :흰색_확인_표시: JWT 토큰을 백엔드로 보내서 유저 정보 가져오기
          const res = await axios.get("http://localhost:5001/auth/login", {
            headers: { Authorization: `Bearer ${token}` },
          });
          // :흰색_확인_표시: Redux에 유저 정보 저장 (필요시)
          dispatch(setUser(res.data));
          // :흰색_확인_표시: 홈 또는 대시보드로 이동
          router.push("/");
        } catch (error) {
          console.error("유저 정보 가져오기 실패:", error);
          router.push("/login"); // 로그인 페이지로 리디렉트
        }
      }
    };
    handleLogin();
  }, [router]);
  return <div>카카오 로그인 처리 중...</div>;
}
