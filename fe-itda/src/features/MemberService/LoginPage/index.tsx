import clsx from "clsx";
import api from "@/utill/api";
import { LoginPageStyled } from "./styled";
import { useState } from "react";
import { useRouter } from "next/router";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

import naver from "@/assets/images/sns_naver.svg";
import kakao from "@/assets/images/sns_kakao.svg";
import google from "@/assets/images/sns_google.svg";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "@/features/auth/authSlice";
import { AppDispatch } from "../../../../store/store";
import axios from "axios";

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // 비밀번호 토글 버튼
  const [toggle, setToggle] = useState(true);
  // 로그인 상태유지
  const [loginStay, setLoginStay] = useState(false);
  // 아이디
  const [email, setEmail] = useState("");
  // 비밀번호
  const [password, setPassword] = useState("");
  // 오류메시지지
  const [errorMessage, setErrorMessage] = useState("");

  // 로그인 상태유지 토글
  const handleLoginStayChange = () => {
    setLoginStay(!loginStay);
  };

  const handleLoginSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // 입력 검증(아이디)
    if (!email) {
      setErrorMessage("아이디를 입력해주세요");
      return;
    }

    // 입력 검증(비밀번호)
    if (!password) {
      setErrorMessage("비밀번호를 입력해주세요");
      return;
    }

    try {
      // axios로 GET 요청(입력한 아이디, 비밀번호와 일치하는지 확인)
      const response = await api.get("/auth/login", {
        params: {
          email,
          password,
          loginStay,
        },
      });

      // 성공적으로 로그인했을 경우
      if (response.data.success) {
        setErrorMessage("");

        // 로그인 성공 후 메인홈으로 이동
        router.push("/main");
      } else {
        // 아이디 또는 비밀번호가 틀린 경우
        setErrorMessage("아이디 또는 비밀번호를 확인해주세요");
      }
    } catch (error) {
      // 요청 오류
      setErrorMessage(`${error} : 서버 오류가 발생했습니다`);
    }
  };

  // 네이버 소셜 로그인
  const naverLogin = () => {
    window.location.href = "http://localhost:5001/auth/naver";
  };

  // 카카오 소셜 로그인
  const kakalogin = async () => {
    try {
      const response = await axios.get("http://localhost:5001/auth/kakao");

      if (response.data.token) {
        // 1. 토큰을 쿠키에 저장 (만료 7일)
        Cookies.set("access_token", response.data.token, { expires: 7 });

        // 2. Redux에 사용자 정보 저장
        dispatch(setUser(response.data.user));

        // 3. 메인 페이지로 이동
        router.push("/main");
      }
    } catch (error) {
      console.error("카카오 로그인 실패:", error);
    }
  };

  // 구글 소셜 로그인
  const googlelogin = () => {
    window.location.href = "/auth/google";
  };

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* 비밀번호 */}
          <div className="login-pwBox">
            <input
              className="login-pw"
              type={toggle ? "password" : "text"}
              name="password"
              placeholder="비밀번호"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* 토글 버튼 */}
            {toggle ? (
              <EyeInvisibleOutlined
                className="login-toggleBtn"
                onClick={(e) => {
                  e.preventDefault();
                  setToggle(!toggle);
                }}
              />
            ) : (
              <EyeOutlined
                className="login-toggleBtn"
                onClick={(e) => {
                  e.preventDefault();
                  setToggle(!toggle);
                }}
              />
            )}
          </div>

          {/* 로그인 상태 유지 */}
          <div className="login-stay">
            <input
              type="checkbox"
              checked={loginStay}
              onChange={handleLoginStayChange}
            />
            <span onClick={handleLoginStayChange}>로그인 상태유지</span>
          </div>

          {/* 오류메시지 */}
          {errorMessage && (
            <div className="login-errorMessage">{errorMessage}</div>
          )}

          {/* 로그인 버튼 */}
          <button className="login-btn" onClick={handleLoginSubmit}>
            로그인
          </button>
        </form>

        {/* Id/pw찾기 및 회원가입 */}
        <div className="login-find">
          <span
            className="login-idFind"
            onClick={() => {
              router.push("/findid");
            }}
          >
            아이디 찾기
          </span>
          <span className="login-stick"></span>
          <span
            className="login-pwFind"
            onClick={() => {
              router.push("/findpw");
            }}
          >
            비밀번호 찾기
          </span>
          <span className="login-stick"></span>
          <span
            className="login-signUp"
            onClick={() => {
              router.push("/agree");
            }}
          >
            회원가입
          </span>
        </div>

        {/* 소셜로그인 */}
        <p className="login-tit">
          <span className="login-titText">소셜 계정으로 간편 로그인</span>
        </p>

        <div>
          <img
            onClick={() => naverLogin()}
            className="login-logo"
            src={naver.src}
            alt="네이버 로그인"
          />
          <img
            onClick={() => kakalogin()}
            className="login-logo"
            src={kakao.src}
            alt="카카오 로그인"
          />
          <img
            onClick={() => googlelogin()}
            className="login-logo"
            src={google.src}
            alt="구글 로그인"
          />
        </div>
      </div>
    </LoginPageStyled>
  );
};

export default LoginPage;
