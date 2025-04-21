import WebNovel from "@/features/WebNovel";
import { WebNovelGroupStyled } from "./styled";
import clsx from "clsx";
import { useEffect, useState } from "react";
import api from "@/utill/api";
import { Empty } from "antd";

// 연령 카테고리
const ageGroups = [
  { label: "10대", value: "teen", number: 10 },
  { label: "20대", value: "twenties", number: 20 },
  { label: "30대", value: "thirties", number: 30 },
  { label: "40대", value: "forties", number: 40 },
];

interface WebNovelGroupProps {
  title: string;
  type?: string;
  genre?: string;
  ageSelect?: { selectedAge: string; setSelectedAge: (age: string) => void };
}

// 소설 그룹
const WebNovelGroup = ({
  title,
  type,
  genre,
  ageSelect,
}: WebNovelGroupProps) => {
  const [novels, setNovels] = useState<any[]>([]);

  useEffect(() => {
    const fetchNovels = async () => {
      try {
        let response;

        if (type === "mywrite") {
          // 내가 쓴글
          response = await api.get("/novels/my");
        } else if (type === "myfavorite") {
          // 내 찜
          response = await api.get("/likes/my-likes");
        } else if (type === "home") {
          // 홈화면
          if (ageSelect?.selectedAge) {
            // 연령별 랭킹
            const ageNum = ageGroups.find(
              (age) => age.value === ageSelect.selectedAge
            )?.number;
            response = await api.get("/novels/rankings", {
              params: { age: Number(ageNum) },
            });
          } else {
            // 통합 랭킹
            response = await api.get("/novels/rankings");
          }
        } else {
          // 출품작
          if (type === "exhibit") {
            const res = await api.get("novels/published");
            // 장르
            const filtered =
              genre && genre !== "all"
                ? res.data.filter(
                    (novel: { genre: { value: string } }) =>
                      novel.genre?.value === genre
                  )
                : res.data;

            setNovels(filtered);
          } else if (type === "new") {
            // 이어쓰기

            // 장르
            const params: any = {};

            if (type) params.type = type;

            const ageValues = ageGroups.map((age) => age.value);
            if (genre && genre !== "all" && !ageValues.includes(genre)) {
              params.genre = genre;
            }

            if (ageSelect?.selectedAge) {
              const ageNum = ageGroups.find(
                (age) => age.value === ageSelect.selectedAge
              )?.number;
              if (ageNum) {
                params.age = ageNum;
              }
            }
            response = await api.get("/novels/filter", { params });
          }
        }

        if (response) {
          setNovels(response.data);
        }
      } catch (e) {
        console.error("웹소설 불러오기 실패:", e);
      }
    };

    fetchNovels();
  }, [type, genre, ageSelect?.selectedAge]);

  return (
    <WebNovelGroupStyled className={clsx("group-wrap")}>
      <div
        className={`group-titlebox ${
          type === "home" || type === "myfavorite" || type === "mywrite"
            ? ""
            : "titlebox-off"
        }`}
      >
        <div
          className={
            type === "myfavorite" || type === "mywrite"
              ? "myfavorite-title"
              : "group-title"
          }
        >
          {title}
        </div>

        <div className="group-agecategory">
          {/* 연령 카테고리 */}
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
      {novels.length !== 0 ? (
        <div className="group-row">
          {novels.map((novel, i) => {
            const statusBasedType =
              novel.status === "submitted" ? "exhibit" : type;

            return (
              <div
                key={i}
                className={`group-each ${
                  type === "home" ? "group-rank-on" : ""
                }`}
              >
                <WebNovel
                  title={novel.title}
                  genre={novel.genre}
                  likes={
                    typeof novel.likes === "number"
                      ? novel.likes
                      : Array.isArray(novel.likes)
                      ? novel.likes.length
                      : 0
                  }
                  imageUrl={novel.imageUrl}
                  type={statusBasedType}
                  index={i}
                  id={novel.id}
                  views={novel.viewCount}
                  createdAt={novel.created_at}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </WebNovelGroupStyled>
  );
};

export default WebNovelGroup;
