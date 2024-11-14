import { X } from "lucide-react";
import Image from "next/image";
import OrderHeader from "@/components/OrderHeader";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

const OrderPage = () => {
  const orderItems: OrderItem[] = [
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
  ];

  const totalAmount = orderItems.reduce((sum, item) => sum + item.price, 0);

  const OrderItem = ({ item }: { item: OrderItem }) => (
    <li className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg shadow-sm">
      <Image
        src={item.image}
        alt={item.name}
        width={80}
        height={80}
        className="rounded-md object-cover w-20 h-20"
      />
      <div className="flex-grow">
        <h2 className="font-semibold text-lg">{item.name}</h2>
        <p className="text-gray-600">{item.price.toLocaleString()}円</p>
      </div>
      <button className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-200 rounded-full transition-colors">
        <X className="h-5 w-5" />
      </button>
    </li>
  );

  const OrderFooter = () => (
    <footer className="p-6 border-t bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <span className="text-lg font-semibold">合計:</span>
        <span className="text-2xl font-bold">
          {totalAmount.toLocaleString()}円
        </span>
      </div>
      <button className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold text-lg shadow-md hover:bg-orange-600 transition-colors">
        注文を確定する
      </button>
    </footer>
  );

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
      <OrderHeader />
      <main className="flex-grow p-6 overflow-y-auto">
        <ul className="space-y-6">
          {orderItems.map((item) => (
            <OrderItem key={item.id} item={item} />
          ))}
        </ul>
      </main>
      <OrderFooter />
    </div>
  );
};

export default OrderPage;
