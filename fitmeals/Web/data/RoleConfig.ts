type Translator = (key:string)=> string
export const RoleConfig = (t:Translator) =>({
    Customer: {
      title: t("RoleConfig.Customer.title"),
      subtitle: t("RoleConfig.Customer.subtitle"),
      coloum1: t("RoleConfig.Customer.coloum1"),
      Login: t("RoleConfig.Customer.Login"),
    },
    DeliveryPartner: {
      title: t("RoleConfig.DeliveryPartner.title"),
      subtitle: t("RoleConfig.DeliveryPartner.subtitle"),
      coloum1: t("RoleConfig.DeliveryPartner.coloum1"),
      Login: t("RoleConfig.DeliveryPartner.Login"),
    },
    RestaurantPartner: {
      title: t("RoleConfig.RestaurantPartner.title"),
      subtitle: t("RoleConfig.RestaurantPartner.subtitle"),
      coloum1: t("RoleConfig.RestaurantPartner.coloum1"),
      Login: t("RoleConfig.RestaurantPartner.Login"),
    },
    SupportTeam: {
      title: t("RoleConfig.RestaurantPartner.title"),
      subtitle: t("RoleConfig.RestaurantPartner.subtitle"),
      coloum1: t("RoleConfig.RestaurantPartner.coloum1"),
      Login: t("RoleConfig.RestaurantPartner.Login"),
    },
  });