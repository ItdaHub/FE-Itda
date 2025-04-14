import Image from "next/image";
import { ProfileImageStyled } from "./styled";
import clsx from "clsx";

interface ProfileImageProps {
  image: File | null;
  profileStatic: string;
  nickName: string;
  email: string;
  type: "sidebar" | "contain";
}

const ProfileImage = ({
  image,
  profileStatic,
  nickName,
  email,
  type,
}: ProfileImageProps) => {
  return (
    <ProfileImageStyled className={clsx("profile-wrapper", type)}>
      <div>
        <Image
          src={image ? URL.createObjectURL(image) : profileStatic}
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
