import { useSocialLogin } from "../../../hooks/useSocialLogin";

export default function GoogleCallback() {
  useSocialLogin("google");

  return <div>구글 로그인 처리 중...</div>;
}
