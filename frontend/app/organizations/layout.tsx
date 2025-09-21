import type { Metadata } from "next";
import "@/public/styles/globals.css";


export const metadata: Metadata = {
  title: "Система Контроля",
  description: "Веб-приложение для системы контроля дефектов",
};

export default function RootLayout({
  leftSide, rightSide
}: Readonly<{
  leftSide?: React.ReactNode;
  rightSide?: React.ReactNode;
}>) {
  return (
    <div className="hidden md:flex gap-4.5">{leftSide}{rightSide}</div>
  );
}
