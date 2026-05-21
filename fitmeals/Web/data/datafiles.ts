type Translator = (key: string) => string;

export const getOrderFeatures = (t: Translator) => [
  {
    title: t("orderfeatures.order1"),
    info: t("orderfeatures.info1"),
    icon: "fa-solid fa-arrows-rotate text-3xl"
  },
  {
    title: t("orderfeatures.order2"),
    info: t("orderfeatures.info2"),
    icon: "fa-solid fa-truck text-3xl"
  },
  {
    title: t("orderfeatures.order3"),
    info: t("orderfeatures.info3"),
    icon: "fa-regular fa-star text-3xl"
  }
];

export const getCookbookFeatures = (t: Translator) => [
  {
    title: t("cbookfeatures.cbook1"),
    info: t("cbookfeatures.info1"),
    icon: "fa-solid fa-book-open text-3xl"
  },
  {
    title: t("cbookfeatures.cbook2"),
    info: t("cbookfeatures.info2"),
    icon: "fa-solid fa-utensils text-3xl"
  },
  {
    title: t("cbookfeatures.cbook3"),
    info: t("cbookfeatures.info3"),
    icon: "fa-solid fa-user-check text-3xl"
  }
];

export const getDineInFeatures = (t: Translator) => [
  {
    title: t("dinefeatures.dine1"),
    info: t("dinefeatures.info1"),
    icon: "fa-solid fa-chair text-3xl"
  },
  {
    title: t("dinefeatures.dine2"),
    info: t("dinefeatures.info2"),
    icon: "fa-solid fa-bell-concierge text-3xl"
  },
  {
    title: t("dinefeatures.dine3"),
    info: t("dinefeatures.info3"),
    icon: "fa-solid fa-handshake text-3xl"
  }
];