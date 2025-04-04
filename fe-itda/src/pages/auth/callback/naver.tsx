import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../../features/auth/authSlice"; // Redux에 저장한다고 가정
export default function NaverCallback() {
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
  return <div>네이버 로그인 처리 중...</div>;
}
