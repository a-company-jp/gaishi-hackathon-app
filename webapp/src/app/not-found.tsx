"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { gql } from "@/gql/__generated__";

const tablePath = /^\/order\/table\/.+/g;
const menuDetailPath = /^\/order\/menu\/.+/g;

const Custom404: React.FC = () => {
  const router = useRouter();
  const [isNotFound, setIsNotFound] = useState(false);
  // get table id from url

  const JOIN_TABLE_SESSION = gql(`
          mutation JoinTableSession($tableUUID: ID!) {
            joinTableSession(tableUUID: $tableUUID){
              tableSession {
                id
              }
            }
          }
        `);
  const [joinTableSession] = useMutation(JOIN_TABLE_SESSION);
  useEffect(() => {
    const pathName = window.location.pathname;

    // `/table/[id]` のパターンにマッチするか確認
    if (pathName.match(tablePath)) {
      const id = pathName.split("/order/table/")[1]; // id を抽出
      if (id) {
        const id = window.location.pathname.split("/order/table/")[1];
        joinTableSession({ variables: { tableUUID: id } }).then((res) => {
          if (res.data?.joinTableSession?.tableSession?.id) {
            router.push("/order/start");
            return;
          }
          setIsNotFound(true);
        });
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
  }, [router, joinTableSession]);
  if (isNotFound) return <h1>404 - Page Not Found</h1>;
  return null;
};

export default Custom404;
