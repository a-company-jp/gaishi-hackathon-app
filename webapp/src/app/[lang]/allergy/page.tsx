import { Language } from "@/app/types/language";
import AllergenSelectPage from "@/features/allergy/AllergenSelectPage";
import { getDictionary } from "../dictionaries";

export const metadata = {
  title: "Title - CHANGE ME!!!",
};

export default async function Page({
  params: { lang },
}: {
  params: { lang: Language };
}) {
  const dict = await getDictionary(lang);
  return <AllergenSelectPage dict={dict} />;
}
