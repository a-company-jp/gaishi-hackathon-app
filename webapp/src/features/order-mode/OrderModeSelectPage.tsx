import { Button } from "@/components/ui/button";
import Image from "next/image";

const modeButtonContents = [
  {
    text: "アレルギー情報を登録して始める",
    image: "/thinking_man.png",
  },
  {
    text: "そのまま注文を始める",
    image: "/order_food.png",
  },
];

function OrderModeSelectPage() {
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
            <span className="text-black">{content.text}</span>
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default OrderModeSelectPage;
