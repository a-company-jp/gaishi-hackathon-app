import "server-only";
import { Language } from "../types/language";
import { Dictionary } from "../types/dictionary";

const dictionaries = {
  ja: () =>
    import("./dictionaries/ja.json").then(
      (module) => module.default as Dictionary
    ),
  en: () =>
    import("./dictionaries/en.json").then(
      (module) => module.default as Dictionary
    ),
  zh: () =>
    import("./dictionaries/zh.json").then(
      (module) => module.default as Dictionary
    ),
  ko: () =>
    import("./dictionaries/ko.json").then(
      (module) => module.default as Dictionary
    ),
  es: () =>
    import("./dictionaries/es.json").then(
      (module) => module.default as Dictionary
    ),
  fr: () =>
    import("./dictionaries/fr.json").then(
      (module) => module.default as Dictionary
    ),
  th: () =>
    import("./dictionaries/th.json").then(
      (module) => module.default as Dictionary
    ),
  de: () =>
    import("./dictionaries/de.json").then(
      (module) => module.default as Dictionary
    ),
  ru: () =>
    import("./dictionaries/ru.json").then(
      (module) => module.default as Dictionary
    ),
  it: () =>
    import("./dictionaries/it.json").then(
      (module) => module.default as Dictionary
    ),
};

export const getDictionary = async (language: Language) =>
  dictionaries[language]();
