import React from "react";
import { History, Menu } from "lucide-react";

function MenuFooter() {
  return (
    <footer className="fixed bottom-0 bg-white h-16 w-screen border-t">
      <div className="h-full grid grid-cols-2">
        <button className="items-center">
          <div className="flex flex-col items-center">
            <Menu className="h-6 w-6" />
            <span className="text-xs mt-1">メニュー</span>
          </div>
        </button>
        <button className="items-center">
          <div className="flex flex-col items-center">
            <History className="h-6 w-6" />
            <span className="text-xs mt-1">注文履歴</span>
          </div>
        </button>
      </div>
    </footer>
  );
}

export default MenuFooter;
