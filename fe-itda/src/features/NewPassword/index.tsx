import api from "@/utill/api";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { NewPassStyled } from "./styled";
import clsx from "clsx";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { validationPass, validationPassCheck } from "@/utill/vali";
import Swal from "sweetalert2";

const NewPassword = () => {
  const router = useRouter();
  // const { token } = router.query;
  // console.log("token :", token);

  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passError, setPassError] = useState("");
  const [passCheckError, setPassCheckError] = useState("");
  const [changePwError, setChangePwError] = useState("");

  const [token, setToken] = useState("");

  useEffect(() => {
    if (router.isReady && typeof router.query.token === "string") {
      console.log("토큰 값:", router.query.token);
      setToken(router.query.token);
    }
  }, [router.isReady, router.query.token]);

  const handleChangePw = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!token) {
      setChangePwError("잘못된 접근입니다. 토큰이 없습니다.");
      return;
    }

    if (!password || !passwordCheck) {
      setChangePwError("비밀번호를 입력해주세요.");
      return;
    } else if (password !== passwordCheck) {
      setChangePwError("비밀번호가 일치하지 않습니다.");
      return;
    } else {
      setChangePwError("");
    }

    console.log(token, "요청 데이터", password);

    try {
      const response = await api.post("/auth/reset-password", {
        token,
        newPassword: password,
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
