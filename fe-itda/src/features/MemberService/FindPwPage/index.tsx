import clsx from "clsx";
import { FindPwPageStyled } from "./styled";
import { useState } from "react";
import axios from "axios";
import { Modal } from "antd";
import { useDispatch } from "react-redux";
// 비밀번호, 비밀번호 확인 유효성 검사
import {
  changePassword,
  validationPass,
  validationPassCheck,
} from "@/utill/vali";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import api from "@/utill/api";

const FindPwPage = () => {
  const dispatch = useDispatch();

  // 비밀번호 토글 버튼
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(true);

  // 이메일(아이디)
  const [email, setEmail] = useState("");
  // 에러 메세지
  const [errorMessage, setErrorMessage] = useState("");
  // 일치하는 아이디
  const [findIt, setFindIt] = useState("");

  // 새 비밀번호
  const [password, setPassword] = useState("");
  // 새 비밀번호 확인
  const [passwordCheck, setPasswordCheck] = useState("");
  // 새 비밀번호 에러 메세지
  const [passError, setPassError] = useState("");
  // 새 비밀번호 확인 에러 메세지
  const [passCheckError, setPassCheckError] = useState("");
  // 비밀번호 변경 axios 요청 에러 메세지
  const [changePwError, setChangePwError] = useState("");

  const handleEmailChange = (e: any) => {
    const emailValue = e.target.value;
    setEmail(emailValue); // 이메일 상태 업데이트
    console.log(emailValue, "email value");

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

      if (foundEmail && foundEmail === email) {
        // 정확히 입력한 이메일과 DB 이메일이 같을 때
        setFindIt(foundEmail);
        setErrorMessage("");
      } else {
        setFindIt(""); // 입력값과 일치하지 않으면 비밀번호 입력칸 안 나옴
        setErrorMessage("일치하는 계정이 없습니다.");
      }
      // setEmail(""); // 이메일 초기화
    } catch (error) {
      setErrorMessage("서버 오류가 발생했습니다");
    }
  };

  // 비밀번호 변경 버튼 클릭
  const handleChangePw = (e: React.MouseEvent) => {
    e.preventDefault();
    changePassword(email, password, passwordCheck, setChangePwError);

    // if (!password || !passwordCheck) {
    //   setChangePwError("비밀번호를 입력해주세요.");
    //   return;
    // }
    // try {
    //   const response = await api.post("/auth/updatePw", {
    //     email,
    //     password, // 새 비밀번호 업데이트
    //   });

    //   if (response.data.message) {
    //     Modal.success({
    //       title: "비밀번호 변경 완료",
    //       content: "새 비밀번호가 저장되었습니다. 다시 로그인해 주세요.",
    //       onOk() {
    //         window.location.href = "/login"; // 로그인 페이지로 이동
    //       },
    //     });
    //   } else {
    //     setChangePwError("비밀번호 변경에 실패했습니다.");
    //   }
    // } catch (error) {
    //   setChangePwError("서버 오류가 발생했습니다.");
    // }
  };

  return (
    <FindPwPageStyled className={clsx("findpw-wrap")}>
      <div className="findpw-box">
        <h3 className="findpw-title">비밀번호 찾기</h3>
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
          {/* 새 비밀번호 입력 */}
          {findIt && (
            <div className="new-password-box">
              <h3 className="findpw-title">새 비밀번호</h3>
              <div className="findpw-newpass-box">
                <input
                  className="new-pass"
                  type={toggle1 ? "password" : "text"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validationPass(e.target.value, setPassError);
                  }}
                />

                {/* 토글 버튼 */}
                {toggle1 ? (
                  <EyeInvisibleOutlined
                    className="findpw-toggleBtn"
                    onClick={(e) => {
                      e.preventDefault();
                      setToggle1(!toggle1);
                    }}
                  />
                ) : (
                  <EyeOutlined
                    className="findpw-toggleBtn"
                    onClick={(e) => {
                      e.preventDefault();
                      setToggle1(!toggle1);
                    }}
                  />
                )}

                {passError && (
                  <p className="findpw-errorMessage">{passError}</p>
                )}
              </div>

              <h3 className="findpw-title">새 비밀번호 확인</h3>
              <div className="findpw-newpass-box">
                <input
                  className="new-passCheck"
                  type={toggle2 ? "password" : "text"}
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
                    className="findpw-toggleBtn"
                    onClick={(e) => {
                      e.preventDefault();
                      setToggle2(!toggle2);
                    }}
                  />
                ) : (
                  <EyeOutlined
                    className="findpw-toggleBtn"
                    onClick={(e) => {
                      e.preventDefault();
                      setToggle2(!toggle2);
                    }}
                  />
                )}

                {passCheckError && (
                  <p className="findpw-errorMessage">{passCheckError}</p>
                )}
              </div>

              {/* 비밀번호 변경 버튼 */}
              <button className="changePw-btn" onClick={handleChangePw}>
                비밀번호 변경
              </button>
              {changePwError && (
                <p className="findpw-errorMessage">{changePwError}</p>
              )}
            </div>
          )}
        </form>
      </div>
    </FindPwPageStyled>
  );
};

export default FindPwPage;
