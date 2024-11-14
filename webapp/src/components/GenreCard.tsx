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
    <nav className="w-full max-w-3xl mx-auto">
      <ul className="flex border-b">
        {menuItems.map((item) => (
          <li key={item.id} className="flex-1 flex">
            <button
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 py-2 text-[11px] sm:text-xs font-medium transition-colors duration-200 tracking-[0.2em] ${
                activeTab === item.id
                  ? "text-orange-500 border-b-2 border-orange-500"
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
