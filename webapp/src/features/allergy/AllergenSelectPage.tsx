"use client";

import { useState } from "react";
import { AllergenButton } from "@/components/AllergenButton";
import { Button } from "@/components/ui/button";

export default function AllergenSelectPage() {
  const [selectedAllergens, setSelectedAllergens] = useState<number[]>([]);

  const toggleAllergen = (index: number) => {
    setSelectedAllergens((prev) =>
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
      <span className="text-lg text-center py-8">アレルギー情報の登録</span>

      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-4">
          {items.map((item, index) => (
            <AllergenButton
              key={index}
              {...item}
              selected={selectedAllergens.includes(index)}
              onClick={() => toggleAllergen(index)}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center py-8">
        <Button className="bg-zinc-800 text-white hover:bg-zinc-700">
          注文を開始する
        </Button>
      </div>
    </div>
  );
}
