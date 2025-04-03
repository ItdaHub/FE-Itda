import { useEffect } from "react";
import { KaKaoShareStyled } from "./styled";
import clsx from "clsx";
import { ShareAltOutlined } from "@ant-design/icons";

declare global {
  interface Window {
    Kakao: any;
  }
}

const KAKAO_APP_KEY = process.env.NEXT_PUBLIC_SHARE_KEY;

const KakaoShare = () => {
  useEffect(() => {
    // Kakao SDK 초기화
    if (typeof window !== "undefined" && !window.Kakao) {
      const script = document.createElement("script");
      script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
      script.async = true;
      script.onload = () => {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(KAKAO_APP_KEY);
        }
      };
      document.head.appendChild(script);
    }
  }, []);

  //공유하기 버튼 클릭 시 실행
  const shareKakao = () => {
    if (!window.Kakao) {
      alert("카카오 SDK 로드 실패");
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: "feed", //피드 형식 (이미지 + 제목 + 설명)
      content: {
        title: "ITDA",
        description: "함께 달리자! 릴레이 소설!",
        imageUrl: "https://your-image-url.com/image.png",
        link: {
          mobileWebUrl: "http://localhost:3000/", // 모바일에서 열릴 URL
          webUrl: "http://localhost:3000/", // PC에서 열릴 URL
        },
      },
      buttons: [
        {
          title: "웹사이트 방문하기",
          link: {
            mobileWebUrl: "http://localhost:3000/",
            webUrl: "http://localhost:3000/",
          },
        },
      ],
    });
  };

  return (
    <KaKaoShareStyled className={clsx("kakaoshare-wrap")}>
      <div className="kakaoshare-box" onClick={shareKakao}>
        <div className="kakaoshare-btn" style={{ fontSize: 28 }}>
          <ShareAltOutlined />
        </div>
        <div className="kakaoshare-text">공유</div>
      </div>
    </KaKaoShareStyled>
  );
};

export default KakaoShare;
