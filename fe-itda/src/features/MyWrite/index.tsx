// import { useEffect, useState } from "react";
// import { MyWriteStyled } from "./styled";
// import api from "@/utill/api";

// import test from "@/assets/images/testImage.png";
// import WebNovel from "../WebNovel";
// import WebNovelGroup from "@/components/WebNovelGroup";

// const MyWrite = ({ mywrite }: { mywrite: string }) => {
//   // 작품 데이터
//   const [mynovels, setMyNovels] = useState<any[]>([]);

//   // 작품 데이터 가져오기(type과 genre가 변경될시)
//   useEffect(() => {
//     const fetchNovels = async () => {
//       try {
//         // console.log(type, genre);
//         // const response = await api.get("/novels", {
//         //   // 타입과 장르에 맞는 작품
//         //   params: { type, genre },
//         // });
//         // setMyNovels(response.data);

//         setMyNovels([
//           {
//             id: 1,
//             title: "오늘도 힘내고 싶다",
//             genre: "로맨스",
//             likes: 3,
//             imageUrl: test,
//           },
//           {
//             id: 2,
//             title: "하핫",
//             genre: "로맨스",
//             likes: 3,
//             imageUrl: test,
//           },
//           {
//             id: 3,
//             title: "오늘도",
//             genre: "로맨스",
//             likes: 3,
//             imageUrl: test,
//           },
//           {
//             id: 4,
//             title: "야야",
//             genre: "로맨스",
//             likes: 3,
//             imageUrl: test,
//           },
//           {
//             id: 5,
//             title: "잘돼라",
//             genre: "로맨스",
//             likes: 3,
//             imageUrl: test,
//           },
//           {
//             id: 6,
//             title: "헤헤",
//             genre: "로맨스",
//             likes: 3,
//             imageUrl: test,
//           },
//           {
//             id: 7,
//             title: "오늘도 힘내고 싶다",
//             genre: "로맨스",
//             likes: 3,
//             imageUrl: test,
//           },
//           {
//             id: 8,
//             title: "싶다",
//             genre: "로맨스",
//             likes: 3,
//             imageUrl: test,
//           },
//         ]);
//       } catch (e) {
//         console.error("웹소설 불러오기 실패:", e);
//       }
//     };
//     fetchNovels();
//   }, []);
//   return (
//     <MyWriteStyled>
//       <div>
//         <WebNovelGroup />
//       </div>
//     </MyWriteStyled>
//   );
// };

// export default MyWrite;
