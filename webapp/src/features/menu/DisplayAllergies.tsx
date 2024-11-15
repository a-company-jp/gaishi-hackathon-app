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
import { AllergenButton } from "@/components/AllergenButton";
import { useState } from "react";

type Allergy = {
  id: string;
  name: string;
};

type Props = {
  allergies: Allergy[];
};

function DisplayAllergies({ allergies }: Props) {
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>(
    allergies.map((a) => a.id)
  );

  const toggleAllergy = (id: string) => {
    setSelectedAllergies((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-3 flex flex-col items-center gap-1">
      <p className="text-sm">あなたのアレルギー食材</p>
      <Dialog>
        <DialogTrigger asChild>
          <div className="w-3/4 p-4 rounded-lg shadow-inner flex items-center justify-center gap-2 hover:bg-gray-200">
            {allergies.map((allergy) => {
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
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {allergies.map((allergy) => (
              <AllergenButton
                key={allergy.id}
                src={`/foods/${allergy.id}.png`}
                alt={allergy.name}
                label={allergy.name}
                selected={selectedAllergies.includes(allergy.id)}
                onClick={() => toggleAllergy(allergy.id)}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DisplayAllergies;
