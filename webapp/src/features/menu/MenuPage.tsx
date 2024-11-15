import React from "react";
import { Button } from "@/components/ui/button";
import CartButton from "@/components/CartButton";

const menuItems = [
  {
    name: "天ぷら蕎麦定食",
    price: 1200,
    image: "/placeholder.svg?height=150&width=300",
  },
  {
    name: "オムレツ",
    price: 900,
    image: "/placeholder.svg?height=150&width=300",
  },
  {
    name: "サラダボウル",
    price: 800,
    image: "/placeholder.svg?height=150&width=300",
  },
  {
    name: "グリルチキン",
    price: 1100,
    image: "/placeholder.svg?height=150&width=300",
  },
  {
    name: "ベジタリアンパスタ",
    price: 1000,
    image: "/placeholder.svg?height=150&width=300",
  },
  {
    name: "ベジタリアンパスタ",
    price: 1000,
    image: "/placeholder.svg?height=150&width=300",
  },
  {
    name: "ベジタリアンパスタ",
    price: 1000,
    image: "/placeholder.svg?height=150&width=300",
  },
  {
    name: "ベジタリアンパスタ",
    price: 1000,
    image: "/placeholder.svg?height=150&width=300",
  },
  {
    name: "ベジタリアンパスタ",
    price: 1000,
    image: "/placeholder.svg?height=150&width=300",
  },
];

function MenuPage() {
  return (
    <div className="flex flex-col w-full pb-16">
      <div className="p-4 space-y-4">
        {menuItems.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow">
            <div className="p-4">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600">{item.price}円</p>
              <Button className="mt-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800">
                カートに入れる
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed bottom-20 right-4">
        <CartButton count={10} />
      </div>
    </div>
  );
}

export default MenuPage;
