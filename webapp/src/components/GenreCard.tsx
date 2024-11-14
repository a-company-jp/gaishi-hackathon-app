import { useState } from "react";

type MenuItem = {
  id: string;
  label: string;
};

type GenreCardProps = {
  menuItems: MenuItem[];
};

export default function GenreCard({ menuItems }: GenreCardProps) {
  const [activeTab, setActiveTab] = useState(menuItems[0]?.id || "");

  return (
    <nav className="w-full max-w-3xl mx-auto overflow-x-auto scrollbar-hide">
      <ul className="flex border-b min-w-max px-2">
        {menuItems.map((item) => (
          <li key={item.id} className="flex-1 flex min-w-[80px]">
            <button
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 py-2 px-1 text-[11px] sm:text-xs font-medium transition-colors duration-200 tracking-[0.2em] whitespace-nowrap ${
                activeTab === item.id
                  ? "text-Black-500 border-b-2 border-orange-500 font-black"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
