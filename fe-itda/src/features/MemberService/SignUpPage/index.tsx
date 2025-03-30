import clsx from "clsx";
import { SignUpStyled } from "./styled";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";

const SignUpPage = () => {
  // 중복 검사 상태를 관리할 state
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isNickName, setIsNickName] = useState<boolean>(false);

  // 중복확인 에러 메시지 상태 관리
  const [errorMessage, setErrorMessage] = useState("");

  // 이메일 중복 검사 함수
  const checkEmail = async (email: string) => {
    console.log("이메일 중복 확인 요청 값:", email);

    // 실제 요청 대신 더미 응답을 사용
    setTimeout(() => {
      if (email === "testuser") {
        console.log("이미 사용된 이메일입니다.");
      } else if (email === "") {
        console.log("이메일을 입력해주세요.");
      } else {
        console.log("사용 가능한 이메일입니다.");
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

  // 입력 값 검증을 위한 스키마 정의
  const schema = z
    .object({
      email: z
        .string()
        .min(1, "이메일을 입력해주세요.")
        .email("올바른 이메일 형식이 아닙니다"),
      // .nonempty("이메일을 입력해주세요."),
      password: z
        .string()
        .min(1, "비밀번호를 입력해주세요.")
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,16}$/,
          "비밀번호는 8~16자, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다."
        ),
      // .nonempty("비밀번호를 입력해주세요."),
      passwordCheck: z.string().min(1, "비밀번호를 확인해주세요."),
      // .nonempty("비밀번호를 확인해주세요."),
      nickName: z
        .string()
        .min(1, "닉네임을 입력해주세요.")
        .min(2, {
          message: "닉네임은 2자 이상이어야 합니다.",
        })
        .max(8, {
          message: "닉네임은 8자 이하로 입력해주세요.",
        }),
      name: z
        .string()
        .min(1, "이름을 입력해주세요.")
        .min(2, { message: "이름은 2자 이상이어야 합니다." }),
      // .nonempty("이름을 입력해주세요."),
      birthYear: z
        .string()
        // .nonempty("출생년도를 입력해주세요.")
        .min(1, "출생년도를 입력해주세요.")
        .refine(
          // 출생년도는 1900년 이상, 현재 연도 이하만 허용
          (value) => {
            const year = new Date(value).getFullYear();
            return year >= 1900 && year <= new Date().getFullYear();
          },
          { message: "유효한 연도가 아닙니다." }
        ),

      phoneNumber: z
        .string()
        .min(1, "휴대폰번호를 입력해주세요.")
        .max(11)
        // .nonempty("휴대폰번호를 입력해주세요.")
        .refine((value) => value.startsWith("010"), {
          message: "010으로 시작해주세요.",
        })
        .refine((value) => value.length >= 11, {
          message: "연락처는 11자리여야 합니다.",
        }),
    })
    // 비밀번호와 비밀번호 확인이 일치하는지 검증
    .superRefine(({ password, passwordCheck }, ctx) => {
      if (password !== passwordCheck) {
        // ctx로 특정 필드에 에러 메시지 추가
        ctx.addIssue({
          code: "custom",
          message: "비밀번호가 일치하지 않습니다.",
          path: ["passwordCheck"], // "passwordCheck" 필드에 오류 메시지 추가
        });
      }
    });

  // 폼 필드 타입 정의
  type userInputType = {
    nickName: string;
    name: string;
    email: string;
    password: string;
    passwordCheck: string;
    birthYear: string;
    phoneNumber: string;
  };

  // React Hook Form을 사용한 폼 관리 설정
  const {
    register, // 입력 필드를 React Hook Form에 등록
    handleSubmit, // 폼 제출 처리 함수
    getValues, // 버튼 클릭 시 값 가져올 때
    formState: { errors, isValid }, // 폼 상태 (에러 및 유효성 검사 상태)
  } = useForm({
    resolver: zodResolver(schema), // zod 스키마를 resolver로 사용하여 유효성 검사
    mode: "onChange", // 입력값 변경 시마다 검증
    reValidateMode: "onChange", // 값이 변경될 때마다 재검증
    defaultValues: {
      // 기본 폼 값
      email: "",
      password: "",
      passwordCheck: "",
      nickName: "",
      name: "",
      birthYear: "",
      phoneNumber: "",
    },
  });

  // 폼 제출 이벤트 핸들러
  const onSubmit = (data: userInputType) => {
    console.log("send");
  };

  return (
    <SignUpStyled className={clsx("signup-page")}>
      <div className="signup-box">
        <h2>회원가입</h2>
        <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
          {/* 아이디 */}
          <div>
            <div>아이디</div>
            <input
              className="signup-id"
              type="text"
              placeholder="아이디"
              {...register("email")} // React Hook Form으로 email 필드 등록
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
            {isEmail && <p>{errorMessage}</p>}
            <button
              className="same-id-check-btn"
              onClick={(e) => {
                e.preventDefault();
                checkEmail(getValues("email"));
              }}
            >
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
              {...register("password")}
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <div>비밀번호 확인</div>
            <input
              className="signup-pw-check"
              type="password"
              placeholder="비밀번호 확인"
              {...register("passwordCheck")}
            />
            {errors.passwordCheck && (
              <p className="error-message">{errors.passwordCheck.message}</p>
            )}
          </div>

          {/* 닉네임 */}
          <div>
            <div>닉네임</div>
            <input
              className="signup-nick"
              type="text"
              placeholder="닉네임"
              {...register("nickName")}
            />
            {errors.nickName && (
              <p className="error-message">{errors.nickName.message}</p>
            )}
            {isNickName && <p>{errorMessage}</p>}
            <button
              className="same-nick-check-btn"
              onClick={(e) => {
                e.preventDefault();
                checkNickName(getValues("nickName"));
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
              {...register("name")}
            />
            {errors.name && (
              <p className="error-message">{errors.name.message}</p>
            )}
          </div>

          {/* 출생년도 */}
          <div>
            <div>출생년도</div>
            <input
              className="signup-year"
              type="number"
              placeholder="출생년도"
              {...register("birthYear")}
            />
            {errors.birthYear && (
              <p className="error-message">{errors.birthYear.message}</p>
            )}
          </div>

          {/* 휴대폰번호 */}
          <div>
            <div>휴대폰번호</div>
            <input
              className="signup-phone"
              type="tel"
              placeholder="휴대폰번호"
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <p className="error-message">{errors.phoneNumber.message}</p>
            )}
          </div>

          {/* 회원가입 버튼 */}
          <div>
            <button className="signup-btn" type="submit" disabled={!isValid}>
              회원가입
            </button>
          </div>
        </form>
      </div>
    </SignUpStyled>
  );
};

export default SignUpPage;
