import clsx from "clsx";
import { RandomPassStyled } from "./styled";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import sendMail from "@/assets/images/sending-mail.gif";

const RandomPassword = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");

  // ✅ sessionStorage에 저장된 이메일 가져오기
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  //   //   ✅ query의 주소에서 가져오기
  //   useEffect(() => {
  //     if (router.query.email) {
  //       setEmail(router.query.email as string);
  //     }
  //   }, [router.query]);

  return (
    <RandomPassStyled className={clsx("random-wrap")}>
      <img src={sendMail.src} alt="메일 전송" />
      {/* {email && <p className="random-text">{email}로</p>}
      <p className="random-text">메일이 전송되었습니다.</p> */}
      {/* <p className="random-text">
        {email && <strong>{email}</strong>}로 비밀번호 재설정 메일을 보냈어요.
        📩
        <br />
        <span className="tip">혹시 못 받으셨다면 스팸함도 확인해 주세요!</span>
      </p> */}
      {email && <p className="random-text">안전하게 메일을 전송했습니다. </p>}
      <p className="random-text">{email}로 발송되었으니 확인해 주세요!</p>
    </RandomPassStyled>
  );
};

export default RandomPassword;
