import type { Metadata } from "next";
import { Roboto_Mono, Jost } from "next/font/google";
import "../public/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const jost = Jost({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Система Контроля",
  description: "Веб-приложение для системы контроля дефектов",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${jost.variable} ${robotoMono.variable} antialiased bg-background`}
      >
        <Header />
        <div className="pt-[75px]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
