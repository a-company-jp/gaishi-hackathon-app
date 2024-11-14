import LanguageButton from "@/components/LanguageButton";

export default function Home() {
  const languages = ["日本語", "English", "Français", "Español", "Deutsch"];

  return (
    <div className="grid grid-rows-[auto_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-2 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        使用する言語を選んでください
      </h1>
      <div className="grid gap-2 w-full max-w-md">
        {languages.map((language) => (
          <LanguageButton key={language} language={language} />
        ))}
      </div>
    </div>
  );
}
