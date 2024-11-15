import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const OrderListHeader = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <Link
        href="/order/menu"
        className="text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">注文履歴</h1>
      </div>
      <div className="w-10" />
    </header>
  );
};

export default OrderListHeader;
