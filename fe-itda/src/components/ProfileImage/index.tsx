import Image from "next/image";
import { ProfileImageStyled } from "./styled";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useState } from "react";

interface ProfileImageProps {
  image: File | null;
  profileStatic: string;
  profileImagePreview?: string | null;
  nickName: string;
  email: string;
  type: "sidebar" | "contain";
}

const ProfileImage = ({
  // image,
  profileStatic,
  nickName,
  email,
  type,
}: ProfileImageProps) => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const [image, setImage] = useState<File | null>(null); // 선택된 이미지 파일 (실제 파일 객체)
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  ); // 미리보기 이미지 URL

  return (
    <ProfileImageStyled className={clsx("profile-wrapper", type)}>
      <div>
        <Image
          src={
            image
              ? URL.createObjectURL(image)
              : profileImagePreview || profileStatic
          }
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
