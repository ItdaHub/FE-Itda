import clsx from "clsx";

import Image from "next/image";
import search from "@/assets/images/search.svg";
import louder from "@/assets/images/louder.svg";
import alram from "@/assets/images/alram.svg";
import login from "@/assets/images/login.svg";
import { useRouter } from "next/router";
import { HeaderStyled } from "./styled";

const Header = () => {
  const router = useRouter();

  // 제외할 페이지
  const notPage = [
    "/findpw",
    "/login",
    "/findid",
    "/signup",
    "/agree",
    "/mypage",
  ];

  return (
    <HeaderStyled className={clsx("header-wrap")}>
      <div
        className={
          notPage.filter((url) => router.pathname === url).length !== 0
            ? "headerOff"
            : "header"
        }
      >
        <div
          onClick={() => {
            router.push("/");
          }}
        >
          logo
        </div>
        <div>
          <div>
            <input type="text" placeholder="제목을 입력하세요" />
            <div>
              <Image src={search} alt="search" />
            </div>
          </div>
          <div>
            <Image src={louder} alt="louder" />
          </div>
          <div>
            <Image src={alram} alt="alram" />
          </div>
          <div>
            <Image
              src={login}
              alt="login"
              onClick={() => {
                router.push("/login");
              }}
            />
          </div>
        </div>
      </div>
    </HeaderStyled>
  );
};

export default Header;
