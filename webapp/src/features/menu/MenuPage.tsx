"use client";

import React, { useState } from "react";
import CartButton from "@/components/CartButton";
import MenuModal from "@/components/MenuModal";
import DisplayAllergies from "@/features/menu/DisplayAllergies";
import GenreCard from "@/components/GenreCard";
import MenuCard from "@/features/menu/MenuCard";
import { Dictionary } from "@/app/types/dictionary";
import { Language } from "@/app/types/language";
import { sampleGenres, sampleMenuItems } from "./sampleMenuItems";

// const MenuItemsQuery = gql(`
//   query GetMenuItems {
//     menuItems {
//       id
//       name
//       price
//       category {
//         id
//       }
//       allergens {
//         id
//         name
//       }
//     }
//   }
// `);

// const AllergensQuery = gql(`
//   query GetAllergens {
//     allergens {
//       id
//       name
//     }
//   }
// `);

type MenuPageProps = {
  lang: Language;
  dict: Dictionary;
};

function MenuPage({ lang, dict }: MenuPageProps) {
  const allergies = [
    {
      id: "beef",
      name: dict.allergy.allergen.beef,
      selected: false,
    },
    {
      id: "crab",
      name: dict.allergy.allergen.crab,
      selected: true,
    },
    {
      id: "egg",
      name: dict.allergy.allergen.egg,
      selected: false,
    },
    {
      id: "fish",
      name: dict.allergy.allergen.fish,
      selected: false,
    },
    {
      id: "kiwi",
      name: dict.allergy.allergen.kiwi,
      selected: false,
    },
    {
      id: "peanuts",
      name: dict.allergy.allergen.peanuts,
      selected: true,
    },
    {
      id: "shrimp",
      name: dict.allergy.allergen.shrimp,
      selected: false,
    },
    {
      id: "soba",
      name: dict.allergy.allergen.soba,
      selected: true,
    },
  ];

  const [cartCount, setCartCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeGenre, setActiveGenre] = useState("ddddd");
  // const tenantId = useSelector((state: RootState) => state.tenantId.id);
  // const { loading, error, data } = useQuery(MenuItemsQuery, {
  //   variables: { restaurantId: tenantId },
  // });
  //
  // if (loading) return "Loading...";
  // if (error) return `Error! ${error.message}`;
  // console.log(data);

  const handleAddToCart = () => {
    setCartCount((prevCount) => prevCount + quantity);
    setIsModalOpen(false);
    setQuantity(1);
  };

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="sticky top-0 bg-white">
        <DisplayAllergies allergies={allergies} dict={dict} />
        <GenreCard
          menuItems={sampleGenres[lang]}
          activeTab={activeGenre}
          setActiveTab={setActiveGenre}
        />
      </div>
      <div className="p-4 space-y-4">
        {sampleMenuItems[lang]
          .filter((item) => item.genreId === activeGenre)
          .map((item) => (
            <MenuCard
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              imgUrl={item.image}
              setSelectedItemId={setSelectedItemId}
              setIsModalOpen={setIsModalOpen}
              disabled={false}
              // disabled={true} // アレルギーのフィルタ対象であればtrue
              dict={dict}
            />
          ))}
      </div>

      <MenuModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        selectedItem={
          sampleMenuItems[lang].find((item) => item.id === selectedItemId) ??
          null
        }
        quantity={quantity}
        onQuantityChange={setQuantity}
        onAddToCart={handleAddToCart}
        dict={dict}
      />

      <div className="fixed bottom-4 right-4">
        <CartButton count={cartCount} size={"lg"} />
      </div>
    </div>
  );
}

export default MenuPage;
