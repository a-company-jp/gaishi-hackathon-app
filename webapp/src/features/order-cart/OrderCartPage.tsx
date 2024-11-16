"use client";

import { useState } from "react";
import OrderCartItem from "@/components/OrderCartItem";
import OrderCartFooter from "@/components/OrderCartFooter";
import { sampleOrderItems } from "../menu/sampleMenuItems";
import { Dictionary } from "@/app/types/dictionary";
import { Language } from "@/app/types/language";
import OrderCartHeader from "@/components/OrderCartHeader";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

// const GetCartQuery = gql(`
//   query GetCartQuery {
//     cart {
//       id
//       items {
//         id
//         menuItem {
//            id
//            name
//            price
//         }
//         quantity
//       }
//       totalCartPrice
//     }
//   }
// `);

type OrderCartPageProps = {
  lang: Language;
  dict: Dictionary;
};

const OrderCartPage = ({ lang, dict }: OrderCartPageProps) => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>(
    sampleOrderItems[lang]
  );

  const handleRemoveItem = (itemId: string) => {
    setOrderItems(orderItems.filter((item) => item.id !== itemId));
  };

  const totalAmount = orderItems.reduce((sum, item) => sum + item.price, 0);

  const handleConfirmOrder = () => {
    if (orderItems.length === 0) {
      alert(dict.order.cart.cartIsEmpty);
      return;
    }

    // const orderData = {
    //   items: orderItems.map((item) => ({
    //     id: item.id,
    //     name: item.name,
    //     price: item.price,
    //   })),
    //   totalAmount: totalAmount,
    //   orderedAt: new Date().toISOString(),
    // };

    alert(dict.order.cart.thankYouForOrder);
    setOrderItems([]);
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
      <OrderCartHeader dict={dict} />
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
        dict={dict}
      />
    </div>
  );
};

export default OrderCartPage;
