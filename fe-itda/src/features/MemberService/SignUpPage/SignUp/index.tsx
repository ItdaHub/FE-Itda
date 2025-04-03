import clsx from "clsx";
import { SignUpStyled } from "./styled";
import { useMemo, useState } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
// 비밀번호, 비밀번호 확인 유효성 검사
import { validationPass, validationPassCheck } from "@/utill/vali";
import api from "@/utill/api";

const SignUp = () => {
  const dispatch = useDispatch();

  // 비밀번호 토글 버튼
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(true);

  // 중복 검사 상태를 관리할 state
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isNickName, setIsNickName] = useState<boolean>(false);
  const [isPhoneNumber, setIsPhoneNumber] = useState<boolean>(false);

  // 중복확인 에러 메시지 상태 관리
  const [errorMessage, setErrorMessage] = useState("");
  const [emailSameError, setEmailSameError] = useState("");
  const [nickNameSameError, setnickNameSameError] = useState("");
  const [phoneNumberSameError, setPhoneNumberSameError] = useState("");

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
  const checkEmail = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!email) {
      setEmailError("아이디를 입력해주세요.");
      return;
    }
    try {
      console.log("전송할 이메일:", email); // 요청 전에 콘솔 출력

      // 입력한 아이디와 일치하는 데이터가 있는지 확인 요청
      const response = await api.post("/auth/emailCheck", { email });

      console.log("서버 응답:", response.data); // 응답 로그 확인
      if (response.data.message) {
        setIsEmail(true);
        setErrorMessage("이미 사용된 이메일입니다.");
      } else {
        setIsEmail(false);
        setErrorMessage("");
      }
    } catch (error) {
      console.error("이메일 중복 확인 오류", error);
      setErrorMessage("이메일 중복 확인 오류 발생");
    }
  };

  // 닉네임 중복 검사 함수
  const checkNickName = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    //   // 실제 요청 대신 더미 응답을 사용
    //   setTimeout(() => {
    //     if (nickName === "testuser") {
    //       console.log("이미 사용된 닉네임입니다.");
    //     } else {
    //       console.log("사용 가능한 닉네임입니다.");
    //     }
    //   }, 500); // 0.5초 후에 응답이 온 것처럼 처리
    // };
    if (!nickName) {
      setNickNameError("닉네임을 입력해주세요.");
      return;
    }

    try {
      console.log("닉네임 중복 확인 요청 값:", nickName);
      const response = await api.post("/auth/nicknameCheck", { nickName });
      if (response.data.message) {
        setIsNickName(true);
        setnickNameSameError("이미 사용된 닉네임입니다.");
      } else {
        setIsNickName(false);
        setnickNameSameError("");
      }
    } catch (error) {
      console.error("닉네임 중복 확인 오류", error);
      setnickNameSameError("닉네임 중복 확인 오류 발생");
    } finally {
      setDisabled(false); // 요청 완료 후 버튼 활성화
    }
  };

  // 이메일 유효성 검사
  const validationEmail = (email: string) => {
    if (!email) {
      setEmailError("이메일을 입력해주세요");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("유효한 이메일이 아닙니다.");
    } else setEmailError("");
  };

  // 닉네임 유효성 검사
  const validationNickName = (nickName: string) => {
    if (!nickName) {
      setNickNameError("닉네임을 입력해주세요.");
    } else if (nickName.length < 2) {
      setNickNameError("닉네임은 최소 2자 이상이어야 합니다.");
    } else if (nickName.length > 8) {
      setNickNameError("닉네임은 최대 8자 까지 가능합니다.");
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
    const phoneRegex = /^01[0-9]-\d{4}-\d{4}$/; // 010-1234-5678 형식
    if (!phoneNumber) {
      setPhoneNumberError("휴대폰번호를 입력해주세요.");
    } else if (!phoneRegex.test(phoneNumber)) {
      setPhoneNumberError(
        "올바른 휴대폰번호를 입력해주세요. (예: 010-1234-5678)"
      );
    } else {
      setPhoneNumberError("");
    }
  };
  // // 전화번호 중복 검사 함수
  // const checkPhoneNumber = async (e: { preventDefault: () => void }) => {
  //   e.preventDefault();

  //   if (!phoneNumber) {
  //     setPhoneNumberSameError("전화번호를 입력해주세요.");
  //     return;
  //   }

  //   try {
  //     console.log("전화번호중복 확인 요청 값:", phoneNumber);
  //     const response = await api.post("/auth/phoneNumberCheck", {
  //       phoneNumber,
  //     });
  //     if (response.data.message) {
  //       setIsPhoneNumber(true);
  //       setPhoneNumberSameError("이미 사용중인 번호입니다.");
  //     } else {
  //       setIsPhoneNumber(false);
  //       setPhoneNumberSameError("");
  //     }
  //   } catch (error) {
  //     console.error("휴대폰 중복 확인 오류", error);
  //     setPhoneNumberSameError("휴대폰 중복 확인 오류 발생");
  //   } finally {
  //     setDisabled(false); // 요청 완료 후 버튼 활성화
  //   }
  // };

  // 회원가입 버튼 클릭 시 데이터베이스에 등록 요청
  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // 폼 기본 동작 방지

    try {
      const response = await api.post("/auth/signup", {
        email,
        password,
        nickName,
        name,
        birthYear,
        phoneNumber,
      });

      console.log("회원가입 성공:", response.data);
      alert("회원가입이 완료되었습니다.");
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    } finally {
      setDisabled(false); // 요청 완료 후 버튼 활성화
    }
  };

  const isValid = useMemo(() => {
    return (
      email &&
      password &&
      passwordCheck &&
      nickName &&
      name &&
      birthYear &&
      phoneNumber &&
      !emailError &&
      !passError &&
      !passCheckError &&
      !nickNameError &&
      !nameError &&
      !birthYearError &&
      !phoneNumberError &&
      !isEmail &&
      !isNickName &&
      isPhoneNumber
    );
  }, [
    email,
    password,
    passwordCheck,
    nickName,
    name,
    birthYear,
    phoneNumber,
    emailError,
    passError,
    passCheckError,
    nickNameError,
    nameError,
    birthYearError,
    phoneNumberError,
    isEmail,
    isNickName,
    isPhoneNumber,
  ]);

  return (
    <SignUpStyled className={clsx("signup-page")}>
      <div className="signup-box">
        <h2>회원가입</h2>
        <form className="signup-form" onSubmit={onSubmit}>
          {/* 아이디 */}
          <div className="input-box">
            <div className="signup-title">아이디</div>
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
            <button className="same-id-check-btn" onClick={checkEmail}>
              중복확인
            </button>
          </div>

          {/* 비밀번호 */}
          <div className="input-box signup-pwBox">
            <div className="signup-title">비밀번호</div>
            <input
              className="signup-pw"
              type={toggle1 ? "password" : "text"}
              placeholder="비밀번호"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validationPass(e.target.value, setPassError);
              }}
            />

            {/* 토글 버튼 */}
            {toggle1 ? (
              <EyeInvisibleOutlined
                className="signup-toggleBtn"
                onClick={(e) => {
                  e.preventDefault();
                  setToggle1(!toggle1);
                }}
              />
            ) : (
              <EyeOutlined
                className="signup-toggleBtn"
                onClick={(e) => {
                  e.preventDefault();
                  setToggle1(!toggle1);
                }}
              />
            )}

            <p className="error-message">{passError}</p>
          </div>

          {/* 비밀번호 확인 */}
          <div className="input-box signup-pwBox">
            <div className="signup-title">비밀번호 확인</div>
            <input
              className="signup-pw-check"
              type={toggle2 ? "password" : "text"}
              placeholder="비밀번호 확인"
              value={passwordCheck}
              onChange={(e) => {
                setPasswordCheck(e.target.value);
                validationPassCheck(
                  e.target.value,
                  password,
                  setPassCheckError
                );
              }}
            />
            {/* 토글 버튼 */}
            {toggle2 ? (
              <EyeInvisibleOutlined
                className="signup-toggleBtn"
                onClick={(e) => {
                  e.preventDefault();
                  setToggle2(!toggle2);
                }}
              />
            ) : (
              <EyeOutlined
                className="signup-toggleBtn"
                onClick={(e) => {
                  e.preventDefault();
                  setToggle2(!toggle2);
                }}
              />
            )}

            <p className="error-message">{passCheckError}</p>
          </div>

          {/* 닉네임 */}
          <div className="input-box">
            <div className="signup-title">닉네임</div>
            <input
              className="signup-nick"
              type="text"
              placeholder="닉네임"
              value={nickName}
              onChange={(e) => {
                setNickName(e.target.value);
                validationNickName(e.target.value);
              }}
              maxLength={8}
            />

            <p className="error-message">{nickNameError}</p>

            {isNickName && <p>{nickNameSameError}</p>}
            <button className="same-nick-check-btn" onClick={checkNickName}>
              중복확인
            </button>
          </div>

          {/* 이름 */}
          <div className="input-box">
            <div className="signup-title">이름</div>
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
          <div className="input-box">
            <div className="signup-title">출생년도</div>
            <input
              className="signup-year"
              type="number"
              placeholder="출생년도"
              value={birthYear}
              onChange={(e) => {
                setBirthYear(e.target.value);
                validationBirthYear(e.target.value);
              }}
              maxLength={4}
            />

            <p className="error-message">{birthYearError}</p>
          </div>

          {/* 휴대폰번호 */}
          <div className="input-box">
            <div className="signup-title">휴대폰번호</div>
            <input
              className="signup-phone"
              type="tel"
              placeholder="휴대폰번호"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                validationPhoneNumber(e.target.value);
              }}
              maxLength={13}
            />

            <p className="error-message">{phoneNumberError}</p>

            {/* {isPhoneNumber && <p>{phoneNumberSameError}</p>}
            <button className="same-nick-check-btn" onClick={checkPhoneNumber}>
              중복확인
            </button> */}
          </div>

          {/* 회원가입 버튼 */}
          <div>
            <button
              className="signup-btn"
              type="submit"
              disabled={!isValid}
              // disabled={disabled}
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
