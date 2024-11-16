import { Language } from "@/app/types/language";
import OrderCartPage from "@/features/order-cart/OrderCartPage";
import { getDictionary } from "../../dictionaries";

export const metadata = {
  title: "Cart",
};

type PageProps = {
  params: Promise<{
    lang: Language;
  }>;
};

export default async function Page({ params }: Awaited<PageProps>) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <OrderCartPage lang={lang} dict={dict} />;
}
