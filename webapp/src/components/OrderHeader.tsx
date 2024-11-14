import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import CartButton from "@/components/CartButton";

const OrderHeader = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <Link
        href="/menu"
        className="text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>
      <h1 className="text-lg font-semibold">注文カート</h1>
      <CartButton />
    </header>
  );
};

export default OrderHeader;
