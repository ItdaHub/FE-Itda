import clsx from "clsx";
import { FindPwPageStyled } from "./styled";
import { useState } from "react";
import { useDispatch } from "react-redux";
import api from "@/utill/api";
import { useRouter } from "next/router";
import { LeftOutlined } from "@ant-design/icons";

const FindPwPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // 이메일(아이디)
  const [email, setEmail] = useState("");
  // 에러 메세지
  const [errorMessage, setErrorMessage] = useState("");
  // 일치하는 아이디
  const [findIt, setFindIt] = useState("");

  const handleEmailChange = (e: any) => {
    const emailValue = e.target.value;
    setEmail(emailValue); // 이메일 상태 업데이트

    // 이메일 유효성 검사
    if (!emailValue) {
      setErrorMessage("이메일을 입력해주세요.");
    } else if (!isValidEmail(emailValue)) {
      setErrorMessage("유효한 이메일 주소를 입력해주세요.");
    } else {
      setErrorMessage("");
    }
  };

  // 이메일 유효성 검사
  const isValidEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  // 비밀번호 찾기 버튼 클릭
  const handleFindPw = async (e: any) => {
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
      const response = await api.post("/auth/findpw", { email });

      const foundEmail = response.data.data;

      // 정확히 입력한 이메일과 DB 이메일이 같을 때
      if (foundEmail && foundEmail === email) {
        setFindIt(foundEmail);
        setErrorMessage("");

        // 쿼리 파라미터
        router.push(`/randompass?email=${encodeURIComponent(foundEmail)}`);
      } else {
        setFindIt("");
        setErrorMessage("일치하는 계정이 없습니다.");
      }
    } catch (error) {
      setErrorMessage("서버 오류가 발생했습니다");
    }
  };

  return (
    <FindPwPageStyled className={clsx("findpw-wrap")}>
      <div className="findpw-box">
        <div className="findpw-titleBox">
          <div
            className="findpw-backBtn"
            onClick={() => {
              router.push("/login");
            }}
          >
            <LeftOutlined />
          </div>
          <h3 className="findpw-title">비밀번호 찾기</h3>{" "}
        </div>
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

          {/* 비밀번호 찾기 버튼 */}
          <button className="findPw-btn" onClick={handleFindPw}>
            비밀번호 찾기
          </button>

          {/* 에러 메시지 */}
          {errorMessage && (
            <div className="findpw-errorMessage">{errorMessage}</div>
          )}
        </form>
      </div>
    </FindPwPageStyled>
  );
};

export default FindPwPage;
