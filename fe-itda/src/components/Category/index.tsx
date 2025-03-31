import clsx from "clsx";
import { CategoryStyled } from "./styled";
import { useState } from "react";
import { useRouter } from "next/router";

const Category = () => {
  const router = useRouter();

  // 카테고리 유무
  const [type, setType] = useState<string>("home");

  const categoryData = [
    ["홈", "릴레이북", "출품작"],
    ["전체", "로맨스", "로판", "판타지", "현판", "무협", "미스터리"],
  ];

  return (
    <CategoryStyled className={clsx("category-wrap")}>
      <div className="category-box">
        {/* 카테고리 */}
        <div className="category-row">
          <div
            className="category-item"
            onClick={() => {
              setType("home");
            }}
          >
            홈
          </div>
          <div
            className="category-item"
            onClick={() => {
              setType("book");
            }}
          >
            릴레이북
          </div>
          <div
            className="category-item"
            onClick={() => {
              setType("book");
            }}
          >
            출품작
          </div>
        </div>
        <div
          onClick={() => {
            router.push("/newwrite");
          }}
        >
          새로쓰기
        </div>
      </div>

      <div className={type === "home" ? "category-off" : "category-onwrap"}>
        <div className="category-on">
          {categoryData[1].map((item, i) => (
            <div key={i} className="category-item">
              {item}
            </div>
          ))}
        </div>
      </div>
    </CategoryStyled>
  );
};

export default Category;
