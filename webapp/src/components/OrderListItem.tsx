interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderCartItemProps {
  item: OrderItem;
}

const OrderListItem = ({ item }: OrderCartItemProps) => (
  <li className="flex items-center space-x-4 py-4 px-4 border-b-2 border-gray-400">
    <div className="flex-grow flex justify-between items-center">
      <div className="flex items-center">
        <h2 className="text-lg">{item.name}</h2>
        <span className="ml-2 text-gray-600">×{item.quantity}</span>
      </div>
      <p className="text-gray-800 font-semibold">
        {item.price.toLocaleString()}円
      </p>
    </div>
  </li>
);

export default OrderListItem;
