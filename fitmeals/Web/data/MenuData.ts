type Translator = (key: string) => string;
export const LabelData = (t: Translator) => ({
  starter: {
    title: t("starter.title"),
    imgUrl: "/Subscription.png",
    description: t("starter.sub-title"),
    points: [
      t("starter.heading1"),
      t("starter.heading2"),
      t("starter.heading3"),
    ],
    btntxt: t("button.membershipbtn"),
    CardsTitle: "",
    CardsLabel: "",
    btnTxt1: "€16.00",
    btnTxt2: "€180.00",
  },
  plus: {
    title: t("plus.title"),
    imgUrl: "/Subscription.png",
    description: t("plus.sub-title"),
    points: [t("plus.heading1"), t("plus.heading2"), t("plus.heading3")],
    btntxt: t("button.membershipbtn"),
    CardsTitle: "",
    CardsLabel: "",
    btnTxt1: "€29.00",
    btnTxt2: "€300.00",
  },
  premium: {
    title: t("premium.title"),
    imgUrl: "/Subscription.png",
    description: t("premium.sub-title"),
    points: [
      t("premium.heading1"),
      t("premium.heading2"),
      t("premium.heading3"),
    ],
    btntxt: t("button.membershipbtn"),
    CardsTitle: "",
    CardsLabel: "",
    btnTxt1: "€49.00",
    btnTxt2: "€500.00",
  },
});
