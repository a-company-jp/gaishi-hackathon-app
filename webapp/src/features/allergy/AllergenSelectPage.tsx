"use client";

import { useState } from "react";
import { AllergenButton } from "@/components/AllergenButton";
import { Button } from "@/components/ui/button";
import { Dictionary } from "@/app/types/dictionary";
import { gql } from "@/gql/__generated__";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

const SetAllergiesMutation = gql(`
  mutation SetAllergiesMutation($allergenIds: [ID!]!) {
    setUserAllergies (allergenIds: $allergenIds) {
      tableSession {
        id
      }
    }
  }
`);

export default function AllergenSelectPage({ dict }: { dict: Dictionary }) {
  const [setAllergies] = useMutation(SetAllergiesMutation);
  const router = useRouter();
  const [selectedAllergens, setSelectedAllergens] = useState<number[]>([]);

  const toggleAllergen = (index: number) => {
    setSelectedAllergens((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const onClick = async () => {
    try {
      // await setAllergies();
      router.push("/order");
    } catch (e) {
      console.error(e);
    }
  };

  const items = [
    {
      src: "/foods/fish.png",
      alt: dict.allergy.allergen.fish,
      label: dict.allergy.allergen.fish,
    },
    {
      src: "/foods/egg.png",
      alt: dict.allergy.allergen.egg,
      label: dict.allergy.allergen.egg,
    },
    {
      src: "/foods/orange.png",
      alt: dict.allergy.allergen.orange,
      label: dict.allergy.allergen.orange,
    },
    {
      src: "/foods/crab.png",
      alt: dict.allergy.allergen.crab,
      label: dict.allergy.allergen.crab,
    },
    {
      src: "/foods/beef.png",
      alt: dict.allergy.allergen.beef,
      label: dict.allergy.allergen.beef,
    },
    {
      src: "/foods/kiwi.png",
      alt: dict.allergy.allergen.kiwi,
      label: dict.allergy.allergen.kiwi,
    },
    {
      src: "/foods/shrimp.png",
      alt: dict.allergy.allergen.shrimp,
      label: dict.allergy.allergen.shrimp,
    },
    {
      src: "/foods/soba.png",
      alt: dict.allergy.allergen.soba,
      label: dict.allergy.allergen.soba,
    },
    {
      src: "/foods/peanuts.png",
      alt: dict.allergy.allergen.peanuts,
      label: dict.allergy.allergen.peanuts,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <span className="text-lg text-center py-8">
        {dict.allergy.registration}
      </span>

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
        <Button
          onClick={onClick}
          className="bg-zinc-800 text-white hover:bg-zinc-700"
        >
          {dict.allergy.startOrder}
        </Button>
      </div>
    </div>
  );
}
