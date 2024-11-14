import React from "react";
import { ShoppingCart } from "lucide-react";

type CartButtonProps = {
  count?: number;
};

export default function CartButton({ count }: CartButtonProps) {
  return (
    <div className="relative inline-block">
      <div className="p-3 bg-[#FFBC51] rounded-full">
        <ShoppingCart className="w-6 h-6 text-white" />
      </div>
      {typeof count === "number" && (
        <div className="absolute -top-0.5 -right-0.5 bg-[#FF0211] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </div>
      )}
    </div>
  );
}
