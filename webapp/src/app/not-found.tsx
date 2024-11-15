"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const tablePath = /^\/order\/table\/.+/g;
const menuDetailPath = /^\/order\/menu\/.+/g;

const Custom404: React.FC = () => {
  const router = useRouter();
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const pathName = window.location.pathname;

    // `/table/[id]` のパターンにマッチするか確認
    if (pathName.match(tablePath)) {
      const id = pathName.split("/order/table/")[1]; // id を抽出
      if (id) {
        // `id` を `localStorage` に保存
        localStorage.setItem("tableId", id);
        router.push("/order/start");
        return;
      }
    }
    if (pathName.match(menuDetailPath)) {
      const id = pathName.split("/order/menu/")[1]; // id を抽出
      if (id) {
        // `id` を `localStorage` に保存
        localStorage.setItem("menuId", id);
        router.push(pathName);
        return;
      }
    }
    setIsNotFound(true);
  }, [router]);
  if (isNotFound) return <h1>404 - Page Not Found</h1>;
  return null;
};

export default Custom404;
