"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { languages, Language, languageNames } from "@/app/types/language";

const welcomeMessages: Record<Language, string> = {
  ja: "ようこそ、お母さん食堂へ！",
  en: "Welcome to Mother’s Diner!",
  zh: "欢迎来到妈妈食堂！",
  ko: "어머니의 식당에 오신 것을 환영합니다!",
  es: "¡Bienvenido al comedor de mamá!",
  fr: "Bienvenue à la cantine de maman !",
  th: "ยินดีต้อนรับสู่ร้านอาหารแม่!",
  de: "Willkommen in Mamas Gasthaus!",
  ru: "Добро пожаловать в мамину столовую!",
  it: "Benvenuti alla trattoria della mamma!",
};

const nextButtonText: Record<Language, string> = {
  ja: "次へ",
  en: "Next",
  zh: "下一步",
  ko: "다음",
  es: "Siguiente",
  fr: "Suivant",
  th: "ถัดไป",
  de: "Weiter",
  ru: "Далее",
  it: "Avanti",
};

function LanguageSelectPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    languages[0]
  );

  return (
    <>
      <div className="flex items-center justify-center h-24 w-full sticky top-0 bg-lightPrimary border-b border-gray-200 shadow-md p-4">
        <span className="text-xl font-bold ">
          {welcomeMessages[selectedLanguage]}
        </span>
      </div>
      <ul className="flex flex-col items-center gap-4 mt-10">
        {languages.map((language, index) => (
          <li key={index}>
            <Button
              onClick={() => setSelectedLanguage(language)}
              className={cn(
                "w-80 h-16 text-black text-lg font-bold bg-white border-none rounded-[6px]",
                selectedLanguage === language && "bg-yellow-400 text-white"
              )}
            >
              {languageNames[language]}
            </Button>
          </li>
        ))}
      </ul>
      <div className="flex justify-center items-center p-10">
        <Button className="w-40 h-12 bg-white border border-gray-200 text-md font-bold bg-zinc-800 text-white">
          <span>{nextButtonText[selectedLanguage]}</span>
        </Button>
      </div>
    </>
  );
}

export default LanguageSelectPage;
