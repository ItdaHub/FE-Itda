import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/features/auth/authSlice";
const AuthCallbackPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    axios
      .get("http://localhost:5001/auth/login", { withCredentials: true })
      .then((res) => {
        dispatch(setUser(res.data.user));
        router.push("/");
      })
      .catch((err) => {
        console.error("유저 정보 불러오기 실패", err);
        router.push("/login");
      });
  }, []);
  return <div>로그인 중입니다...</div>;
};
export default AuthCallbackPage;
