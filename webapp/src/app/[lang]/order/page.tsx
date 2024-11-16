import React from "react";
import MenuPage from "@/features/menu/MenuPage";
import { Language } from "@/app/types/language";
import { getDictionary } from "../dictionaries";

type PageProps = {
  params: Promise<{
    lang: Language;
  }>;
};

export default async function Page({ params }: Awaited<PageProps>) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <>
      <MenuPage lang={lang} dict={dict} />
      {/* <MenuFooter /> */}
    </>
  );
}
