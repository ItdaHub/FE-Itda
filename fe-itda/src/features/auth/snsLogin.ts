import { signIn } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/userSlice";

export const snsLogin = async (provider: string) => {
  const res = await signIn(provider, { redirect: false });

  if (res?.error) {
    console.error("SNS 로그인 실패", res.error);
    return;
  }

  // 로그인 성공 후, 세션에서 사용자 정보 가져오기
  const session = await fetch("/api/auth/session").then((res) => res.json());

  if (!session?.user) {
    console.error("세션에서 사용자 정보를 가져올 수 없습니다.");
    return;
  }

  const { email, name, image } = session.user;
  const dispatch = useDispatch();
  dispatch(setUser({ email, name, image }));
};
