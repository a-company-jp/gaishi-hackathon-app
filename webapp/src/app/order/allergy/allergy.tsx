"use client";

import { useState } from "react";
import Image from "next/image";
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
      icon: (
        <Image
          src="/foods/icon_110670_256.png"
          alt="魚類"
          width={40}
          height={40}
        />
      ),
      label: "魚類",
    },
    {
      icon: (
        <Image
          src="/foods/icon_130420_256.png"
          alt="たまご"
          width={40}
          height={40}
        />
      ),
      label: "たまご",
    },
    {
      icon: (
        <Image
          src="/foods/icon_146880_256.png"
          alt="オレンジ"
          width={40}
          height={40}
        />
      ),
      label: "オレンジ",
    },
    {
      icon: (
        <Image
          src="/foods/icon_148240_256.png"
          alt="かに"
          width={40}
          height={40}
        />
      ),
      label: "かに",
    },
    {
      icon: (
        <Image
          src="/foods/icon_148990_256.png"
          alt="ビーフ"
          width={40}
          height={40}
        />
      ),
      label: "ビーフ",
    },
    {
      icon: (
        <Image
          src="/foods/icon_155750_256.png"
          alt="キウイ"
          width={40}
          height={40}
        />
      ),
      label: "キウイ",
    },
    {
      icon: (
        <Image
          src="/foods/icon_161540_256.png"
          alt="えび"
          width={40}
          height={40}
        />
      ),
      label: "えび",
    },
    {
      icon: (
        <Image
          src="/foods/icon_161600_256.png"
          alt="そば"
          width={40}
          height={40}
        />
      ),
      label: "そば",
    },
    {
      icon: (
        <Image
          src="/foods/icon_161630_256.png"
          alt="ピーナッツ"
          width={40}
          height={40}
        />
      ),
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
            <div
              key={index}
              className={`flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                selectedItems.includes(index)
                  ? "bg-primary text-primary-foreground"
                  : ""
              }`}
              onClick={() => toggleItem(index)}
            >
              {item.icon}
              <span className="text-xs text-center">{item.label}</span>
            </div>
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
