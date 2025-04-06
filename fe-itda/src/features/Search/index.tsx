import api from "@/utill/api";
import { useEffect, useState } from "react";
import { SearchStyled } from "./styled";
import clsx from "clsx";

interface SearchItem {
  id: string;
  title: string;
}

const dummyData: SearchItem[] = [
  { id: "1", title: "첫 번째 더미 소설" },
  { id: "2", title: "두 번째 소설 제목" },
  { id: "3", title: "제목에 포함된 예시" },
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
      <div>
        <h2>“{keyword}” 검색 결과</h2>
        {results.length === 0 ? (
          <p>검색 결과가 없습니다.</p>
        ) : (
          results.map((item) => (
            <div key={item.id}>
              <h3>{item.title}</h3>
            </div>
          ))
        )}
      </div>
    </SearchStyled>
  );
};

export default SearchResult;
