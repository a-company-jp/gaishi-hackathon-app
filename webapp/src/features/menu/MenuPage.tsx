"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CartButton from "@/components/CartButton";
import MenuModal from "@/components/MenuModal";
import DisplayAllergies from "@/features/menu/DisplayAllergies";
import GenreCard from "@/components/GenreCard";

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

const menuItems = [
  {
    name: "限定！濃厚担々麺",
    genreId: "aaaaa",
    price: 900,
    image: "aaa",
  },
  {
    name: "限定！特製カレー",
    genreId: "aaaaa",
    price: 800,
    image: "bbb",
  },
  {
    name: "限定！特製ラーメン",
    genreId: "aaaaa",
    price: 850,
    image: "ccc",
  },
  {
    name: "限定！ステーキ丼",
    genreId: "aaaaa",
    price: 1200,
    image: "ddd",
  },
  {
    name: "限定！贅沢寿司盛り合わせ",
    genreId: "aaaaa",
    price: 1500,
    image: "eee",
  },
  {
    name: "おすすめ！焼き鳥盛り合わせ",
    genreId: "bbbbb",
    price: 1200,
    image: "ccc",
  },
  {
    name: "おすすめ！特製バーガー",
    genreId: "bbbbb",
    price: 1000,
    image: "ddd",
  },
  {
    name: "おすすめ！海鮮丼",
    genreId: "bbbbb",
    price: 1300,
    image: "fff",
  },
  {
    name: "おすすめ！ローストビーフサラダ",
    genreId: "bbbbb",
    price: 950,
    image: "ggg",
  },
  {
    name: "おすすめ！クラシックピザ",
    genreId: "bbbbb",
    price: 1100,
    image: "hhh",
  },
  {
    name: "単品！フライドポテト",
    genreId: "ccccc",
    price: 500,
    image: "eee",
  },
  {
    name: "単品！枝豆",
    genreId: "ccccc",
    price: 300,
    image: "fff",
  },
  {
    name: "単品！唐揚げ",
    genreId: "ccccc",
    price: 600,
    image: "ccc",
  },
  {
    name: "単品！サラダ",
    genreId: "ccccc",
    price: 400,
    image: "ddd",
  },
  {
    name: "単品！天ぷら盛り合わせ",
    genreId: "ccccc",
    price: 800,
    image: "eee",
  },
  {
    name: "セット！ランチセットA",
    genreId: "ddddd",
    price: 1500,
    image: "ggg",
  },
  {
    name: "セット！お子様セット",
    genreId: "ddddd",
    price: 800,
    image: "hhh",
  },
  {
    name: "セット！和風定食セット",
    genreId: "ddddd",
    price: 1200,
    image: "hhh",
  },
  {
    name: "セット！洋風ディナーセット",
    genreId: "ddddd",
    price: 2000,
    image: "iii",
  },
  {
    name: "セット！朝食セット",
    genreId: "ddddd",
    price: 1000,
    image: "jjj",
  },
  {
    name: "ドリンク！コーラ",
    genreId: "eeeee",
    price: 200,
    image: "iii",
  },
  {
    name: "ドリンク！オレンジジュース",
    genreId: "eeeee",
    price: 250,
    image: "jjj",
  },
  {
    name: "ドリンク！ウーロン茶",
    genreId: "eeeee",
    price: 220,
    image: "ccc",
  },
  {
    name: "ドリンク！レモネード",
    genreId: "eeeee",
    price: 300,
    image: "ddd",
  },
  {
    name: "ドリンク！抹茶ラテ",
    genreId: "eeeee",
    price: 400,
    image: "eee",
  },
  {
    name: "デザート！ショートケーキ",
    genreId: "fffff",
    price: 500,
    image: "kkk",
  },
  {
    name: "デザート！チョコパフェ",
    genreId: "fffff",
    price: 600,
    image: "lll",
  },
  {
    name: "デザート！抹茶アイス",
    genreId: "fffff",
    price: 400,
    image: "hhh",
  },
  {
    name: "デザート！フルーツ盛り合わせ",
    genreId: "fffff",
    price: 700,
    image: "iii",
  },
  {
    name: "デザート！プリン",
    genreId: "fffff",
    price: 450,
    image: "jjj",
  },
  {
    name: "物販！お土産クッキー",
    genreId: "ggggg",
    price: 800,
    image: "mmm",
  },
  {
    name: "物販！オリジナルTシャツ",
    genreId: "ggggg",
    price: 2000,
    image: "nnn",
  },
  {
    name: "物販！エコバッグ",
    genreId: "ggggg",
    price: 1000,
    image: "mmm",
  },
  {
    name: "物販！特製コーヒー豆",
    genreId: "ggggg",
    price: 1500,
    image: "nnn",
  },
  {
    name: "物販！マグカップ",
    genreId: "ggggg",
    price: 1200,
    image: "ooo",
  },
];

const allergies = [
  {
    id: "egg",
    name: "卵",
  },
  {
    id: "peanuts",
    name: "ピーナッツ",
  },
  {
    id: "soba",
    name: "蕎麦",
  },
  {
    id: "shrimp",
    name: "えび",
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
      <div className="sticky top-0 bg-white">
        <DisplayAllergies allergies={allergies} />
        <GenreCard
          menuItems={genres}
          activeTab={activeGenre}
          setActiveTab={setActiveGenre}
        />
      </div>
      <div className="p-4 space-y-4">
        {menuItems
          .filter((item) => item.genreId === activeGenre)
          .map((item, index) => (
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
        <CartButton count={cartCount} size={"lg"} />
      </div>
    </div>
  );
}

export default MenuPage;
