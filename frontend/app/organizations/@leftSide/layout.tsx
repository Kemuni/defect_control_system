import React from "react";

export default function LeftSideLayout(
  { children }: Readonly<{ children: React.ReactNode; }>)
{
  return (
    <div className="w-full h-full min-h-screen pl-16">
      {children}
    </div>
  );
}
