import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import CartButton from "@/components/CartButton";
import { Dictionary } from "@/app/types/dictionary";

type OrderCartHeaderProps = {
  dict: Dictionary;
};

const OrderCartHeader = ({ dict }: OrderCartHeaderProps) => {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <Link
        href="../"
        className="text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">{dict.order.cart.cart}</h1>
        <CartButton size="sm" />
      </div>
      <div className="w-10" />
    </header>
  );
};

export default OrderCartHeader;
