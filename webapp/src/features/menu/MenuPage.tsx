"use client";

import React, { useState } from "react";
import CartButton from "@/components/CartButton";
import MenuModal from "@/components/MenuModal";
import DisplayAllergies from "@/features/menu/DisplayAllergies";
import GenreCard from "@/components/GenreCard";
import MenuCard from "@/features/menu/MenuCard";
import { gql } from "@/gql/__generated__";
import { useMutation, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const genres = [
  {
    id: "aaaaa",
    label: "限定",
  },
  {
    id: "bbbbb",
    label: "おすすめ",
  },
  {
    id: "ccccc",
    label: "単品",
  },
  {
    id: "ddddd",
    label: "セット",
  },
  {
    id: "eeeee",
    label: "ドリンク",
  },
  {
    id: "fffff",
    label: "デザート",
  },
  {
    id: "ggggg",
    label: "物販",
  },
];

const menuItems = [
  {
    id: "0000",
    name: "限定！濃厚担々麺",
    genreId: "aaaaa",
    price: 900,
    image: "/placeholder.svg",
  },
  {
    id: "1111",
    name: "限定！特製カレー",
    genreId: "aaaaa",
    price: 800,
    image: "/placeholder.svg",
  },
  {
    id: "2222",
    name: "限定！特製ラーメン",
    genreId: "aaaaa",
    price: 850,
    image: "/placeholder.svg",
  },
  {
    id: "3333",
    name: "限定！ステーキ丼",
    genreId: "aaaaa",
    price: 1200,
    image: "/placeholder.svg",
  },
  {
    id: "4444",
    name: "限定！贅沢寿司盛り合わせ",
    genreId: "aaaaa",
    price: 1500,
    image: "/placeholder.svg",
  },
  {
    id: "5555",
    name: "おすすめ！焼き鳥盛り合わせ",
    genreId: "bbbbb",
    price: 1200,
    image: "/placeholder.svg",
  },
  {
    id: "6666",
    name: "おすすめ！特製バーガー",
    genreId: "bbbbb",
    price: 1000,
    image: "/placeholder.svg",
  },
  {
    id: "7777",
    name: "おすすめ！海鮮丼",
    genreId: "bbbbb",
    price: 1300,
    image: "/placeholder.svg",
  },
  {
    id: "8888",
    name: "おすすめ！ローストビーフサラダ",
    genreId: "bbbbb",
    price: 950,
    image: "/placeholder.svg",
  },
  {
    id: "9999",
    name: "おすすめ！クラシックピザ",
    genreId: "bbbbb",
    price: 1100,
    image: "/placeholder.svg",
  },
  {
    id: "zzzz",
    name: "単品！フライドポテト",
    genreId: "ccccc",
    price: 500,
    image: "/placeholder.svg",
  },
  {
    id: "yyyy",
    name: "単品！枝豆",
    genreId: "ccccc",
    price: 300,
    image: "/placeholder.svg",
  },
  {
    id: "xxxx",
    name: "単品！唐揚げ",
    genreId: "ccccc",
    price: 600,
    image: "/placeholder.svg",
  },
  {
    id: "wwww",
    name: "単品！サラダ",
    genreId: "ccccc",
    price: 400,
    image: "/placeholder.svg",
  },
  {
    id: "vvvv",
    name: "単品！天ぷら盛り合わせ",
    genreId: "ccccc",
    price: 800,
    image: "/placeholder.svg",
  },
  {
    id: "uuuu",
    name: "セット！ランチセットA",
    genreId: "ddddd",
    price: 1500,
    image: "/placeholder.svg",
  },
  {
    id: "tttt",
    name: "セット！お子様セット",
    genreId: "ddddd",
    price: 800,
    image: "/placeholder.svg",
  },
  {
    id: "ssss",
    name: "セット！和風定食セット",
    genreId: "ddddd",
    price: 1200,
    image: "/placeholder.svg",
  },
  {
    id: "rrrr",
    name: "セット！洋風ディナーセット",
    genreId: "ddddd",
    price: 2000,
    image: "/placeholder.svg",
  },
  {
    id: "qqqq",
    name: "セット！朝食セット",
    genreId: "ddddd",
    price: 1000,
    image: "/placeholder.svg",
  },
  {
    id: "pppp",
    name: "ドリンク！コーラ",
    genreId: "eeeee",
    price: 200,
    image: "/placeholder.svg",
  },
  {
    id: "oooo",
    name: "ドリンク！オレンジジュース",
    genreId: "eeeee",
    price: 250,
    image: "/placeholder.svg",
  },
  {
    id: "nnnn",
    name: "ドリンク！ウーロン茶",
    genreId: "eeeee",
    price: 220,
    image: "/placeholder.svg",
  },
  {
    id: "mmmm",
    name: "ドリンク！レモネード",
    genreId: "eeeee",
    price: 300,
    image: "/placeholder.svg",
  },
  {
    id: "llll",
    name: "ドリンク！抹茶ラテ",
    genreId: "eeeee",
    price: 400,
    image: "/placeholder.svg",
  },
  {
    id: "kkkk",
    name: "デザート！ショートケーキ",
    genreId: "fffff",
    price: 500,
    image: "/placeholder.svg",
  },
  {
    id: "jjjj",
    name: "デザート！チョコパフェ",
    genreId: "fffff",
    price: 600,
    image: "/placeholder.svg",
  },
  {
    id: "iiii",
    name: "デザート！抹茶アイス",
    genreId: "fffff",
    price: 400,
    image: "/placeholder.svg",
  },
  {
    id: "hhhh",
    name: "デザート！フルーツ盛り合わせ",
    genreId: "fffff",
    price: 700,
    image: "/placeholder.svg",
  },
  {
    id: "gggg",
    name: "デザート！プリン",
    genreId: "fffff",
    price: 450,
    image: "/placeholder.svg",
  },
  {
    id: "ffff",
    name: "物販！お土産クッキー",
    genreId: "ggggg",
    price: 800,
    image: "/placeholder.svg",
  },
  {
    id: "eeee",
    name: "物販！オリジナルTシャツ",
    genreId: "ggggg",
    price: 2000,
    image: "/placeholder.svg",
  },
  {
    id: "dddd",
    name: "物販！エコバッグ",
    genreId: "ggggg",
    price: 1000,
    image: "/placeholder.svg",
  },
  {
    id: "cccc",
    name: "物販！特製コーヒー豆",
    genreId: "ggggg",
    price: 1500,
    image: "/placeholder.svg",
  },
  {
    id: "bbbb",
    name: "物販！マグカップ",
    genreId: "ggggg",
    price: 1200,
    image: "/placeholder.svg",
  },
];

const allergies = [
  {
    id: "beef",
    name: "牛肉",
    selected: false,
  },
  {
    id: "crab",
    name: "かに",
    selected: true,
  },
  {
    id: "egg",
    name: "たまご",
    selected: false,
  },
  {
    id: "fish",
    name: "魚介",
    selected: false,
  },
  {
    id: "kiwi",
    name: "キウイ",
    selected: false,
  },
  {
    id: "peanuts",
    name: "ピーナッツ",
    selected: true,
  },
  {
    id: "shrimp",
    name: "えび",
    selected: false,
  },
  {
    id: "soba",
    name: "そば",
    selected: true,
  },
];

const MenuItemsQuery = gql(`
  query GetMenuItems($restaurantId: ID!) {
    menuItems(restaurantId: $restaurantId) {
      id
      name
      price
      category {
        id
      }
      allergens {
        id
        name
      }
    }
  }
`);

const AllergensQuery = gql(`
  query GetAllergens {
    allergens {
      id
      name
    }
  }
`);

function MenuPage() {
  const tenantId = useSelector((state: RootState) => state.tenantId.id);
  const { loading, error, data } = useQuery(MenuItemsQuery, {
    variables: { restaurantId: tenantId },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  console.log(data);

  const [cartCount, setCartCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeGenre, setActiveGenre] = useState("ddddd");

  const handleAddToCart = () => {
    setCartCount((prevCount) => prevCount + quantity);
    setIsModalOpen(false);
    setQuantity(1);
  };

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="sticky top-0 bg-white">
        <DisplayAllergies allergies={allergies} />
        <GenreCard
          menuItems={genres}
          activeTab={activeGenre}
          setActiveTab={setActiveGenre}
        />
      </div>
      <div className="p-4 space-y-4">
        {menuItems
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
            />
          ))}
      </div>

      <MenuModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        selectedItem={
          menuItems.find((item) => item.id === selectedItemId) ?? null
        }
        quantity={quantity}
        onQuantityChange={setQuantity}
        onAddToCart={handleAddToCart}
      />

      <div className="fixed bottom-20 right-4">
        <CartButton count={cartCount} size={"lg"} />
      </div>
    </div>
  );
}

export default MenuPage;
