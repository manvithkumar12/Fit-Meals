type Translator = (key: string) => string;

export const completeData = (t: Translator) => {
  const Types = [t("veg"), t("nonVeg"), t("vegan")];

  const Category = [
    t("starters"),
    t("mainCourse"),
    t("biryani"),
    t("riceAndNoodles"),
    t("desserts"),
    t("beverages"),
  ];

  const Price_Range = [
    t("under100"),
    t("100to200"),
    t("200to400"),
    t("above400"),
  ];

  const Ratings = [
    t("1Star"),
    t("2Stars"),
    t("3Stars"),
    t("4Stars"),
    t("5Stars"),
  ];

  const Dietary = [
    t("lowCalorie"),
    t("highProtein"),
    t("lowCarb"),
    t("lowFat"),
  ];

  return {
    Types,
    Category,
    Price_Range,
    Ratings,
    Dietary,
  };
};
