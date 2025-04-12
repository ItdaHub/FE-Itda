// import clsx from "clsx";
// import { ProfileImgStyled } from "./styled";
// import Image from "next/image";
// import profileStactic from "@/assets/images/img_profile_static.svg";
// // import profileEdit from "@/assets/images/img_profile_edit.svg";
// import { useState } from "react";

// const ProfileImg = ({ image, nickName, email }) => {
//   return (
//     <ProfileImgStyled className={clsx("profile-wrap")}>
//       <div className="userEdit-image">
//         <Image
//           src={image ? URL.createObjectURL(image) : profileStactic}
//           alt="프로필 사진"
//           priority
//           width={100}
//           height={100}
//           className="profile-image"
//         />
//         <div className="profile-user">
//           <div className="user-nick">{nickName}</div>
//           <div className="user-email">{email}</div>
//         </div>
//       </div>
//     </ProfileImgStyled>
//   );
// };

// export default ProfileImg;
