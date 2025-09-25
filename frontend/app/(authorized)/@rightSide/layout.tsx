import React from "react";
import GoBackButton from "@/components/GoBackButton";

export default function LeftSideLayout(
  { children }: Readonly<{ children: React.ReactNode; }>)
{

  return (
    <div className="relative flex flex-col w-1/2 h-full min-h-[calc(100vh-75px)] pe-16 bg-white">
      <GoBackButton homePath="/organizations" hideWithNullParams className="absolute top-3 right-1"/>
      {children}
    </div>
  );
}
