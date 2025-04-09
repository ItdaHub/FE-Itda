import WebNovel from "@/features/WebNovel";
import { WebNovelGroupStyled } from "./styled";
import clsx from "clsx";
import { useEffect, useState } from "react";
import api from "@/utill/api";

// 연령 카테고리
const ageGroups = [
  { label: "10대", value: "teen", number: 10 },
  { label: "20대", value: "twenties", number: 20 },
  { label: "30대", value: "thirties", number: 30 },
  { label: "40대", value: "forties", number: 40 },
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
  const [novels, setNovels] = useState<any[]>([]);

  useEffect(() => {
    const fetchNovels = async () => {
      try {
        let response;

        if (type === "mywrite") {
          response = await api.get("/novels/my");
        } else if (type === "home" || genre === "rank") {
          response = await api.get("/novels"); // 기본 목록 불러오기
        } else {
          const params: any = {};

          if (type) params.type = type;

          // genre는 연령값이 아닌 경우만 추가
          const ageValues = ageGroups.map((age) => age.value);
          // genre는 연령값이 아닌 경우만 추가하고, 'all'은 제외
          if (genre && genre !== "all" && !ageValues.includes(genre)) {
            params.genre = genre;
            console.log("보낼 params:", params);
          }

          // 선택된 연령 값을 숫자로 변환해서 전달
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

        setNovels(response.data);
      } catch (e) {
        console.error("웹소설 불러오기 실패:", e);
      }
    };

    fetchNovels();
  }, [type, genre, ageSelect?.selectedAge]);

  return (
    <WebNovelGroupStyled className={clsx("group-wrap")}>
      <div className="group-titlebox">
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
              views={novel.views}
              createdAt={novel.createdAt}
            />
          </div>
        ))}
      </div>
    </WebNovelGroupStyled>
  );
};

export default WebNovelGroup;
