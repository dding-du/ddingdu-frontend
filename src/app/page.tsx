"use client";

import { chatAPI } from "@/api";
import {
  BotMessage,
  ChatInput,
  RecommendChip,
  UserMessage,
} from "@/components/chat/ChatBot";
import { Header } from "@/components/common/Header";
import { tokenManager } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { Key, useEffect, useState } from "react";

interface Message {
  type: "user" | "bot";
  content: any;
  timestamp: number;
}

export default function Home() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      content:
        "안녕하세요😋\n명지대학교 강의정보 챗봇 OO이에요!\n\nOO님 상황에 맞는 맞춤 정보를 드리기 위해 최선을 다할게요!\n얼마든지 물어보세요~",
      timestamp: Date.now(),
    },
  ]);
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  // 인증 체크
  useEffect(() => {
    const accessToken = tokenManager.getAccessToken();

    if (!accessToken) {
      // 토큰이 없으면 로그인 페이지로 리다이렉트
      router.replace("/login");
    } else {
      setIsAuthenticated(true);
      setIsLoading(false);
    }
  }, [router]);

  // API 응답에서 "data:" 접두사 제거하는 함수
  const cleanResponseContent = (content: string): string => {
    return content
      .split("\n")
      .map((line) => line.replace(/^data:/, "").trim())
      .join("\n");
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    setIsSendingMessage(true);

    // 사용자 메시지 추가
    const userMessage: Message = {
      type: "user",
      content: text,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // API 호출
      const response = await chatAPI.sendMessage(text);

      console.log(response);

      const rawMessage = response || "응답을 받지 못했습니다.";
      const cleanedContent = cleanResponseContent(rawMessage);

      // 봇 응답 추가
      const botMessage: Message = {
        type: "bot",
        content: cleanedContent,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      // 에러 메시지 추가
      const errorMessage: Message = {
        type: "bot",
        content: "죄송합니다. 메시지 전송에 실패했습니다. 다시 시도해주세요.",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error("메시지 전송 오류:", error);
    } finally {
      setIsSendingMessage(false);
    }
  };

  const handleSend = () => {
    if (inputValue.trim() && !isSendingMessage) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleChipClick = (text: string) => {
    if (!isSendingMessage) {
      sendMessage(text);
    }
  };

  // 로딩 중이거나 인증되지 않은 경우 빈 화면 표시
  if (isLoading || !isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white  flex flex-col">
      {/* 헤더 */}
      <Header />

      {/* Main content wrapper with max-width and centered */}
      <div className="max-w-[520px] mx-auto w-full flex-1 flex flex-col pt-[84px]">
        {/* 채팅 영역 */}
        <main className="flex-1 px-5 pb-32 overflow-y-auto">
          <div className="flex flex-col gap-1">
            {/* 봇 초기 이미지 */}
            <img src="/bot.svg" alt="botImage" className="w-[76px] h-[54px]" />

            {/* 메시지 목록 */}
            {messages.map((message, index) => {
              if (message.type === "bot") {
                return (
                  <BotMessage key={message.timestamp + index}>
                    {message.content
                      .split("\n")
                      .map((line: string, i: Key | null | undefined) => (
                        <p
                          key={i}
                          className={
                            i === message.content.split("\n").length - 1
                              ? ""
                              : "mb-0"
                          }
                        >
                          {line || "\u00A0"}
                        </p>
                      ))}
                  </BotMessage>
                );
              } else {
                return (
                  <UserMessage key={message.timestamp + index}>
                    {message.content}
                  </UserMessage>
                );
              }
            })}

            {/* 로딩 중 표시 */}
            {isSendingMessage && (
              <BotMessage>
                <p className="mb-0">답변을 생성하고 있습니다...</p>
              </BotMessage>
            )}
          </div>
        </main>

        {/* 하단 고정 영역 */}
        <div className="bg-white fixed bottom-0 pt-3 flex flex-col gap-1 pb-8">
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
              disabled={isSendingMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
