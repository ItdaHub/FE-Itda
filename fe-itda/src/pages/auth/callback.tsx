import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "@/features/auth/authSlice";
const SocialLoginCallback = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    const { user } = router.query;
    if (user) {
      try {
        const decoded = decodeURIComponent(user as string);
        const parsed = JSON.parse(decoded);
        console.log(":돋보기: 디코딩된 user 문자열:", decoded);
        console.log(":흰색_확인_표시: 파싱된 전체 응답:", parsed);
        // :흰색_확인_표시: accessToken, user 분리
        const { accessToken, user: userInfo } = parsed;
        // 토큰 저장
        Cookies.set("accessToken", accessToken, { expires: 1 });
        console.log("1111111111111111111", userInfo);
        // Redux 저장
        dispatch(setUser(userInfo));
        // 이동
        router.replace("/main");
      } catch (error) {
        console.error(":x: 유저 정보 파싱 실패:", error);
        router.replace("/login");
      }
    } else {
      console.log(":느낌표: 아직 user 정보가 없음:", router.query);
    }
  }, [router.query]);
  return <p>로그인 처리 중입니다...</p>;
};
export default SocialLoginCallback;
