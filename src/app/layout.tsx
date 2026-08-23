import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { BottomNav } from "@/components/bottom-nav";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "FITME | 핏미",
  description:
    "상황과 스타일을 선택하면 취향에 맞는 코디를 추천하고 저장할 수 있는 맞춤형 코디 탐색 서비스",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="mx-auto w-full max-w-md flex-1 px-5 pb-10 pt-6">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
