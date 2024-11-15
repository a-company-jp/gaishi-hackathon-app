import OrderHeader from "@/components/OrderCartHeader";
import OrderCartItem from "@/components/OrderCartItem";
import OrderCartFooter from "@/components/OrderCartFooter";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

const OrderCartPage = () => {
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
    {
      id: "3",
      name: "天ぷら蕎麦定食",
      price: 1200,
      image: "/buckwheat.jpg",
    },
  ];

  const totalAmount = orderItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
      <OrderHeader />
      <main className="flex-grow px-8 overflow-y-auto">
        <ul className="divide-y-2 divide-gray-400 -mx-4">
          {orderItems.map((item) => (
            <OrderCartItem key={item.id} item={item} />
          ))}
        </ul>
      </main>
      <OrderCartFooter totalAmount={totalAmount} />
    </div>
  );
};

export default OrderCartPage;
