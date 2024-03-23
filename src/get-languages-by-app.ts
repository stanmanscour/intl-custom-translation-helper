const getLanguagesByApp = (
  application: Application
): { key: Lang; flag: any }[] => {
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
