"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";
import { NumberBadge } from "./NumberComponents";
import { useRouter } from "next/navigation";

type CartButtonProps = {
  count?: number;
  size?: "sm" | "md" | "lg";
};

export default function CartButton({ count, size = "md" }: CartButtonProps) {
  const router = useRouter();
  const sizeStyles = {
    sm: { padding: "p-2", iconSize: "w-4 h-4" },
    md: { padding: "p-3", iconSize: "w-6 h-6" },
    lg: { padding: "p-4", iconSize: "w-8 h-8" },
  }[size];

  return (
    <div className="relative inline-block">
      <div
        className={`${sizeStyles.padding} bg-primary rounded-full shadow hover:bg-opacity-75`}
        onClick={() => router.push("/order/cart")}
      >
        <ShoppingCart className={`${sizeStyles.iconSize} text-white`} />
      </div>
      {typeof count === "number" && <NumberBadge count={count} />}
    </div>
  );
}
