/**
 * 발리체크용
 */

import { Modal } from "antd";
import api from "@/utill/api";

// 전화번호 확인용
export const check = /^\d{3}-\d{4}-\d{4}$/;

// 전화번호 하이픈 추가 및 숫자 개수 제한
export const handlePhoneNumberChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  let formattedPhone = e.target.value.replace(/[^\d]/g, ""); // 숫자만 추출

  if (formattedPhone.length > 11) {
    return;
  }

  if (formattedPhone.length <= 3) {
    // 3자리까지는 그대로 표시
    formattedPhone = formattedPhone;
  } else if (formattedPhone.length <= 7) {
    // 4~7자리에 하이픈 추가
    formattedPhone = formattedPhone.replace(/(\d{3})(\d{1,4})/, "$1-$2");
  } else {
    // 8자리 이상 하이픈 추가
    formattedPhone = formattedPhone.replace(
      /(\d{3})(\d{4})(\d{1,4})/,
      "$1-$2-$3"
    );
  }

  setPhoneNumber(formattedPhone);
  setErrorMessage(""); // 전화번호 입력 시 에러 메시지 초기화
};

// 비밀번호 유효성 검사
export const validationPass = (
  password: string,
  setPassError: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!password) {
    setPassError("비밀번호를 입력해주세요");
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,16}$/.test(
      password
    )
  ) {
    setPassError(
      "비밀번호는 8~16자, 대·소문자, 숫자, 특수문자를 포함해야 합니다."
    );
  } else setPassError("");
};

// 비밀번호 확인 유효성 검사
export const validationPassCheck = (
  password: string,
  passwordCheck: string,
  setPassCheckError: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!passwordCheck) {
    setPassCheckError("비밀번호를 확인해주세요.");
  } else if (password !== passwordCheck) {
    setPassCheckError("비밀번호가 일치하지 않습니다.");
  } else setPassCheckError("");
};

/**
 * 비밀번호 변경 요청 함수
 * @param email 사용자 이메일
 * @param password 새 비밀번호
 * @param passwordCheck 새 비밀번호 확인
 * @param setError 에러 메시지 설정 함수
 * @param onSuccess 성공 시 실행할 콜백 (예: 로그인 페이지 이동)
 */
export const changePassword = async (
  email: string,
  password: string,
  passwordCheck: string,
  setChangePwError: (msg: string) => void,
  onSuccess?: () => void
) => {
  if (!password || !passwordCheck) {
    setChangePwError("비밀번호를 입력해주세요.");
    return;
  } else if (password !== passwordCheck) {
    setChangePwError("비밀번호가 일치하지 않습니다.");
    return;
  } else {
    setChangePwError("");
  }

  try {
    const response = await api.post("/auth/updatePw", {
      email,
      password,
    });

    if (response.data.message) {
      Modal.success({
        title: "비밀번호 변경 완료",
        content: "새 비밀번호가 저장되었습니다. 다시 로그인해 주세요.",
        onOk: onSuccess ?? (() => (window.location.href = "/login")),
      });
    } else {
      setChangePwError("비밀번호 변경에 실패했습니다.");
    }
  } catch (err) {
    console.error(err);
    setChangePwError("서버 오류가 발생했습니다.");
  }
};
