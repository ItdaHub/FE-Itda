import { useState } from "react";
import { Avatar } from "antd";
import { WriterProfileStyled } from "./styled";
import { UserOutlined } from "@ant-design/icons";
import clsx from "clsx";
import MoreDropDown from "@/components/MoreDropDown";
import { useAppSelector } from "@/store/hooks";

const WriterProfile = ({
  nickname,
  writerId,
}: {
  nickname: string;
  writerId: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const user = useAppSelector((state) => state.auth.user);

  return (
    <WriterProfileStyled className={clsx("profile-wrap")}>
      <div className="profile-box">
        <div className="profile-profile">
          <Avatar size="large" icon={<UserOutlined />} />
          <div className="profile-nickname">{nickname || "작가 닉네임"}</div>
        </div>
        <MoreDropDown
          type="writer"
          item={{ nickname, writerId }}
          user={user}
          setIsVisible={setIsVisible}
          isVisible={isVisible}
        />
      </div>
    </WriterProfileStyled>
  );
};

export default WriterProfile;
