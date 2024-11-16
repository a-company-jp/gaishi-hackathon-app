import { Language, languages } from "../types/language";

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default async function Root({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Language }>;
}) {
  const resolvedParams = await params;
  return (
    <html lang={resolvedParams.lang}>
      <body>{children}</body>
    </html>
  );
}
