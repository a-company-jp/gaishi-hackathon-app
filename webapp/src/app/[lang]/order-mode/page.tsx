import React from "react";
import { getDictionary } from "@/app/[lang]/dictionaries";

import OrderModeSelectPage from "@/features/order-mode/OrderModeSelectPage";
import { Language } from "@/app/types/language";

async function Page({ params: { lang } }: { params: { lang: Language } }) {
  const dict = await getDictionary(lang);
  return <OrderModeSelectPage dict={dict} />;
}

export default Page;
