import clsx from "clsx";
import { RandomPassStyled } from "./styled";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import sendMail from "@/assets/images/sending-mail.gif";
import axios from "axios";

const RandomPassword = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // query의 주소에서 이메일 가져오기
  useEffect(() => {
    if (router.query.email) {
      setEmail(router.query.email as string);
    }
  }, [router.query]);

  // 이메일 전송 처리 함수
  const sendResetPasswordEmail = async () => {
    if (!email) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5001/auth/forgot-password",
        { email }
      );

      if (response.status === 201) {
        setIsSuccess(true);
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "메일 전송 실패");
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 이메일 전송
  useEffect(() => {
    if (email) {
      sendResetPasswordEmail();
    }
  }, [email]);

  return (
    <RandomPassStyled className={clsx("random-wrap")}>
      <img src={sendMail.src} alt="메일 전송" />
      {isLoading && <p className="random-text">메일 전송 중...</p>}
      {isSuccess && (
        <>
          <p className="random-text">안전하게 메일을 전송했습니다.</p>
          <p className="random-text">
            <strong>{email}</strong>로 발송되었으니 확인해 주세요!
          </p>
        </>
      )}
      {error && <p className="random-text error">{error}</p>}
    </RandomPassStyled>
  );
};

export default RandomPassword;
