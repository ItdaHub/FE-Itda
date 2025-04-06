import clsx from "clsx";
import { SignUpStyled } from "./styled";
import { useMemo, useState } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
// 비밀번호, 비밀번호 확인 유효성 검사
import { validationPass, validationPassCheck } from "@/utill/vali";
import api from "@/utill/api";
import { useRouter } from "next/router";

const SignUp = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // 비밀번호 토글 버튼
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(true);

  // 중복 검사 상태를 관리할 state
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isNickName, setIsNickName] = useState<boolean>(false);

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

  // 중복 검사 상태 메세지
  const [emailSuccess, setEmailSuccess] = useState("");
  const [nickNameSuccess, setNickNameSuccess] = useState("");

  // 회원가입 타입
  const [type, setType] = useState<"LOCAL" | "KAKAO" | "NAVER" | "GOOGLE">(
    "LOCAL"
  );

  // 이메일 중복 검사 함수
  const checkEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    validationEmail(email);
    if (emailError || !email) return;
    setDisabled(true);
    try {
      const res = await api.post("/auth/emailCheck", { email });
      const msg = res.data.message;
      if (msg) {
        setIsEmail(true);
        setEmailError("");
        setEmailSuccess("사용 가능한 이메일입니다.");
      } else {
        setIsEmail(false);
        setEmailError("이미 사용된 이메일입니다.");
        setEmailSuccess("");
      }
    } catch (err) {
      setEmailError("이메일 중복 확인 오류 발생");
      setEmailSuccess("");
    } finally {
      setDisabled(false);
    }
  };

  // 닉네임 중복 검사 함수
  const checkNickName = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    validationNickName(nickName);
    if (nickNameError || !nickName) return;
    setDisabled(true);
    try {
      const res = await api.post("/auth/nicknameCheck", { nickName });
      const msg = res.data.message;
      if (msg) {
        setIsNickName(true);
        setNickNameError("");
        setNickNameSuccess("사용 가능한 닉네임입니다.");
      } else {
        setIsNickName(false);
        setNickNameError("이미 사용된 닉네임입니다.");
        setNickNameSuccess("");
      }
    } catch (err) {
      setNickNameError("닉네임 중복 확인 오류 발생");
      setNickNameSuccess("");
    } finally {
      setDisabled(false);
    }
  };

  // 이메일 유효성 검사
  const validationEmail = (email: string) => {
    const valid = /\S+@\S+\.\S+/.test(email);
    setEmailError(
      !email
        ? "이메일을 입력해주세요"
        : !valid
        ? "유효한 이메일이 아닙니다."
        : ""
    );
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
    setNameError(!name ? "이름을 입력해주세요." : "");
  };

  // 생일 유효성 검사
  const validationBirthYear = (birthYear: string) => {
    const year = parseInt(birthYear);
    if (!birthYear) {
      setBirthYearError("출생년도를 입력해주세요.");
    } else if (!/^\d{4}$/.test(birthYear)) {
      setBirthYearError("출생년도는 4자리 숫자여야 합니다.");
    } else if (year < 1900 || year > new Date().getFullYear()) {
      setBirthYearError("유효한 연도가 아닙니다.");
    } else {
      setBirthYearError("");
    }
  };

  // 휴대폰 유효성 검사
  const validationPhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^01[0-9]-\d{4}-\d{4}$/;
    if (!phoneNumber) setPhoneNumberError("휴대폰번호를 입력해주세요.");
    else if (!phoneRegex.test(phoneNumber))
      setPhoneNumberError(
        "올바른 휴대폰번호를 입력해주세요. (예: 010-1234-5678)"
      );
    else setPhoneNumberError("");
  };
  const formatPhoneNumber = (value: string) => {
    const onlyNums = value.replace(/[^\d]/g, "");
    if (onlyNums.length <= 3) return onlyNums;
    if (onlyNums.length <= 7)
      return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(
      7,
      11
    )}`;
  };

  // 회원가입 버튼 클릭 시 데이터베이스에 등록 요청
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 폼 기본 동작 방지
    setDisabled(true);
    try {
      console.log({
        email,
        password,
        nickname: nickName,
        name,
        age: birthYear,
        phone: phoneNumber,
        type: "LOCAL",
      });

      const res = await api.post("/auth/register", {
        email,
        password,
        nickname: nickName,
        name,
        age: birthYear,
        phone: phoneNumber,
        type: type.toLowerCase(),
      });

      alert("회원가입이 완료되었습니다.");
      router.push("/login"); // 회원가입 후 로그인으로 이동
    } catch (err: any) {
      console.log(err.response?.data);
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
      isEmail &&
      isNickName
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
              maxLength={20}
            />
            {/* <p className={`error-message red-text`}>{emailError}</p>
            <p className={`error-message green-text`}>{emailSuccess}</p> */}
            <p
              className={`error-message ${
                emailError ? "red-text" : "green-text"
              }`}
            >
              {emailError || emailSuccess}
            </p>

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

            {/* <p className={`error-message red-text`}>{nickNameError}</p>
            <p className={`error-message green-text`}>{nickNameSuccess}</p> */}

            <p
              className={`error-message ${
                nickNameError ? "red-text" : "green-text"
              }`}
            >
              {nickNameError || nickNameSuccess}
            </p>

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
              type="text"
              placeholder="출생년도"
              value={birthYear}
              onChange={(e) => {
                const onlyNums = e.target.value
                  .replace(/[^\d]/g, "")
                  .slice(0, 4);
                setBirthYear(onlyNums);
                validationBirthYear(onlyNums);
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
                const formatted = formatPhoneNumber(e.target.value);
                setPhoneNumber(formatted);
                validationPhoneNumber(formatted);
              }}
              maxLength={13}
            />

            <p className="error-message">{phoneNumberError}</p>
          </div>

          {/* 회원가입 버튼 */}
          <div>
            <button
              className="signup-btn"
              type="submit"
              disabled={!isValid || disabled}
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
