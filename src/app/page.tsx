"use client";

import {
  BotMessage,
  ChatInput,
  RecommendChip,
  UserMessage,
} from "@/components/chat/ChatBot";
import { Header } from "@/components/common/Header";
import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      console.log("전송:", inputValue);
      setInputValue("");
    }
  };

  const handleChipClick = (text: string) => {
    console.log("추천 질문 클릭:", text);
  };

  return (
    <div className="min-h-screen bg-white  flex flex-col">
      {/* 헤더 */}
      <Header serviceName="MyPlace" />

      {/* Main content wrapper with max-width and centered */}
      <div className="max-w-[520px] mx-auto w-full flex-1 flex flex-col pt-[84px]">
        {/* 채팅 영역 */}
        <main className="flex-1 px-5 overflow-y-auto">
          <div className="flex flex-col gap-1">
            {/* 봇 초기 메시지 */}
            <img src="/bot.svg" alt="botImage" className="w-[76px] h-[54px]" />
            <BotMessage>
              <p className="mb-0">안녕하세요😋</p>
              <p className="mb-0">명지대학교 강의정보 챗봇 OO이에요!</p>
              <p className="mb-0">&nbsp;</p>
              <p className="mb-0">
                OO님 상황에 맞는 맞춤 정보를 드리기 위해 최선을 다할게요!
              </p>
              <p>얼마든지 물어보세요~</p>
            </BotMessage>

            {/* 사용자 메시지 1 */}
            <UserMessage>중간고사 없는 융소 전공 과목 알려줘</UserMessage>

            {/* 봇 응답 1 */}
            <BotMessage>
              <p className="mb-0">
                중간고사가 없는 융소 전공 과목은 다음과 같습니다.
              </p>
              <p className="mb-0">OOO 교수님 - OOOOOOOOO</p>
              <p className="mb-0">OOO 교수님 - OOOOOOOOO</p>
              <p className="mb-0">OOO 교수님 - OOOOOOOOO</p>
              <p className="mb-0">OOO 교수님 - OOOOOOOOO</p>
              <p>OOO 교수님 - OOOOOOOOO</p>
            </BotMessage>

            {/* 사용자 메시지 2 */}
            <UserMessage>AI 관련 수업 전부 찾아줘</UserMessage>
          </div>
        </main>

        {/* 하단 고정 영역 */}
        <div className="bg-white flex flex-col gap-1 pb-8">
          {/* 추천 질문 칩들 */}
          <div className="px-5 py-0">
            <div className="flex gap-2 overflow-x-auto">
              <RecommendChip
                text="N/P 교양 강의 궁금해!"
                onClick={() => handleChipClick("N/P 교양 강의 궁금해!")}
              />
              <RecommendChip
                text="팀프로젝트 없는 교양 과목 알려줘"
                onClick={() =>
                  handleChipClick("팀프로젝트 없는 교양 과목 알려줘")
                }
              />
              <RecommendChip
                text="성적 F 처리 기준이 뭔지 알려줘!"
                onClick={() =>
                  handleChipClick("성적 F 처리 기준이 뭔지 알려줘!")
                }
              />
            </div>
          </div>

          {/* 입력창 */}
          <div className="bg-white px-5 py-2">
            <ChatInput
              value={inputValue}
              onChange={setInputValue}
              onSend={handleSend}
              placeholder="강의정보 무엇이든 물어보세요"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
