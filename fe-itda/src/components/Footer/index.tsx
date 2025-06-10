import clsx from "clsx";
import { FooterStyled } from "./styled";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();

  // 푸터 제외할 페이지
  const notPage = [
    "/findpw",
    "/login",
    "/findid",
    "/signup",
    "/agree",
    "/mypage",
    "/newwrite",
    "/chapter/[id]",
  ];

  return (
    <FooterStyled className={clsx("footer-wrap")}>
      <hr
        className={
          notPage.filter((url) => router.pathname === url).length !== 0
            ? "footerOff"
            : "footer-div"
        }
      ></hr>
      <div
        className={
          notPage.filter((url) => router.pathname === url).length !== 0
            ? "footerOff"
            : "footer"
        }
      >
        <div className="footer-company-info">
          <div className="footer-company-name">
            <a href="https://github.com/ItdaHub">잇다(주)</a>
          </div>
          <div className="footer-use">
            <span>이용약관</span>
            <span className="footer-span">개인정보 처리방침</span>
            <span className="footer-span">청소년보호정책</span>
            <span className="footer-span">사업자정보확인</span>
          </div>
          <div className="footer-use">
            <span className="footer-name">공동대표이사</span>
            <span className="footer-person">
              <a href="https://github.com/Taetea1">권태연</a>,
            </span>
            <span className="footer-person">
              <a href="https://github.com/rmfnxm23">박소현</a>,
            </span>
            <span className="footer-person">
              <a href="https://github.com/HanbyeolSon74">손한별</a>
            </span>
          </div>
          <div className="footer-fin">© ITDA Corp.</div>
        </div>
      </div>
    </FooterStyled>
  );
};

export default Footer;
