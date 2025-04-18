import api from "@/utill/api";
import { useRouter } from "next/router";
import { useState } from "react";
import { NewPassStyled } from "./styled";
import clsx from "clsx";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { validationPass, validationPassCheck } from "@/utill/vali";
import { App as AntdApp } from "antd";

const NewPassword = () => {
  const { message } = AntdApp.useApp();
  const router = useRouter();
  const token =
    typeof router.query.token === "string" ? router.query.token : "";

  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passError, setPassError] = useState("");
  const [passCheckError, setPassCheckError] = useState("");
  const [changePwError, setChangePwError] = useState("");

  const handleChangePw = async (e: React.MouseEvent) => {
    e.preventDefault();

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
      const response = await api.post("/auth/reset-password", {
        token,
        newPassword: password,
      });

      if (response.data.message) {
        message.success("비밀번호 변경 완료");
        router.push("/login");
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
