import { useRouter } from "next/router";
import clsx from "clsx";
import { CategoryStyled } from "./styled";

const Category = ({
  type,
  setType,
  categories,
}: {
  type: string;
  setType: (type: string) => void;
  categories: string[][];
}) => {
  const router = useRouter();

  return (
    <CategoryStyled className={clsx("category-wrap")}>
      <div className="category-box">
        {/* 첫 번째 카테고리 그룹 */}
        <div className="category-row">
          {categories[0]?.map((item, i) => (
            <div
              key={i}
              className={clsx("category-item", { active: type === item })}
              onClick={() => setType(item)}
            >
              {item}
            </div>
          ))}
        </div>

        {/* 새로쓰기 버튼 */}
        <div className="write-btn" onClick={() => router.push("/newwrite")}>
          새로쓰기
        </div>
      </div>

      {/* 두 번째 카테고리 그룹 (홈 제외) */}
      {type !== "home" && (
        <div className="category-onwrap">
          <div className="category-on">
            {categories.map((genre, i) => (
              <div key={i} className="category-item">
                {genre}
              </div>
            ))}
          </div>
        </div>
      )}
    </CategoryStyled>
  );
};

export default Category;
