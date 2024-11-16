import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Dictionary } from "@/app/types/dictionary";

type Props = {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  setSelectedItemId: (id: string) => void;
  setIsModalOpen: (open: boolean) => void;
  disabled: boolean;
  dict: Dictionary;
};

function MenuCard({
  id,
  name,
  price,
  imgUrl,
  setSelectedItemId,
  setIsModalOpen,
  disabled,
  dict,
}: Props) {
  return (
    <div
      className={`bg-white rounded-lg shadow ${disabled ? "bg-gray-400 opacity-40" : ""}`}
    >
      <div className="p-4">
        <Image
          src={imgUrl}
          alt=""
          width={100}
          height={100}
          className="h-36 w-full rounded-lg object-cover"
        />
        <div className="mt-2 row-span-3">
          <p className="font-semibold">{name}</p>
          <div className="mt-2 flex items-end justify-between">
            <p>
              ￥<span className="text-2xl font-extrabold">{price}</span>
            </p>
            <Button
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-800"
              onClick={() => {
                setSelectedItemId(id);
                setIsModalOpen(true);
              }}
              disabled={disabled}
            >
              {dict.order.menu.addToCart}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuCard;
