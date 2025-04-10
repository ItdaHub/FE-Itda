import { Avatar } from "antd";
import { WriterProfileStyled } from "./styled";
import { UserOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { useEffect, useState } from "react";
import api from "@/utill/api";
import MoreDropDown from "@/components/MoreDropDown";
import { useAppSelector } from "@/store/hooks";

const WriterProfile = ({
  novelId,
  chapterId,
}: {
  novelId: number;
  chapterId: number;
}) => {
  const [nickname, setNickname] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // 유저 정보 가져오기
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const getWriter = async () => {
      try {
        // novelId와 chapterId를 이용하여 작가 닉네임 불러오기(axios get요청)
        // const res = await api.get(`/writers/nickname`, {
        //   params: {
        //     novelId,
        //     chapterId,
        //   },
        // });
        // console.log(res.data);
        // API 응답에서 닉네임 추출 후 상태 저장
        // setNickname(res.data.nickname);
        setNickname("나는 작가다");
      } catch (e) {
        console.error("작가 닉네임 가져오기 실패: ", e);
      }
    };
    getWriter();
  }, [novelId, chapterId]);

  return (
    <WriterProfileStyled className={clsx("profile-wrap")}>
      <div className="profile-box">
        <div className="profile-profile">
          <Avatar size="large" icon={<UserOutlined />} />
          <div className="profile-nickname">{nickname || "작가 닉네임"}</div>
        </div>
        <div>
          <MoreDropDown
            type="writer"
            item={nickname}
            user={user}
            setIsVisible={setIsVisible}
            isVisible={isVisible}
          />
        </div>
      </div>
    </WriterProfileStyled>
  );
};

export default WriterProfile;
