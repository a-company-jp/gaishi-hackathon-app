import React from "react";

type NumberBadgeProps = {
  count: number;
};

export function NumberBadge({ count }: NumberBadgeProps) {
  return (
    <div className="absolute -top-0.5 -right-0.5 bg-[#FF0211] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
      {count}
    </div>
  );
}
