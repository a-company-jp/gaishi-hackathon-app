import { Dictionary } from "@/app/types/dictionary";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function OrderModeSelectPage({ dict }: { dict: Dictionary }) {
  const modeButtonContents = [
    {
      text: dict.orderMode.registerAllergy,
      image: "/thinking_man.png",
    },
    {
      text: dict.orderMode.startOrder,
      image: "/order_food.png",
    },
  ];

  return (
    <ul className="flex flex-col items-center pt-8 gap-10">
      {modeButtonContents.map((content, index) => (
        <li key={index}>
          <Button className="flex flex-col items-center gap-4 w-80 h-48 bg-white rounded-md border border-gray-200">
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
