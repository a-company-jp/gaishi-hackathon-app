import React from "react";
import { getDictionary } from "@/app/[lang]/dictionaries";

import OrderModeSelectPage from "@/features/order-mode/OrderModeSelectPage";
import { Language } from "@/app/types/language";

type PageProps = {
  params: Promise<{
    lang: Language;
  }>;
};

export default async function Page({ params }: Awaited<PageProps>) {
  const dict = await getDictionary((await params).lang);
  return <OrderModeSelectPage dict={dict} />;
}
