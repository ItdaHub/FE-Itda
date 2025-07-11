import { useState } from "react";
import { Avatar } from "antd";
import { WriterProfileStyled } from "./styled";
import { UserOutlined } from "@ant-design/icons";
import clsx from "clsx";
import MoreDropDown from "@/components/MoreDropDown";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import profileStatic from "@/assets/images/img_profile_static.svg";

interface WriterProfileProps {
  nickname?: string;
  writerId?: number;
  novelId: number;
  chapterId: number;
}

const WriterProfile = ({
  nickname,
  writerId,
  novelId,
  chapterId,
}: WriterProfileProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const user = useAppSelector((state) => state.auth.user);

  const profileImageSrc = user?.profile_img
    ? `http://localhost:5001/uploads/profiles/${user.profile_img}`
    : profileStatic;

  return (
    <WriterProfileStyled className={clsx("profile-wrap")}>
      <div className="profile-box">
        <div className="profile-profile">
          {/* <Avatar size="large" icon={<UserOutlined />} /> */}
          <Image
            src={profileImageSrc}
            alt="유저 이미지"
            width={30}
            height={30}
            className="profile-image-wrap"
          />
          <div className="profile-nickname">{nickname || "작가 닉네임"}</div>
        </div>
        <MoreDropDown
          type="writer"
          item={{ nickname, id: writerId }}
          user={user}
          setIsVisible={setIsVisible}
          isVisible={isVisible}
          target_type="chapter"
          novelId={novelId}
          chapterId={chapterId}
        />
      </div>
    </WriterProfileStyled>
  );
};

export default WriterProfile;
