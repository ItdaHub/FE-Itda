import WebNovel from "@/features/WebNovel";
import { WebNovelGroupStyled } from "./styled";
import clsx from "clsx";
import { useEffect, useState } from "react";

import test from "@/assets/images/testImage.png";
import api from "@/utill/api";

// 연령 카테고리
const ageGroups = [
  { label: "10대", value: "teen" },
  { label: "20대", value: "twenties" },
  { label: "30대", value: "thirties" },
  { label: "40대", value: "forties" },
];

const WebNovelGroup = ({
  title,
  type,
  genre,
  ageSelect,
}: {
  title: string;
  type?: string;
  genre?: string;
  ageSelect?: { selectedAge: string; setSelectedAge: (age: string) => void };
}) => {
  // 작품 데이터
  const [novels, setNovels] = useState<any[]>([]);

  // 작품 데이터 가져오기(type과 genre가 변경될시)
  useEffect(() => {
    const fetchNovels = async () => {
      try {
        // console.log(type, genre);
        // const response = await api.get("/novels", {
        //   // 타입과 장르에 맞는 작품
        //   params: { type, genre },
        // });
        // setNovels(response.data);

        setNovels([
          {
            id: 1,
            title: "오늘도 힘내고 싶다",
            genre: "로맨스",
            likes: 3,
            imageUrl: test,
          },
          {
            id: 2,
            title: "하핫",
            genre: "로맨스",
            likes: 3,
            imageUrl: test,
          },
          {
            id: 3,
            title: "오늘도",
            genre: "로맨스",
            likes: 3,
            imageUrl: test,
          },
          {
            id: 4,
            title: "야야",
            genre: "로맨스",
            likes: 3,
            imageUrl: test,
          },
          {
            id: 5,
            title: "잘돼라",
            genre: "로맨스",
            likes: 3,
            imageUrl: test,
          },
          {
            id: 6,
            title: "헤헤",
            genre: "로맨스",
            likes: 3,
            imageUrl: test,
          },
          {
            id: 7,
            title: "오늘도 힘내고 싶다",
            genre: "로맨스",
            likes: 3,
            imageUrl: test,
          },
          {
            id: 8,
            title: "싶다",
            genre: "로맨스",
            likes: 3,
            imageUrl: test,
          },
        ]);
      } catch (e) {
        console.error("웹소설 불러오기 실패:", e);
      }
    };
    fetchNovels();
  }, [type, genre]);

  return (
    <WebNovelGroupStyled className={clsx("group-wrap")}>
      <div className="group-titlebox">
        <div className="group-title">
          {/* 그룹의 이름 */}
          {title}
        </div>

        <div className="group-agecategory">
          {/* 연령별 */}
          {ageSelect && (
            <div className="group-ageTabs">
              {ageGroups.map((age) => (
                <span
                  key={age.value}
                  className={clsx("group-ageTab", {
                    active: ageSelect.selectedAge === age.value,
                  })}
                  onClick={() => ageSelect.setSelectedAge(age.value)}
                >
                  {age.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 작품 그룹 */}
      <div className="group-row">
        {novels.map((novel, i) => (
          <div
            key={i}
            className={`group-each ${type === "home" ? "group-rank-on" : ""}`}
          >
            <WebNovel
              title={novel.title}
              genre={novel.genre}
              likes={novel.likes}
              imageUrl={novel.imageUrl}
              type={type}
              index={i}
              id={novel.id}
            />
          </div>
        ))}
      </div>
    </WebNovelGroupStyled>
  );
};

export default WebNovelGroup;
