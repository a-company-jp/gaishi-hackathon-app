interface OrderCartFooterProps {
  totalAmount: number;
  onConfirmOrder: () => void;
}

const OrderCartFooter = ({
  totalAmount,
  onConfirmOrder,
}: OrderCartFooterProps) => {
  return (
    <footer className="p-6 border-t bg-gray-50">
      <div className="flex justify-end items-center gap-4 mb-6">
        <span className="text-xl font-semibold">合計:</span>
        <span className="text-2xl font-bold">
          {totalAmount.toLocaleString()}円
        </span>
      </div>
      <button
        onClick={onConfirmOrder}
        className="w-full bg-[#FFBC51] text-white py-4 rounded-lg font-semibold text-lg shadow-md hover:bg-orange-600 transition-colors"
      >
        注文を確定する
      </button>
    </footer>
  );
};

export default OrderCartFooter;
