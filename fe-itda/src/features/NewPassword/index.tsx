import api from "@/utill/api";
import { useRouter } from "next/router";
import { useState } from "react";
import { NewPassStyled } from "./styled";
import clsx from "clsx";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import {
  changePassword,
  validationPass,
  validationPassCheck,
} from "@/utill/vali";
import { Modal } from "antd";
import Swal from "sweetalert2";

const NewPassword = () => {
  const router = useRouter();

  // sessionStorage에서 가져오기
  // const email =
  // typeof window !== "undefined" ? sessionStorage.getItem("email") ?? "" : "";

  //   쿼리 파라미터
  const { email } = router.query;

  // 비밀번호 토글 버튼
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(true);

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

  // 비밀번호 변경 버튼 클릭
  const handleChangePw = async (e: React.MouseEvent) => {
    e.preventDefault();

    // vali에서 사용할 경우 (axios 요청)
    // changePassword(email, password, passwordCheck, setChangePwError);

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
        Swal.fire({
          icon: "success",
          title: "비밀번호 변경 완료",
          text: "새 비밀번호가 저장되었습니다. 다시 로그인해 주세요.",
          confirmButtonText: "확인",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/login";
          }
        });
      } else {
        setChangePwError("비밀번호 변경에 실패했습니다.");
      }
    } catch (err) {
      console.error(err);
      setChangePwError("서버 오류가 발생했습니다.");
    }
  };

  return (
    <NewPassStyled className={clsx("newpass-wrap")}>
      <div className="newpass-password-box">
        <h3 className="newpass-title">새 비밀번호</h3>
        <div className="newpass-input-box">
          <input
            className="newpass-input"
            type={toggle1 ? "password" : "text"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validationPass(e.target.value, setPassError);
            }}
          />
          {toggle1 ? (
            <EyeInvisibleOutlined
              className="newpass-toggleBtn"
              onClick={(e) => {
                e.preventDefault();
                setToggle1(!toggle1);
              }}
            />
          ) : (
            <EyeOutlined
              className="newpass-toggleBtn"
              onClick={(e) => {
                e.preventDefault();
                setToggle1(!toggle1);
              }}
            />
          )}
          {passError && <p className="newpass-errorMessage">{passError}</p>}
        </div>

        <h3 className="newpass-title">새 비밀번호 확인</h3>
        <div className="newpass-input-box">
          <input
            className="newpass-input-check"
            type={toggle2 ? "password" : "text"}
            value={passwordCheck}
            onChange={(e) => {
              setPasswordCheck(e.target.value);
              validationPassCheck(e.target.value, password, setPassCheckError);
            }}
          />
          {toggle2 ? (
            <EyeInvisibleOutlined
              className="newpass-toggleBtn"
              onClick={(e) => {
                e.preventDefault();
                setToggle2(!toggle2);
              }}
            />
          ) : (
            <EyeOutlined
              className="newpass-toggleBtn"
              onClick={(e) => {
                e.preventDefault();
                setToggle2(!toggle2);
              }}
            />
          )}
          {passCheckError && (
            <p className="newpass-errorMessage">{passCheckError}</p>
          )}
        </div>

        <button className="newpass-btn" onClick={handleChangePw}>
          비밀번호 변경
        </button>
        {changePwError && (
          <p className="newpass-errorMessage">{changePwError}</p>
        )}
      </div>
    </NewPassStyled>
  );
};

export default NewPassword;
