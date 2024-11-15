"use client";

import { useState } from "react";
import { AllergyIcon } from "@/components/AllergyIcon";
import { Button } from "@/components/ui/button";

export default function Allergy() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setSelectedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const items = [
    {
      src: "/foods/fish.png",
      alt: "魚類",
      label: "魚類",
    },
    {
      src: "/foods/egg.png",
      alt: "たまご",
      label: "たまご",
    },
    {
      src: "/foods/orange.png",
      alt: "オレンジ",
      label: "オレンジ",
    },
    {
      src: "/foods/crab.png",
      alt: "かに",
      label: "かに",
    },
    {
      src: "/foods/beef.png",
      alt: "ビーフ",
      label: "ビーフ",
    },
    {
      src: "/foods/kiwi.png",
      alt: "キウイ",
      label: "キウイ",
    },
    {
      src: "/foods/shrimp.png",
      alt: "えび",
      label: "えび",
    },
    {
      src: "/foods/soba.png",
      alt: "そば",
      label: "そば",
    },
    {
      src: "/foods/peanuts.png",
      alt: "ピーナッツ",
      label: "ピーナッツ",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="p-4">
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm">アレルギー情報の登録</span>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="grid grid-cols-3 gap-4">
          {items.map((item, index) => (
            <AllergyIcon
              key={index}
              {...item}
              selected={selectedItems.includes(index)}
              onClick={() => toggleItem(index)}
            />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button className="bg-zinc-800 text-white hover:bg-zinc-700">
            注文を開始する
          </Button>
        </div>
      </main>
    </div>
  );
}
