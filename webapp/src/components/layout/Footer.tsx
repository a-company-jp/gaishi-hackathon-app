import React from "react";
import { DollarSign, Menu } from "lucide-react";

function Footer() {
  return (
    <footer className="absolute bottom-0 w-screen p-2">
      <div className="grid grid-cols-2">
        <button className="flex flex-col items-center">
          <Menu className="h-6 w-6" />
          <span className="text-xs mt-1">メニュー</span>
        </button>
        <button className="items-center">
          <div className="flex flex-col items-center">
            <DollarSign className="h-6 w-6" />
            <span className="text-xs mt-1">お会計</span>
          </div>
        </button>
      </div>
    </footer>
  );
}

export default Footer;
