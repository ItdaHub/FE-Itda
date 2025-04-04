import { Avatar } from "antd";
import { WriterProfileStyled } from "./styled";
import { UserOutlined } from "@ant-design/icons";
import clsx from "clsx";

const WriterProfile = () => {
  return (
    <WriterProfileStyled className={clsx("profile-wrap")}>
      <Avatar size="large" icon={<UserOutlined />} />
      <div className="profile-nickname">작가 닉네임</div>
    </WriterProfileStyled>
  );
};

export default WriterProfile;
