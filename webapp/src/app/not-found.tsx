"use client";

import React, { useEffect, useState } from "react";
import Router from "next/router";

const tablePath = /^\/order\/table\/.+/g;
const menuDetailPath = /^\/order\/menu\/.+/g;

const Custom404: React.FC = () => {
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const pathName = window.location.pathname;

    // `/table/[id]` のパターンにマッチするか確認
    if (pathName.match(tablePath)) {
      const id = pathName.split("/order/table/")[1]; // id を抽出
      if (id) {
        // `id` を `localStorage` に保存
        localStorage.setItem("tableId", id);
        Router.replace(
          {
            pathname: "/order/start",
            query: {}, // クエリパラメータは使用しない
          },
          undefined,
          { shallow: true }
        );
        return;
      }
    }
    if (pathName.match(menuDetailPath)) {
      const id = pathName.split("/order/menu/")[1]; // id を抽出
      if (id) {
        // `id` を `localStorage` に保存
        localStorage.setItem("menuId", id);
        Router.replace(pathName);
        return;
      }
    }
    setIsNotFound(true);
  }, []);
  if (isNotFound) return <h1>404 - Page Not Found</h1>;
  return null;
};

export default Custom404;
