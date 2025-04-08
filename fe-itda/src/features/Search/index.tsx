import api from "@/utill/api";
import { useEffect, useState } from "react";
import { SearchStyled } from "./styled";
import clsx from "clsx";
import WebNovel from "../WebNovel";

interface SearchItem {
  id: number;
  title: string;
  genre: string;
  likes: number;
  imageUrl: string;
}

const SearchResult = ({ keyword }: { keyword: string }) => {
  const [results, setResults] = useState<SearchItem[]>([]);

  useEffect(() => {
    if (!keyword || keyword.trim().length < 1) return;

    if (!keyword) return;

    const fetchSearchResults = async () => {
      try {
        const res = await api.get("/novels/search", {
          params: { query: keyword },
        });

        const novels = res.data.map((novel: any) => ({
          id: novel.id,
          title: novel.title,
          genre: novel.genre?.name || "장르없음",
          likes: novel.likeCount || 0,
          imageUrl: novel.coverImage || "/defaultCover.png", // 기본 커버 이미지 경로
        }));

        setResults(novels);
      } catch (error) {
        console.error("검색 실패:", error);
        setResults([]);
      }
    };

    fetchSearchResults();
  }, [keyword]);

  return (
    <SearchStyled className={clsx("search-wrap")}>
      {keyword && <h2>"{keyword}" 검색 결과</h2>}
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
