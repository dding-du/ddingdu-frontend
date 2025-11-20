"use client";

import { courseAPI, handleApiError } from "@/api";
import type { LectureResponseDto } from "@/api/types";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchInput, SearchResultItem } from "@/components/search/Search";
import { useEffect, useState } from "react";

interface ClassInfo {
  name: string;
  professor: string;
}

interface ClassInfoWithId extends ClassInfo {
  lectureId: number;
}

type DisplayListItem = ClassInfo | ClassInfoWithId;

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"name" | "professor" | "code">(
    "name"
  );
  const [searchResults, setSearchResults] = useState<LectureResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 내 강의 목록 상태 (동적으로 추가/제거 가능)
  const [myClasses, setMyClasses] = useState<string[]>([
    "4차산업혁명을위한비판적사고",
    "기독교와문화",
    "기초프로그래밍2",
    "문화리터러시와창의적스토리텔링",
    "영어회화1",
    "영어2",
    "인공지능의세계",
    "채플",
    "환경과웰빙(KCU)",
  ]);

  // 검색 가능한 전체 강의 목록 (교수 이름 포함)
  const allClasses: ClassInfo[] = [
    { name: "4차산업혁명을위한비판적사고", professor: "권향숙" },
    { name: "기독교와문화", professor: "김제민" },
    { name: "기초프로그래밍2", professor: "이강선" },
    { name: "문화리터러시와창의적스토리텔링", professor: "이영아" },
    { name: "영어회화1", professor: "메이어호퍼" },
    { name: "영어2", professor: "전미경" },
    { name: "인공지능의세계", professor: "김제민" },
    { name: "채플", professor: "교목실S" },
    { name: "환경과웰빙(KCU)", professor: "김한수" },
    { name: "인공지능", professor: "홍길동" },
    { name: "인공지능 윤리", professor: "박영희" },
    { name: "데이터구조", professor: "이철수" },
    { name: "알고리즘", professor: "김영수" },
    { name: "웹프로그래밍", professor: "박지성" },
    { name: "모바일프로그래밍", professor: "손흥민" },
  ];

  // 검색 API 호출
  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        let results: LectureResponseDto[] = [];

        if (searchType === "name") {
          results = await courseAPI.searchByLectureName(searchQuery);
        } else if (searchType === "professor") {
          results = await courseAPI.searchByProfessor(searchQuery);
        } else if (searchType === "code") {
          results = await courseAPI.searchByLectureCode(searchQuery);
        }

        setSearchResults(results);
      } catch (error) {
        const errorMessage = handleApiError(error);
        console.error("검색 오류:", errorMessage);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    // 디바운스: 500ms 후에 검색 실행
    const timeoutId = setTimeout(performSearch, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchType]);

  // 화면에 표시할 리스트 (검색어가 없으면 내 강의, 있으면 검색 결과)
  const displayList: DisplayListItem[] =
    searchQuery.trim() === ""
      ? allClasses.filter((c) => myClasses.includes(c.name))
      : searchResults.map(
          (lecture): ClassInfoWithId => ({
            name: lecture.lectureName,
            professor: lecture.professorName,
            lectureId: lecture.lectureId,
          })
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
    <div className="min-h-screen bg-white flex flex-col">
      {/* 상단 헤더 */}
      <PageHeader title="강의 보관함" showClose onClose={handleClose} />

      <div className="max-w-[520px] mx-auto w-full flex-1 flex flex-col relative">
        {/* 검색 입력창 */}
        <div className="px-5 py-2">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={handleClearSearch}
            placeholder="검색어를 입력하세요"
          />
        </div>

        {/* 라디오 버튼 - 검색 타입 선택 */}
        <div className="flex gap-4 items-center px-8 py-2">
          <button
            onClick={() => setSearchType("name")}
            className="flex items-center gap-1 cursor-pointer"
          >
            <div className="w-[18px] h-[18px] flex items-center justify-center">
              {searchType === "name" ? (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle
                    cx="9"
                    cy="9"
                    r="7.5"
                    stroke="#87a7e8"
                    strokeWidth="1.5"
                  />
                  <circle cx="9" cy="9" r="4.5" fill="#87a7e8" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle
                    cx="9"
                    cy="9"
                    r="7.5"
                    stroke="#a3a7ad"
                    strokeWidth="1.5"
                  />
                </svg>
              )}
            </div>
            <span className="body-m-regular text-[#101010]">강의명</span>
          </button>

          <button
            onClick={() => setSearchType("professor")}
            className="flex items-center gap-1 cursor-pointer"
          >
            <div className="w-[18px] h-[18px] flex items-center justify-center">
              {searchType === "professor" ? (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle
                    cx="9"
                    cy="9"
                    r="7.5"
                    stroke="#87a7e8"
                    strokeWidth="1.5"
                  />
                  <circle cx="9" cy="9" r="4.5" fill="#87a7e8" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle
                    cx="9"
                    cy="9"
                    r="7.5"
                    stroke="#a3a7ad"
                    strokeWidth="1.5"
                  />
                </svg>
              )}
            </div>
            <span className="body-m-regular text-[#101010]">교수명</span>
          </button>

          <button
            onClick={() => setSearchType("code")}
            className="flex items-center gap-1 cursor-pointer"
          >
            <div className="w-[18px] h-[18px] flex items-center justify-center">
              {searchType === "code" ? (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle
                    cx="9"
                    cy="9"
                    r="7.5"
                    stroke="#87a7e8"
                    strokeWidth="1.5"
                  />
                  <circle cx="9" cy="9" r="4.5" fill="#87a7e8" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle
                    cx="9"
                    cy="9"
                    r="7.5"
                    stroke="#a3a7ad"
                    strokeWidth="1.5"
                  />
                </svg>
              )}
            </div>
            <span className="body-m-regular text-[#101010]">강좌번호</span>
          </button>
        </div>

        {/* 검색 결과 또는 내 강의 목록 */}
        <div className="flex-1 overflow-y-auto pb-10">
          {displayList
            .sort((a, b) => a.name.localeCompare(b.name, "ko-KR"))
            .map((classInfo, index) => {
              const uniqueKey =
                "lectureId" in classInfo && classInfo.lectureId
                  ? `lecture-${classInfo.lectureId}`
                  : `local-${classInfo.name}-${classInfo.professor}-${index}`;

              return (
                <SearchResultItem
                  key={uniqueKey}
                  text={classInfo.name}
                  professor={classInfo.professor}
                  favorite={myClasses.includes(classInfo.name)}
                  onToggleFavorite={() =>
                    handleSearchResultClick(classInfo.name)
                  }
                  onClick={() => handleSearchResultClick(classInfo.name)}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
