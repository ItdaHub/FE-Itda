import clsx from "clsx";
import { FooterStyled } from "./styled";
import { useRouter } from "next/router";

import advice from "@/assets/images/advice.png";
import notice from "@/assets/images/notice.png";
import insta from "@/assets/images/insta.png";
import twiter from "@/assets/images/twiter.png";
import youtube from "@/assets/images/youtube.png";
import tictok from "@/assets/images/tictok.png";
import facebook from "@/assets/images/facebook.png";

const Footer = () => {
  const router = useRouter();

  // 헤더 제외할 페이지
  const notPage = [
    "/findpw",
    "/login",
    "/findid",
    "/signup",
    "/agree",
    "/mypage",
    "/newwrite",
  ];

  return (
    <FooterStyled className={clsx("footer-wrap")}>
      <hr className="footer-div"></hr>
      <div
        className={
          notPage.filter((url) => router.pathname === url).length !== 0
            ? "footerOff"
            : "footer"
        }
      >
        <div className="footer-box">
          <div className="footer-topleft">
            <div className="footer-notice">
              <div className="footer-advice">
                <img src={advice.src} alt="고객센터" />
                고객센터
              </div>
              <div className="footer-no">
                <img src={notice.src} alt="공지사항" />
                공지사항
              </div>
            </div>
            <div className="footer-service">
              <div className="footer-ser">서비스</div>
              <div className="footer-info">제휴카드</div>
              <div className="footer-info">뷰어 다운로드</div>
              <div className="footer-info">CP사이트</div>
              <div className="footer-info">리디바탕</div>
            </div>
            <div className="footer-etc">
              <div className="footer-ser">기타 문의</div>
              <div className="footer-info">콘텐츠 제공 문의</div>
              <div className="footer-info">사업 제휴 문의</div>
            </div>
            <div className="footer-company">
              <div className="footer-ser">회사</div>
              <div className="footer-info">회사 소개</div>
              <div className="footer-info">인재 채용</div>
            </div>
          </div>
          <div className="footer-company-info">
            <div className="footer-company-name">잇다(주)</div>
            <div className="footer-use">
              <span>이용약관</span>
              <span className="footer-span">개인정보 처리방침</span>
              <span className="footer-span">청소년보호정책</span>
              <span className="footer-span">사업자정보확인</span>
            </div>
            <div className="footer-fin">© ITDA Corp.</div>
          </div>
        </div>
        <div className="footer-sns">
          <a href="https://www.instagram.com/" target="_blank">
            <img src={insta.src} alt="인스타" />
          </a>
          <a
            href="https://x.com/i/flow/login?input_flow_data=%7B%22requested_variant%22%3A%22eyJsYW5nIjoia28ifQ%3D%3D%22%7D"
            target="_blank"
          >
            <img src={twiter.src} alt="트위터" />
          </a>
          <a href="https://www.youtube.com" target="_blank">
            <img src={youtube.src} alt="유튜브" />
          </a>
          <a href="https://www.tiktok.com/ko-KR/" target="_blank">
            <img src={tictok.src} alt="틱톡" />
          </a>
          <a href="https://www.facebook.com/?locale=ko_KR" target="_blank">
            <img src={facebook.src} alt="페이스북" />
          </a>
        </div>
      </div>
    </FooterStyled>
  );
};

export default Footer;
