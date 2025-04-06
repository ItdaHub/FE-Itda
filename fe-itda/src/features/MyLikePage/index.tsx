import clsx from "clsx";
import { MyLikePageStyled } from "./styled";
import Image from "next/image";
import test from "@/assets/images/testImage.png";
import { useAppSelector } from "@/store/hooks";

// 테스트 유저
const testUser = {
  id: "user1234",
  name: "테스트유저",
};

// 테스트 소설
const novels = [
  {
    id: "novel1",
    title: "첫 번째 소설",
    description: "설명1",
    likes: ["user123", "user456"],
    imageUrl: test,
  },
  {
    id: "novel2",
    title: "두 번째 소설",
    description: "설명2",
    likes: [],
    imageUrl: test,
  },
  {
    id: "novel3",
    title: "세 번째 소설",
    description: "설명3",
    likes: ["user123"],
    imageUrl: test,
  },
];

const MyLIkePage = () => {
  // 유저 정보 가져오기
  const user = useAppSelector((state) => state.auth.user);

  // 좋아요한 소설 필터링
  const likedNovels = novels.filter((novel) =>
    novel.likes.includes(testUser.id)
  );

  return (
    <MyLikePageStyled className={clsx("mylike-wrap")}>
      <h1 className="page-title">찜한 소설</h1>

      <div className="novel-list">
        {likedNovels.length > 0 ? (
          likedNovels.map((novel) => (
            <div key={novel.id} className="novel-card">
              <Image
                src={novel.imageUrl}
                alt={novel.title}
                width={200}
                height={120}
              />
              <div className="novel-info">
                <h3>{novel.title}</h3>
                <p>{novel.description}</p>
              </div>
            </div>
          ))
        ) : (
          //   <p>찜한 소설이 없습니다.</p>
          <div className="no-list">찜한 소설이 없습니다.</div>
        )}
      </div>
    </MyLikePageStyled>
  );
};

export default MyLIkePage;
