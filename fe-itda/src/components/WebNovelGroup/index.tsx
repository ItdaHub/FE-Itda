import WebNovel from "@/features/WebNovel";
import { WebNovelGroupStyled } from "./styled";
import clsx from "clsx";
import { useEffect, useState } from "react";
import api from "@/utill/api";
import { Empty } from "antd";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hooks";

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
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  if (type === "mywrite" || type === "myfavorite") {
    useEffect(() => {
      if (!user) {
        router.replace("/login"); // 로그인 안 되어있으면 로그인 페이지로 이동
      }
    }, [user, router]);

    if (!user) return null;
  }

  useEffect(() => {
    const fetchNovels = async () => {
      try {
        let response;

        if (type === "mywrite") {
          response = await api.get("/novels/my");
        } else if (type === "myfavorite") {
          response = await api.get("/likes/my-likes");
        } else if (type === "home") {
          // 홈화면: 통합 랭킹 또는 연령별 랭킹
          if (ageSelect?.selectedAge) {
            const ageNum = ageGroups.find(
              (age) => age.value === ageSelect.selectedAge
            )?.number;
            response = await api.get("/novels/rankings", {
              params: { age: Number(ageNum) },
            });
          } else {
            response = await api.get("/novels/rankings");
          }
        } else {
          const params: any = {};

          if (type) params.type = type;

          const ageValues = ageGroups.map((age) => age.value);
          if (genre && genre !== "all" && !ageValues.includes(genre)) {
            params.genre = genre;
            console.log("보낼 params:", params);
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
      <>
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
            {novels.map((novel, i) => (
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
                  type={type}
                  index={i}
                  id={novel.id}
                  views={novel.viewCount}
                  createdAt={novel.created_at}
                />
              </div>
            ))}
          </div>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </>
    </WebNovelGroupStyled>
  );
};

export default WebNovelGroup;
