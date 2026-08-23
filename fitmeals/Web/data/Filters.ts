type Translator = (key: string) => string;

export interface FilterItem {
  key: string;
  label: string;
}

export const completeData = (t: Translator) => {
  const Types: FilterItem[] = [
    { key: "veg", label: t("veg") },
    { key: "nonVeg", label: t("nonVeg") },
    { key: "vegan", label: t("vegan") },
  ];

  const Category: FilterItem[] = [
    { key: "starters", label: t("starters") },
    { key: "mainCourse", label: t("mainCourse") },
    { key: "biryani", label: t("biryani") },
    { key: "riceAndNoodles", label: t("riceAndNoodles") },
    { key: "desserts", label: t("desserts") },
    { key: "beverages", label: t("beverages") },
  ];

  const Price_Range: FilterItem[] = [
    { key: "under100", label: t("under100") },
    { key: "100to200", label: t("100to200") },
    { key: "200to400", label: t("200to400") },
    { key: "above400", label: t("above400") },
  ];

  const Ratings: FilterItem[] = [
    { key: "5Stars", label: t("5Stars") },
    { key: "4Stars", label: t("4Stars") },
    { key: "3Stars", label: t("3Stars") },
    { key: "2Stars", label: t("2Stars") },
    { key: "1Star", label: t("1Star") },
  ];

  const Dietary: FilterItem[] = [
    { key: "lowCalorie", label: t("lowCalorie") },
    { key: "highProtein", label: t("highProtein") },
    { key: "lowCarb", label: t("lowCarb") },
    { key: "lowFat", label: t("lowFat") },
  ];

  return {
    Types,
    Category,
    Price_Range,
    Ratings,
    Dietary,
  };
};

