import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const gmarket = localFont({
  src: [
    {
      path: "../../public/fonts/GmarketSansTTFLight.ttf",
      weight: "300",
    },
    {
      path: "../../public/fonts/GmarketSansTTFMedium.ttf",
      weight: "500",
    },
    {
      path: "../../public/fonts/GmarketSansTTFBold.ttf",
      weight: "700",
    },
  ],
  display: "swap",
  variable: "--font-gmarket",
});

export const metadata: Metadata = {
  title: "ddingduroid",
  description: "명지대학교 학생들을 위한 강의 정보 챗봇 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pretendard.variable} ${gmarket.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
