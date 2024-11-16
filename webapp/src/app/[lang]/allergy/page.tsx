import { Language } from "@/app/types/language";
import AllergenSelectPage from "@/features/allergy/AllergenSelectPage";
import { getDictionary } from "../dictionaries";

export const metadata = {
  title: "Title - CHANGE ME!!!",
};

type PageProps = {
  params: Promise<{
    lang: Language;
  }>;
};

export default async function Page({ params }: Awaited<PageProps>) {
  const dict = await getDictionary((await params).lang);
  return <AllergenSelectPage dict={dict} />;
}
