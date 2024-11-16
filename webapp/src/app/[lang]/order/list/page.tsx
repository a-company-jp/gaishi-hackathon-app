import OrderListHeader from "@/components/OrderListHeader";
import OrderListItem from "@/components/OrderListItem";
import OrderListFooter from "@/components/OrderListFooter";

interface OrderListItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const OrderListPage = () => {
  const orderListItems: OrderListItem[] = [
    {
      id: "1",
      name: "オムレツ",
      price: 900,
      quantity: 2,
    },
    {
      id: "2",
      name: "天ぷら蕎麦定食",
      price: 1200,
      quantity: 2,
    },
    {
      id: "3",
      name: "ハンバーグ定食",
      price: 1200,
      quantity: 3,
    },
  ];

  const totalAmount = orderListItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
      <OrderListHeader />
      <main className="flex-grow px-8 overflow-y-auto">
        <ul className="divide-gray-400 -mx-4">
          {orderListItems.map((item) => (
            <OrderListItem key={item.id} item={item} />
          ))}
        </ul>
      </main>
      <OrderListFooter totalAmount={totalAmount} />
    </div>
  );
};

export default OrderListPage;
