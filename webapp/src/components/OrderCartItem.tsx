import { X } from "lucide-react";
import Image from "next/image";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface OrderCartItemProps {
  item: OrderItem;
}

const OrderCartItem = ({ item }: OrderCartItemProps) => (
  <li className="flex items-center space-x-4 py-4 px-4 border-b-2 border-gray-400">
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
    <button className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors">
      <X className="h-5 w-5" />
    </button>
  </li>
);

export default OrderCartItem;
