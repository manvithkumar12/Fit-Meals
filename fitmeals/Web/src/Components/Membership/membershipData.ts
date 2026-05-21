type Translator = (key: string) => string;

export const MembershipData = (t: Translator) => [
  {
    id: t("starter.title"),
    title: t("starter.title"),
    info: t("starter.info"),
    priceMonth: "€16.00",
    billing: t("starter.monthly"),
    yearPrice: "€180.00",
    include: t("premium.include"),
    includes: [
      t("starter.feature1"),
      t("starter.feature2"),
      t("starter.feature3"),
    ],
  },
  {
    id: t("plus.title"),
    title: t("plus.title"),
    info: t("plus.info"),
    priceMonth: "€29.00",
    billing: t("starter.monthly"),
    yearPrice: "€300.00",
    include: t("premium.include"),
    includes: [
      t("plus.feature1"),
      t("plus.feature2"),
      t("plus.feature3"),
      t("plus.feature4"),
    ],
  },
  {
    id: t("premium.title"),
    title: t("premium.title"),
    info: t("premium.info"),
    priceMonth: "€49.00",
    billing: t("starter.monthly"),
    yearPrice: "€500.00",
    include: t("premium.include"),
    includes: [
      t("premium.feature1"),
      t("premium.feature2"),
      t("premium.feature3"),
      t("premium.feature4"),
    ],
  },
];
