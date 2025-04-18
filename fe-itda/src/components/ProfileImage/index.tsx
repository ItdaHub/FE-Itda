import Image from "next/image";
import { ProfileImageStyled } from "./styled";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";

interface ProfileImageProps {
  profileStatic: string;
  nickName: string;
  email: string;
  type: "sidebar" | "contain";
}

const ProfileImage = ({
  profileStatic,
  nickName,
  email,
  type,
}: ProfileImageProps) => {
  const user = useAppSelector((state) => state.auth.user);

  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  ); // 미리보기 이미지 URL

  // 유저 데이터에서 프로필 이미지가 있을 경우 preview 기본값 설정
  useEffect(() => {
    if (user?.profile_img) {
      setProfileImagePreview(
        `http://localhost:5001/uploads/profiles/${user.profile_img}`
      );
    }
  }, [user]);

  return (
    <ProfileImageStyled className={clsx("profile-wrapper", type)}>
      <div>
        <Image
          src={profileImagePreview || profileStatic}
          alt="프로필 사진"
          width={type === "sidebar" ? 100 : 60}
          height={type === "sidebar" ? 100 : 60}
          className="profile-image"
          priority
        />
      </div>
      <div className="profile-user">
        <div className="user-nick">{nickName}</div>
        <div className="user-email">{email}</div>
      </div>
    </ProfileImageStyled>
  );
};

export default ProfileImage;
