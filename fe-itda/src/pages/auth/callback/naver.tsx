import { useSocialLogin } from "../../../hooks/useSocialLogin";

export default function NaverCallback() {
  useSocialLogin("naver");

  return <div>네이버 로그인 처리 중...</div>;
}
