import React from "react";

export default function LeftSideLayout(
  { children }: Readonly<{ children: React.ReactNode; }>)
{
  return (
    <div className="flex flex-col w-1/2 h-full min-h-[calc(100vh-75px)] pl-16">
      {children}
    </div>
  );
}
