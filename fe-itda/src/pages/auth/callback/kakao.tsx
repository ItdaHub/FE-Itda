import { useSocialLogin } from "../../../hooks/useSocialLogin";

export default function NaverCallback() {
  useSocialLogin("kakao");

  return <div>카카오 로그인 처리 중...</div>;
}
