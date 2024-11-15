import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface MenuModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedItem: {
    name: string;
    price: number;
    image: string;
  } | null;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
}

function MenuModal({
  isOpen,
  onOpenChange,
  selectedItem,
  quantity,
  onQuantityChange,
  onAddToCart,
}: MenuModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-3/4">
        <DialogHeader>
          <DialogTitle>{selectedItem?.name}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center gap-4 py-4">
          <Button
            variant="outline"
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
          >
            -
          </Button>
          <span className="text-xl">{quantity}</span>
          <Button
            variant="outline"
            onClick={() => onQuantityChange(quantity + 1)}
          >
            +
          </Button>
        </div>
        <Button
          className="mx-auto w-48 bg-yellow-400 hover:bg-yellow-500 text-gray-800"
          onClick={onAddToCart}
        >
          カートに追加
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default MenuModal;
