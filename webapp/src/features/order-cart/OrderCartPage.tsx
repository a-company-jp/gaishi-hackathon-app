"use client";

import { useState } from "react";
import OrderHeader from "@/components/OrderCartHeader";
import OrderCartItem from "@/components/OrderCartItem";
import OrderCartFooter from "@/components/OrderCartFooter";
import { gql } from "@/gql/__generated__";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

const GetCartQuery = gql(`
  query GetCartQuery {
    cart {
      id
      items {
        id
        menuItem {
           id
           name
           price
        }
        quantity
      }
      totalCartPrice
    }
  }
`);

const OrderCartPage = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    {
      id: "1",
      name: "オムレツ",
      price: 900,
      image: "/omelet.jpg",
    },
    {
      id: "2",
      name: "天ぷら蕎麦定食",
      price: 1200,
      image: "/buckwheat.jpg",
    },
    {
      id: "3",
      name: "オムレツ",
      price: 900,
      image: "/omelet.jpg",
    },
    {
      id: "4",
      name: "天ぷら蕎麦定食",
      price: 1200,
      image: "/buckwheat.jpg",
    },
  ]);

  const handleRemoveItem = (itemId: string) => {
    setOrderItems(orderItems.filter((item) => item.id !== itemId));
  };

  const totalAmount = orderItems.reduce((sum, item) => sum + item.price, 0);

  const handleConfirmOrder = () => {
    if (orderItems.length === 0) {
      alert("カートが空です");
      return;
    }

    const orderData = {
      items: orderItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
      })),
      totalAmount: totalAmount,
      orderedAt: new Date().toISOString(),
    };

    console.log("注文データ:", orderData);

    alert("ご注文ありがとうございます！");
    setOrderItems([]);
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
      <OrderHeader />
      <main className="flex-grow px-8 overflow-y-auto">
        <ul className="divide-y-2 divide-gray-400 -mx-4">
          {orderItems.map((item) => (
            <OrderCartItem
              key={item.id}
              item={item}
              onRemove={handleRemoveItem}
            />
          ))}
        </ul>
      </main>
      <OrderCartFooter
        totalAmount={totalAmount}
        onConfirmOrder={handleConfirmOrder}
      />
    </div>
  );
};

export default OrderCartPage;
