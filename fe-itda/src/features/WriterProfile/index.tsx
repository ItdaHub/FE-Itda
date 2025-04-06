import { Avatar } from "antd";
import { WriterProfileStyled } from "./styled";
import { UserOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { useEffect } from "react";
import api from "@/utill/api";

const WriterProfile = ({ chapterId }: { chapterId: any }) => {
  useEffect(() => {
    const getWriter = async () => {
      try {
        // 작가 닉네임 가져오기, axios get요청
        // const res = await api.get(`/writers/${chapterId}`);
        // console.log(res.data);
      } catch (e) {
        console.error("작가 닉네임 가져오기 실패: ", e);
      }
    };
    getWriter();
  }, [chapterId]);

  return (
    <WriterProfileStyled className={clsx("profile-wrap")}>
      <Avatar size="large" icon={<UserOutlined />} />
      <div className="profile-nickname">작가 닉네임</div>
    </WriterProfileStyled>
  );
};

export default WriterProfile;
