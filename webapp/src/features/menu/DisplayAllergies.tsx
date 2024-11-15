import React from "react";
import Image from "next/image";

type Allergy = {
  id: string;
  name: string;
};

type Props = {
  allergies: Allergy[];
};

const mockAllergies: Allergy[] = [
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

function DisplayAllergies({ allergies }: Props) {
  return (
    <div className="p-4 flex flex-col items-center gap-1">
      <p className="text-sm">あなたのアレルギー食材</p>
      <div className="w-3/4 p-4 rounded-lg shadow-inner flex items-center justify-center gap-2 hover:bg-gray-400">
        {mockAllergies.map((allergy) => {
          return (
            <Image
              key={allergy.id}
              src={`/foods/${allergy.id}.png`}
              alt=""
              width={24}
              height={24}
            />
          );
        })}
      </div>
    </div>
  );
}

export default DisplayAllergies;
