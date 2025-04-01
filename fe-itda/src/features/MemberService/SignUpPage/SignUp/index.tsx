import clsx from "clsx";
import { SignUpStyled } from "./styled";
import { useState } from "react";
import axios from "axios";
import Agree from "../Agree";

const SignUp = () => {
  const [ShowSignUp, setShowSignUp] = useState(false);

  const handleAgreeClick = () => {
    setShowSignUp(true); // agree-ok 버튼 클릭 시 SignUp 폼 표시
  };

  // 중복 검사 상태를 관리할 state
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isNickName, setIsNickName] = useState<boolean>(false);

  // 중복확인 에러 메시지 상태 관리
  const [errorMessage, setErrorMessage] = useState("");

  // 각 필드의 입력 값
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickName, setNickName] = useState("");
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // 각 필드의 유효성 검사 상태
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [passCheckError, setPassCheckError] = useState("");
  const [nickNameError, setNickNameError] = useState("");
  const [nameError, setNameError] = useState("");
  const [birthYearError, setBirthYearError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  // 비활성화 / 활성화 상태 관리
  const [disabled, setDisabled] = useState(false);

  // 이메일 중복 검사 함수
  const checkEmail = async (email: string) => {
    // 실제 요청 대신 더미 응답을 사용
    setTimeout(() => {
      if (email === "testuser") {
      } else if (email === "") {
      } else {
      }
    }, 500); // 0.5초 후에 응답이 온 것처럼 처리
  };
  //   try {
  //     console.log("전송할 이메일:", email); // 요청 전에 콘솔 출력

  //     const response = await axios.post("/api/check-email");
  //     if (response.data.isDuplicate) {
  //       setIsEmail(true);
  //       setErrorMessage("이미 사용된 이메일입니다.");
  //     } else {
  //       setIsEmail(false);
  //       setErrorMessage("");
  //     }
  //   } catch (error) {
  //     console.error("이메일 중복 확인 오류", error);
  //     setErrorMessage("이메일 중복 확인 오류 발생");
  //   }
  // };

  // 닉네임 중복 검사 함수
  const checkNickName = async (nickName: string) => {
    console.log("닉네임 중복 확인 요청 값:", nickName);

    // 실제 요청 대신 더미 응답을 사용
    setTimeout(() => {
      if (nickName === "testuser") {
        console.log("이미 사용된 닉네임입니다.");
      } else {
        console.log("사용 가능한 닉네임입니다.");
      }
    }, 500); // 0.5초 후에 응답이 온 것처럼 처리
  };
  //   try {
  //     const response = await axios.post("/api/check-nickname");
  //     if (response.data.isDuplicate) {
  //       setIsNickName(true);
  //       setErrorMessage("이미 사용된 닉네임입니다.");
  //     } else {
  //       setIsNickName(false);
  //       setErrorMessage("");
  //     }
  //   } catch (error) {
  //     console.error("닉네임 중복 확인 오류", error);
  //     setErrorMessage("닉네임 중복 확인 오류 발생");
  //   }
  // };

  // 이메일 유효성 검사
  const validationEmail = (email: string) => {
    if (!email) {
      setEmailError("이메일을 입력해주세요");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("유효한 이메일이 아닙니다.");
    } else setEmailError("");
  };

  // 비밀번호 유효성 검사
  const validationPass = (password: string) => {
    if (!password) {
      setPassError("비밀번호를 입력해주세요");
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,16}$/.test(
        password
      )
    ) {
      setPassError(
        "비밀번호는 8~16자, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다."
      );
    } else setPassError("");
  };

  // 비밀번호 확인 유효성 검사
  const validationPassCheck = (passwordCheck: string) => {
    if (!passwordCheck) {
      setPassCheckError("비밀번호를 확인해주세요.");
    } else if (password !== passwordCheck) {
      setPassCheckError("비밀번호가 일치하지 않습니다.");
    } else setPassCheckError("");
  };

  // 닉네임 유효성 검사
  const validationNickName = (nickName: string) => {
    if (!nickName) {
      setNickNameError("닉네임을 입력해주세요.");
    } else if (nickName.length < 2) {
      setNickNameError("닉네임은 최소 2자 이상이어야 합니다.");
    } else if (nickName.length > 8) {
      setNickNameError("닉네임은 최대 8자 이상이어야 합니다.");
    } else setNickNameError("");
  };

  // 이름 유효성 검사
  const validationName = (name: string) => {
    if (!name) {
      setNameError("이름을 입력해주세요.");
    } else setNameError("");
  };

  // 생일 유효성 검사
  const validationBirthYear = (birthYear: string) => {
    if (!birthYear) {
      setBirthYearError("출생년도를 입력해주세요.");
    } else if (
      parseInt(birthYear) < 1900 ||
      parseInt(birthYear) > new Date().getFullYear()
    ) {
      setBirthYearError("유효한 연도가 아닙니다.");
    } else {
      setBirthYearError("");
    }
  };

  // 휴대폰 유효성 검사
  const validationPhoneNumber = (phoneNumber: string) => {
    if (!phoneNumber) {
      setPhoneNumberError("휴대폰번호를 입력해주세요.");
    }
  };

  // 폼 제출 이벤트 핸들러
  const onSubmit = () => {
    console.log("send");
  };

  return (
    <SignUpStyled className={clsx("signup-page")}>
      <div className="signup-box">
        <h2>회원가입</h2>
        <form className="signup-form" onSubmit={onSubmit}>
          {/* 아이디 */}
          <div className="input-box">
            <div>아이디</div>
            <input
              className="signup-id"
              type="text"
              placeholder="아이디"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validationEmail(e.target.value);
              }}
            />

            <p className="error-message">{emailError}</p>

            {isEmail && <p>{errorMessage}</p>}
            <button className="same-id-check-btn" onClick={(e) => {}}>
              중복확인
            </button>
          </div>

          {/* 비밀번호 */}
          <div>
            <div>비밀번호</div>
            <input
              className="signup-pw"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validationPass(e.target.value);
              }}
            />
            <p className="error-message">{passError}</p>
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <div>비밀번호 확인</div>
            <input
              className="signup-pw-check"
              type="password"
              placeholder="비밀번호 확인"
              value={passwordCheck}
              onChange={(e) => {
                setPasswordCheck(e.target.value);
                validationPassCheck(e.target.value);
              }}
            />

            <p className="error-message">{passCheckError}</p>
          </div>

          {/* 닉네임 */}
          <div className="input-box">
            <div>닉네임</div>
            <input
              className="signup-nick"
              type="text"
              placeholder="닉네임"
              value={nickName}
              onChange={(e) => {
                setNickName(e.target.value);
                validationNickName(e.target.value);
              }}
            />

            <p className="error-message">{nickNameError}</p>

            {isNickName && <p>{errorMessage}</p>}
            <button
              className="same-nick-check-btn"
              onClick={(e) => {
                e.preventDefault();
                checkNickName("nickName");
              }}
            >
              중복확인
            </button>
          </div>

          {/* 이름 */}
          <div>
            <div>이름</div>
            <input
              className="signup-name"
              type="text"
              id="name"
              placeholder="이름"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                validationName(e.target.value);
              }}
            />

            <p className="error-message">{nameError}</p>
          </div>

          {/* 출생년도 */}
          <div>
            <div>출생년도</div>
            <input
              className="signup-year"
              type="number"
              placeholder="출생년도"
              value={birthYear}
              onChange={(e) => {
                setBirthYear(e.target.value);
                validationBirthYear(e.target.value);
              }}
            />

            <p className="error-message">{birthYearError}</p>
          </div>

          {/* 휴대폰번호 */}
          <div>
            <div>휴대폰번호</div>
            <input
              className="signup-phone"
              type="tel"
              placeholder="휴대폰번호"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                validationPhoneNumber(e.target.value);
              }}
            />

            <p className="error-message">{phoneNumberError}</p>
          </div>

          {/* 회원가입 버튼 */}
          <div>
            <button
              className="signup-btn"
              type="submit"
              // disabled={!isValid}
              disabled={disabled}
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </SignUpStyled>
  );
};

export default SignUp;
