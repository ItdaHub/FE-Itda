import { useRouter } from "next/router";
import { NickBox } from "./styled";
import nickarrow from "@/assets/images/nick_arrow.svg";

const MyProfile = ({
  setVisible,
  userNickName,
}: {
  setVisible?: any;
  userNickName?: string;
}) => {
  const router = useRouter();

  return (
    <NickBox
      onClick={() => {
        router.push("/mypage");
        setVisible ? setVisible(false) : <></>;
      }}
    >
      <div className="nickbox">
        <span>{userNickName || "사용자"}님</span>
        <img src={nickarrow.src} alt="화살표" />
      </div>
    </NickBox>
  );
};

export default MyProfile;
