import React from "react";
import { Button } from "@/components/ui/button";

type Props = {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
};

function MenuCard({ id, name, price, imgUrl }: Props) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4">
        <img
          src={imgUrl}
          alt=""
          className="h-36 w-full rounded-lg object-cover"
        />
        <div className="mt-2 row-span-3">
          <p className="font-semibold">{name}</p>
          <div className="flex items-end justify-between">
            <p>
              ￥<span className="text-2xl font-extrabold">{price}</span>
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
