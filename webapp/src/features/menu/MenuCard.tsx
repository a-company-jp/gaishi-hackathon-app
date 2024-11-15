import React from "react";
import { Button } from "@/components/ui/button";

function MenuCard() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4">
        <img
          src="/placeholder.svg"
          alt=""
          className="h-36 w-full rounded-lg object-cover"
        />
        <div className="mt-2 row-span-3">
          <p className="font-semibold">焼き鳥盛り合わせ</p>
          <div className="flex items-end justify-between">
            <p>
              ￥<span className="text-2xl font-extrabold">1,200</span>
            </p>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800">
              カートに入れる
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuCard;
