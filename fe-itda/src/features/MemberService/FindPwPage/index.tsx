import clsx from "clsx";
import { FindPwPageStyled } from "./styled";
import { useState } from "react";
import axios from "axios";
import { Modal } from "antd";

const FindPwPage = () => {
  // 이메일(아이디)
  const [email, setEmail] = useState("");
  // 에러 메세지
  const [errorMessage, setErrorMessage] = useState("");

  // 새 비밀번호
  const [newPassword, setNewPassword] = useState("");
  // 새 비밀번호 확인
  const [newPasswordCheck, setNewPasswordCheck] = useState("");

  const handleEmailChange = (e: any) => setEmail(e.target.value);

  const handleNewPass = (e: any) => {
    setNewPassword(e.target.value);
  };

  const handleNewPassCheck = (e: any) => {
    setNewPasswordCheck(e.target.value);
  };

  // 이메일 유효성 검사
  const isValidEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  // 비밀번호 찾기 버튼 클릭
  const handleFindPw = (e: any) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage("이메일을 입력해주세요.");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    try {
      const response = axios.post("/findpw", { data: { email } });
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("서버 오류가 발생했습니다");
    }
  };

  // 비밀번호 변경 버튼 클릭
  const handleChangePw = (e: any) => {
    e.preventDefault();

    try {
      const response = axios.post("/updatePw", {
        data: { email, password: newPassword },
      });
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("서버 오류가 발생했습니다");
    }
  };

  return (
    <FindPwPageStyled className={clsx("findpw-wrap")}>
      <div className="findpw-box">
        <h3>비밀번호 찾기</h3>
        <form className="findpw-form">
          <div>
            <input
              className="findpw-id"
              type="email"
              name="email"
              placeholder="abc123@XXX.com"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          {/* 에러 메시지 */}
          {errorMessage && (
            <div className="findpw-errorMessage">{errorMessage}</div>
          )}

          {/* 비밀번호 찾기 버튼 */}
          <button className="findPw-btn" onClick={handleFindPw}>
            비밀번호 찾기
          </button>
          <div>
            <h3>새 비밀번호</h3>
            <input
              className="new-pass"
              type="password"
              value={newPassword}
              onChange={handleNewPass}
            />
            <h3>새 비밀번호 확인</h3>
            <input
              className="new-passCheck"
              type="password"
              value={newPasswordCheck}
              onChange={handleNewPassCheck}
            />
            {errorMessage && <div>{errorMessage}</div>}
            <button className="changePw-btn">비밀번호 변경</button>
          </div>
        </form>
      </div>
    </FindPwPageStyled>
  );
};

export default FindPwPage;
