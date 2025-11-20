'use client';

import { useState } from 'react';
import {
  SearchInput,
  SearchResultItem,
  BottomSheet,
  MyClassItem,
} from '@/components/Search';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('인공지능');
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(['인공지능', '인공지능 윤리'])
  );
  const [myClassFavorites, setMyClassFavorites] = useState<Set<string>>(
    new Set([
      '기초프로그래밍2',
      '기독교와문화',
      '4차산업혁명을위한비판적사고',
      '영어2',
      '영어회화1',
      '채플',
      '문화리터러시와창의적스토리텔링',
      '인공지능의세계',
      '환경과웰빙(KCU)',
    ])
  );

  const searchResults = [
    '인공지능',
    '인공지능 세계',
    '인공지능 윤리',
  ];

  const myClasses = [
    '기초프로그래밍2',
    '기독교와문화',
    '4차산업혁명을위한비판적사고',
    '영어2',
    '영어회화1',
    '채플',
    '문화리터러시와창의적스토리텔링',
    '인공지능의세계',
    '환경과웰빙(KCU)',
  ];

  const handleToggleFavorite = (text: string) => {
    setFavorites((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(text)) {
        newSet.delete(text);
      } else {
        newSet.add(text);
      }
      return newSet;
    });
  };

  const handleToggleMyClassFavorite = (name: string) => {
    setMyClassFavorites((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(name)) {
        newSet.delete(name);
      } else {
        newSet.add(name);
      }
      return newSet;
    });
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleClose = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      {/* 상단 헤더 */}
      <header className="bg-white flex items-center gap-2 px-5 pt-6 pb-4">
        <h1
          className="flex-1 text-[18px] font-medium leading-[23px] text-[#101010]"
          style={{ fontFamily: 'var(--font-gmarket), sans-serif' }}
        >
          강의 보관함
        </h1>
        <button
          onClick={handleClose}
          className="w-6 h-6 flex items-center justify-center"
          aria-label="닫기"
          type="button"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 6L18 18M18 6L6 18"
              stroke="#44474C"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </header>

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
      <div className="flex-1 overflow-y-auto">
        {searchResults
          .filter((result) =>
            result.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((result) => (
            <SearchResultItem
              key={result}
              text={result}
              favorite={favorites.has(result)}
              onToggleFavorite={() => handleToggleFavorite(result)}
              onClick={() => console.log('선택:', result)}
            />
          ))}
      </div>

      {/* 하단 바텀시트 */}
      <div className="absolute bottom-0 left-0 right-0">
        <BottomSheet title="내 강의">
          {myClasses.map((className) => (
            <MyClassItem
              key={className}
              name={className}
              favorite={myClassFavorites.has(className)}
              onToggleFavorite={() => handleToggleMyClassFavorite(className)}
              onClick={() => console.log('선택:', className)}
            />
          ))}
        </BottomSheet>
      </div>
    </div>
  );
}
