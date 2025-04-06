import api from "@/utill/api";
import { useEffect, useState } from "react";
import { SearchStyled } from "./styled";
import clsx from "clsx";
import test from "@/assets/images/testImage.png";
import { StaticImageData } from "next/image";
import WebNovel from "../WebNovel";

interface SearchItem {
  id: number;
  title: string;
  genre: string;
  likes: number;
  imageUrl: string | StaticImageData;
}

const dummyData: SearchItem[] = [
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
    title: "야야",
    genre: "로맨스",
    likes: 3,
    imageUrl: test,
  },
  {
    id: 4,
    title: "오늘도 힘내고 싶다",
    genre: "로맨스",
    likes: 4,
    imageUrl: test,
  },
  {
    id: 5,
    title: "하핫",
    genre: "로맨스",
    likes: 5,
    imageUrl: test,
  },
  {
    id: 6,
    title: "야야",
    genre: "로맨스",
    likes: 6,
    imageUrl: test,
  },
];

const SearchResult = ({ keyword }: { keyword: string }) => {
  const [results, setResults] = useState<SearchItem[]>([]);

  useEffect(() => {
    if (!keyword) return;

    // 검색 키워드를 포함한 데이터만 필터링
    const filtered = dummyData.filter((item) =>
      item.title.toLowerCase().includes(keyword.toLowerCase())
    );

    setResults(filtered);
    // const getSearch = async () => {
    //   try {
    //     const response = await api.get(
    //       `/api/search?keyword=${encodeURIComponent(keyword)}`
    //     );
    //     setResults(response.data); // axios는 .data로 결과를 받음
    //   } catch (error) {
    //     console.error("검색 실패:", error);
    //   }
    // };

    // getSearch();
  }, [keyword]);

  return (
    <SearchStyled className={clsx("search-wrap")}>
      {keyword && <h2>“{keyword}” 검색 결과</h2>}
      <div className="group-row">
        {results.length === 0 ? (
          <div className="no-result">검색 결과가 없습니다.</div>
        ) : (
          results.map((novel, i) => (
            <div key={novel.id} className="group-each">
              <WebNovel
                title={novel.title}
                genre={novel.genre}
                likes={novel.likes}
                imageUrl={novel.imageUrl}
                // type="search"
                index={i}
                id={novel.id}
              />
            </div>
          ))
        )}
      </div>
    </SearchStyled>
  );
};

export default SearchResult;
