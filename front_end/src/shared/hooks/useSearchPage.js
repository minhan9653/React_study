// shared/hooks/useSearchPage.js
import { useEffect, useState } from "react";

export function useSearchPage(initialValues, fetchFn) {
  const [searchValues, setSearchValues] = useState(initialValues);
  const [data, setData] = useState([]);

  async function search() {
    console.log("검색 조건:", searchValues);

    // 🔜 API 열리면 주석 해제
    const result = await fetchFn(searchValues);
    setData(result);
  }

  function reset() {
    setSearchValues(initialValues);
  }

  /* 🔥 페이지 진입 시 자동 조회 */
  useEffect(() => {
    search();
  }, []);

  return {
    searchValues,
    setSearchValues,
    data,
    setData,
    actions: {
      search: [
        { key: "search", label: "조회", onClick: search },
        { key: "reset", label: "초기화", onClick: reset },
      ],
    },
  };
}
