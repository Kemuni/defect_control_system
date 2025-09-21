import React from "react";

export default function LeftSideLayout(
  { children }: Readonly<{ children: React.ReactNode; }>)
{
  return (
    <div className="w-full h-full min-h-screen pe-16 bg-white">
      {children}
    </div>
  );
}
