"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CartButton from "@/components/CartButton";
import MenuModal from "@/components/MenuModal";
import DisplayAllergies from "@/features/menu/DisplayAllergies";
import GenreCard from "@/components/GenreCard";

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
];

const genres = [
  {
    id: "aaaaa",
    label: "限定",
  },
  {
    id: "bbbbb",
    label: "おすすめ",
  },
  {
    id: "ccccc",
    label: "単品",
  },
  {
    id: "ddddd",
    label: "セット",
  },
  {
    id: "eeeee",
    label: "ドリンク",
  },
  {
    id: "fffff",
    label: "デザート",
  },
  {
    id: "ggggg",
    label: "物販",
  },
];

function MenuPage() {
  const [cartCount, setCartCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<
    (typeof menuItems)[0] | null
  >(null);
  const [quantity, setQuantity] = useState(1);
  const [activeGenre, setActiveGenre] = useState("ddddd");

  const handleOpenModal = (item: (typeof menuItems)[0]) => {
    setSelectedItem(item);
    setQuantity(1);
    setIsModalOpen(true);
  };

  const handleAddToCart = () => {
    setCartCount((prevCount) => prevCount + quantity);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full pb-16">
      <DisplayAllergies allergies={[]} />
      <GenreCard
        menuItems={genres}
        activeTab={activeGenre}
        setActiveTab={setActiveGenre}
      />
      <div className="p-4 space-y-4">
        {menuItems.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow">
            <div className="p-4">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600">{item.price}円</p>
              <Button
                className="mt-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                onClick={() => handleOpenModal(item)}
              >
                カートに入れる
              </Button>
            </div>
          </div>
        ))}
      </div>

      <MenuModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        selectedItem={selectedItem}
        quantity={quantity}
        onQuantityChange={setQuantity}
        onAddToCart={handleAddToCart}
      />

      <div className="fixed bottom-20 right-4">
        <CartButton count={cartCount} />
      </div>
    </div>
  );
}

export default MenuPage;
