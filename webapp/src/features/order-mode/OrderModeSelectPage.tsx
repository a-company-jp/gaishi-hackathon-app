"use client";

import { Dictionary } from "@/app/types/dictionary";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

function OrderModeSelectPage({ dict }: { dict: Dictionary }) {
  const router = useRouter();

  const modeButtonContents = [
    {
      text: dict.orderMode.registerAllergy,
      image: "/thinking_man.png",
      onClick: () => router.push("../allergy"),
    },
    {
      text: dict.orderMode.startOrder,
      image: "/order_food.png",
      onClick: () => router.push("../order"),
    },
  ];

  return (
    <ul className="flex flex-col items-center pt-8 gap-10">
      {modeButtonContents.map((content, index) => (
        <li key={index}>
          <Button
            onClick={content.onClick}
            className="flex flex-col items-center gap-4 w-80 h-48 bg-white rounded-md border border-gray-200"
          >
            <Image
              src={content.image}
              alt={content.text}
              width={100}
              height={100}
            />
            <span className="text-black whitespace-normal">{content.text}</span>
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default OrderModeSelectPage;
