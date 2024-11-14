import React from "react";
import { ShoppingCart } from "lucide-react";
import { NumberBadge } from "./NumberComponents";

type CartButtonProps = {
  count?: number;
};

export default function CartButton({ count }: CartButtonProps) {
  return (
    <div className="relative inline-block">
      <div className="p-3 bg-[#FFBC51] rounded-full">
        <ShoppingCart className="w-6 h-6 text-white" />
      </div>
      {typeof count === "number" && <NumberBadge count={count} />}
    </div>
  );
}
