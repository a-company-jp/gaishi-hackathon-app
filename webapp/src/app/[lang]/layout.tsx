import { Language, languages } from "../types/language";

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default function Root({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Language };
}) {
  return (
    <html lang={params.lang}>
      <body>{children}</body>
    </html>
  );
}
