interface LanguageButtonProps {
  language: string;
}

export default function LanguageButton({ language }: LanguageButtonProps) {
  return (
    <button className="p-4 text-left rounded-lg shadow hover:shadow-md transition-shadow bg-white">
      {language}
    </button>
  );
}
