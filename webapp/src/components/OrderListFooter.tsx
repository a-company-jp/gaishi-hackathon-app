interface OrderCartFooterProps {
  totalAmount: number;
}

const OrderListFooter = ({ totalAmount }: OrderCartFooterProps) => {
  return (
    <footer className="p-6 border-t bg-gray-50">
      <div className="flex justify-center items-center gap-4">
        <span className="text-3xl font-semibold">合計:</span>
        <span className="text-4xl font-bold">
          {totalAmount.toLocaleString()}円
        </span>
      </div>
    </footer>
  );
};

export default OrderListFooter;
