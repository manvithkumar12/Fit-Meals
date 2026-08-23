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
    { key: "under10", label: t("under10") },
    { key: "10to20", label: t("10to20") },
    { key: "20to30", label: t("20to30") },
    { key: "above30", label: t("above30") },
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

