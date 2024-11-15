import React from "react";
import { ShoppingCart } from "lucide-react";
import { NumberBadge } from "./NumberComponents";

type CartButtonProps = {
  count?: number;
};

export default function CartButton({ count }: CartButtonProps) {
  return (
    <div className="relative inline-block">
      <div className="p-5 bg-primary rounded-full shadow-lg">
        <ShoppingCart className="w-8 h-8 text-white" />
      </div>
      {typeof count === "number" && <NumberBadge count={count} />}
    </div>
  );
}
