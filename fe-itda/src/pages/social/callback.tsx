import { useEffect } from "react";
const SocialCallback = () => {
  const fetchAndSend = async () => {
    try {
      const res = await fetch("http://localhost:5001/auth/callback-data", {
        credentials: "include", // 필요 시 쿠키용
      });
      const data = await res.json();
      window.opener.postMessage(data, "http://localhost:3000");
      window.close();
    } catch (err) {
      console.error("소셜 로그인 콜백 오류:", err);
    }
  };

  useEffect(() => {
    fetchAndSend();
  }, []);

  return <div>로그인 처리 중입니다...</div>;
};

export default SocialCallback;
