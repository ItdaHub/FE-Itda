// 최적화된 이미지
// import Image from "next/image";
import clsx from "clsx";
import { LoginPageStyled } from "./styled";
import naver from "@/assets/images/sns_naver.svg";
import kakao from "@/assets/images/sns_kakao.svg";
import google from "@/assets/images/sns_google.svg";
import { useState } from "react";

const LoginPage = () => {
  // 비밀번호 토글 버튼
  const [toggle, setToggle] = useState(true);
  // 로그인 상태유지
  const [loginStay, setLoginStay] = useState(false);

  return (
    <LoginPageStyled className={clsx("login-wrap")}>
      <div className="login-box">
        <h3 className="login-title">로그인</h3>
        <form className="login-form">
          {/* 아이디 */}
          <div>
            <input
              className="login-id"
              type="email"
              name="email"
              placeholder="아이디"
              required
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <input
              className="login-pw"
              type={toggle ? "password" : "text"}
              name="password"
              placeholder="비밀번호"
              required
            />

            {/* 토글 버튼 */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setToggle(!toggle);
              }}
            >
              토글버튼
            </button>
          </div>

          {/* 로그인 상태 유지 */}
          <div className="login-stay">
            <input
              type="checkbox"
              checked={loginStay}
              onChange={() => {
                setLoginStay(!loginStay);
              }}
            />
            <span
              onClick={() => {
                setLoginStay(!loginStay);
              }}
            >
              로그인 상태유지
            </span>
          </div>

          {/* 로그인 버튼 */}
          <button className="login-btn">로그인</button>
        </form>

        {/* Id/pw찾기 및 회원가입 */}
        <div className="login-find">
          <span className="login-idFind">아이디 찾기</span>
          <span className="login-stick"></span>
          <span className="login-pwFind">비밀번호 찾기</span>
          <span className="login-stick"></span>
          <span className="login-signUp">회원가입</span>
        </div>

        {/* 소셜로그인 */}
        <div>
          <img className="login-logo" src={naver.src} alt="네이버 로그인" />
          <img className="login-logo" src={kakao.src} alt="카카오 로그인" />
          <img className="login-logo" src={google.src} alt="구글 로그인" />
        </div>
      </div>
    </LoginPageStyled>
  );
};

export default LoginPage;
