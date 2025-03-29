import clsx from "clsx";

import Image from "next/image";
import search from "@/assets/images/search.svg";
import louder from "@/assets/images/louder.svg";
import alram from "@/assets/images/alram.svg";
import login from "@/assets/images/login.svg";

const Header = () => {
  return (
    <>
      <div>
        <img />
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
          <Image src={login} alt="login" />
        </div>
      </div>
    </>
  );
};

export default Header;
