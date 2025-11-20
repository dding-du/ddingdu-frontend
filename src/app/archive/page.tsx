"use client";

import {
  BottomSheet,
  MyClassItem,
  SearchInput,
  SearchResultItem,
} from "@/components/search/Search";
import { PageHeader } from "@/components/common/PageHeader";
import { useState } from "react";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("인공지능");

  // 내 강의 목록 상태 (동적으로 추가/제거 가능)
  const [myClasses, setMyClasses] = useState<string[]>([
    "기초프로그래밍2",
    "기독교와문화",
    "4차산업혁명을위한비판적사고",
    "영어2",
    "영어회화1",
    "채플",
    "문화리터러시와창의적스토리텔링",
    "인공지능의세계",
    "환경과웰빙(KCU)",
  ]);

  // 바텀시트 확장/축소 상태
  const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false);

  // 검색 가능한 전체 강의 목록
  const allClasses = [
    "인공지능",
    "인공지능 세계",
    "인공지능 윤리",
    "기초프로그래밍2",
    "기독교와문화",
    "4차산업혁명을위한비판적사고",
    "영어2",
    "영어회화1",
    "채플",
    "문화리터러시와창의적스토리텔링",
    "인공지능의세계",
    "환경과웰빙(KCU)",
    "데이터구조",
    "알고리즘",
    "웹프로그래밍",
    "모바일프로그래밍",
  ];

  // 검색어에 맞는 강의 필터링
  const searchResults = allClasses.filter((className) =>
    className.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 검색 결과를 내 강의에 추가
  const handleAddToMyClass = (className: string) => {
    if (!myClasses.includes(className)) {
      setMyClasses((prev) => [...prev, className]);
      console.log(`"${className}" 강의를 내 강의에 추가했습니다.`);
    }
  };

  // 내 강의에서 제거
  const handleRemoveFromMyClass = (className: string) => {
    setMyClasses((prev) => prev.filter((c) => c !== className));
    console.log(`"${className}" 강의를 내 강의에서 제거했습니다.`);
  };

  // 검색 결과 항목 클릭 시: 내 강의에 추가/제거 토글
  const handleSearchResultClick = (className: string) => {
    if (myClasses.includes(className)) {
      handleRemoveFromMyClass(className);
    } else {
      handleAddToMyClass(className);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleClose = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      {/* 상단 헤더 */}
      <PageHeader title="강의 보관함" showClose onClose={handleClose} />

      {/* 검색 입력창 */}
      <div className="px-5 py-2">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={handleClearSearch}
          placeholder="검색어를 입력하세요"
        />
      </div>

      {/* 검색 결과 */}
      <div className="flex-1 overflow-y-auto pb-[300px]">
        {searchResults.map((result) => (
          <SearchResultItem
            key={result}
            text={result}
            favorite={myClasses.includes(result)}
            onToggleFavorite={() => handleSearchResultClick(result)}
            onClick={() => handleSearchResultClick(result)}
          />
        ))}
      </div>

      {/* 하단 바텀시트 */}
      <div className="absolute bottom-0 left-0 right-0">
        <BottomSheet
          title="내 강의"
          isExpanded={isBottomSheetExpanded}
          onToggle={() => setIsBottomSheetExpanded(!isBottomSheetExpanded)}
        >
          {myClasses.map((className) => (
            <MyClassItem
              key={className}
              name={className}
              favorite={true}
              onToggleFavorite={() => handleRemoveFromMyClass(className)}
              onClick={() => handleRemoveFromMyClass(className)}
            />
          ))}
        </BottomSheet>
      </div>
    </div>
  );
}
