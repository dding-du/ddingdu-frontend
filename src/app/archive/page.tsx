"use client";

import { courseAPI, handleApiError, userAPI } from "@/api";
import type { LectureResponseDto, TakeResponseDto } from "@/api/types";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchInput, SearchResultItem } from "@/components/search/Search";
import { useEffect, useState } from "react";

interface ClassInfoWithId {
  id: number;
  name: string;
  professor: string;
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"name" | "professor" | "code">(
    "name"
  );
  const [searchResults, setSearchResults] = useState<LectureResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMyLectures, setIsLoadingMyLectures] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);

  // 내 강의 목록 상태 (API에서 가져온 데이터)
  const [myLectures, setMyLectures] = useState<TakeResponseDto[]>([]);

  // 내 강의 이름 목록 (기존 로직 호환성 유지)
  const myClasses = myLectures.map((lecture) => lecture.lectureName);

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

  // 사용자 정보 및 내 강의 목록 가져오기
  useEffect(() => {
    const fetchUserAndLectures = async () => {
      try {
        setIsLoadingMyLectures(true);

        // 1. 사용자 정보 조회
        const userInfo = await userAPI.getMyInfo();
        setUserId(userInfo.userId);

        // 2. 내 강의 목록 조회
        const lectures = await courseAPI.getMyLectures(userInfo.userId);
        setMyLectures(lectures);
      } catch (error) {
        const errorMessage = handleApiError(error);
        console.error("내 강의 조회 오류:", errorMessage);
        // 에러 발생 시 빈 배열로 설정
        setMyLectures([]);
      } finally {
        setIsLoadingMyLectures(false);
      }
    };

    fetchUserAndLectures();
  }, []);

  // 화면에 표시할 리스트 (검색어가 없으면 내 강의, 있으면 검색 결과)
  const displayList: ClassInfoWithId[] =
    searchQuery.trim() === ""
      ? myLectures.map(
          (lecture): ClassInfoWithId => ({
            name: lecture.lectureName,
            professor: lecture.professorName,
            id: lecture.id,
          })
        )
      : searchResults.map(
          (lecture): ClassInfoWithId => ({
            name: lecture.lectureName,
            professor: lecture.professorName,
            id: lecture.id,
          })
        );

  // 검색 결과를 내 강의에 추가
  const handleAddToMyClass = async (classInfo: ClassInfoWithId) => {
    // userId가 있는 경우에만 API 호출
    if (userId !== null) {
      try {
        console.log(classInfo);
        await courseAPI.takeLecture(classInfo.id, userId);
        // API 성공 시에만 로컬 상태 업데이트
        const isAlreadyAdded = myLectures.some(
          (lecture) => lecture.id === classInfo.id
        );
        if (!isAlreadyAdded) {
          // 새로운 강의 객체 생성하여 추가
          const newLecture: TakeResponseDto = {
            id: classInfo.id,
            lectureName: classInfo.name,
            professorName: classInfo.professor,
            lectureCode: "",
            lectureId: 0,
          };
          setMyLectures((prev) => [...prev, newLecture]);
          console.log(`"${classInfo.name}" 강의를 내 강의에 추가했습니다.`);
        }
      } catch (error) {
        const errorMessage = handleApiError(error);
        console.error("강의 추가 오류:", errorMessage);
        alert(`강의 추가에 실패했습니다: ${errorMessage}`);
      }
    }
  };

  // 내 강의에서 제거
  const handleRemoveFromMyClass = async (classInfo: ClassInfoWithId) => {
    // userId가 있는 경우에만 API 호출
    if (userId !== null) {
      try {
        await courseAPI.dropLecture(classInfo.id, userId);
        // API 성공 시에만 로컬 상태 업데이트
        setMyLectures((prev) =>
          prev.filter((lecture) => lecture.id !== classInfo.id)
        );
        console.log(`"${classInfo.name}" 강의를 내 강의에서 제거했습니다.`);
      } catch (error) {
        const errorMessage = handleApiError(error);
        console.error("강의 제거 오류:", errorMessage);
        alert(`강의 제거에 실패했습니다: ${errorMessage}`);
      }
    }
  };

  // 검색 결과 항목 클릭 시: 내 강의에 추가/제거 토글
  const handleSearchResultClick = (classInfo: ClassInfoWithId) => {
    const isInMyLectures = myLectures.some(
      (lecture) => lecture.id === classInfo.id
    );
    if (isInMyLectures) {
      handleRemoveFromMyClass(classInfo);
    } else {
      handleAddToMyClass(classInfo);
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
          {isLoadingMyLectures && searchQuery.trim() === "" ? (
            <div className="flex items-center justify-center py-10">
              <p className="body-m-regular text-[#a3a7ad]">
                강의 목록을 불러오는 중...
              </p>
            </div>
          ) : displayList.length === 0 ? (
            <div className="flex items-center justify-center py-10">
              <p className="body-m-regular text-[#a3a7ad]">
                {searchQuery.trim() === ""
                  ? "등록된 강의가 없습니다."
                  : "검색 결과가 없습니다."}
              </p>
            </div>
          ) : (
            displayList
              .sort((a, b) => a.name.localeCompare(b.name, "ko-KR"))
              .map((classInfo, index) => {
                const uniqueKey = `lecture-${classInfo.id}`;

                return (
                  <SearchResultItem
                    key={uniqueKey}
                    text={classInfo.name}
                    professor={classInfo.professor}
                    favorite={myLectures.some(
                      (lecture) => lecture.id === classInfo.id
                    )}
                    onToggleFavorite={() => handleSearchResultClick(classInfo)}
                  />
                );
              })
          )}
        </div>
      </div>
    </div>
  );
}
