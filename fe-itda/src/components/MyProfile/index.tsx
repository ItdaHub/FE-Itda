import { useRouter } from "next/router";
import { NickBox } from "./styled";
import nickarrow from "@/assets/images/nick_arrow.svg";

interface MyProfileProps {
  setVisible?: any;
  userNickName?: string;
}

const MyProfile = ({ setVisible, userNickName }: MyProfileProps) => {
  const router = useRouter();

  return (
    <NickBox
      onClick={() => {
        router.push("/mypage");
        setVisible ? setVisible(false) : <></>;
      }}
    >
      {userNickName ? (
        <div className="nickbox">
          <span>{userNickName} 님</span>
          <img src={nickarrow.src} alt="화살표" />
        </div>
      ) : (
        <button className="nickbox">로그인</button>
      )}
    </NickBox>
  );
};

export default MyProfile;
