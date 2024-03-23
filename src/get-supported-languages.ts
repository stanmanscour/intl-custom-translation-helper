import { Application, Lang } from "./types";

export const getSupportedLanguages = (
  application: Application
): { key: Lang; flag: string }[] => {
  if (application === "MD.React.Patient") {
    return [
      { key: "fr", flag: "🇫🇷" },
      { key: "en", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { key: "es", flag: "🇪🇸" },
      { key: "pt", flag: "🇵🇹" },
    ];
  } else {
    return [{ key: "fr", flag: "🇫🇷" }];
  }
};
