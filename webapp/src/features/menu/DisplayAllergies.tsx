import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
    <div className="p-3 flex flex-col items-center gap-1">
      <p className="text-sm">あなたのアレルギー食材</p>
      <Dialog>
        <DialogTrigger asChild>
          <div className="w-3/4 p-4 rounded-lg shadow-inner flex items-center justify-center gap-2 hover:bg-gray-200">
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
        </DialogTrigger>
        <DialogContent className="w-3/4">
          <DialogHeader>
            <DialogTitle>アレルギー食材リスト</DialogTitle>
            <DialogDescription>
              あなたのアレルギー食材について確認と編集が可能です。
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DisplayAllergies;
