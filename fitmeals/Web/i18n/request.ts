import { getRequestConfig } from "next-intl/server";
export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = locale ?? "de";
  const common = (await import(`./messages/${resolvedLocale}/Common.json`))
    .default;
  const homepage = (await import(`./messages/${resolvedLocale}/Homepage.json`))
    .default;
  const Membership = (
    await import(`./messages/${resolvedLocale}/Membership.json`)
  ).default;
  const About = (await import(`./messages/${resolvedLocale}/About.json`))
    .default;
  const Menu = (await import(`./messages/${resolvedLocale}/Menu.json`)).default;
  const Contact = (await import(`./messages/${resolvedLocale}/Contact.json`))
    .default;
  const Profile = (await import(`./messages/${resolvedLocale}/Profile.json`))
    .default;
  const Cart = (await import(`./messages/${resolvedLocale}/Cart.json`)).default;
  const Dashboard = (
    await import(`./messages/${resolvedLocale}/Dashboard/Dashboard.json`)
  ).default;
  const Manager = (
    await import(`./messages/${resolvedLocale}/Dashboard/Manager.json`)
  ).default;
  const Customer = (
    await import(`./messages/${resolvedLocale}/Dashboard/Customer.json`)
  ).default;
  const DeliveryPartner = (
    await import(`./messages/${resolvedLocale}/Dashboard/DeliveryPartner.json`)
  ).default;
  const Form_DeliveryPartner = (
    await import(`./messages/${resolvedLocale}/form/DeliveryPartner.json`)
  ).default;
  const Form_Meals = (
    await import(`./messages/${resolvedLocale}/form/Meals.json`)
  ).default;
  const Form_Restaurant = (
    await import(`./messages/${resolvedLocale}/form/Restaurant.json`)
  ).default;
  const SavedAddress = (
    await import(`./messages/${resolvedLocale}/SavedAddress.json`)
  ).default;
  const DietPlan = (
    await import(`./messages/${resolvedLocale}/DietPlan/DietPlan.json`)
  ).default;
  const Earnings = (await import(`./messages/${resolvedLocale}/Earnings.json`))
    .default;
  const Fit_tracker = (
    await import(`./messages/${resolvedLocale}/Fit-tracker.json`)
  ).default;
  const LoginPage = (
    await import(`./messages/${resolvedLocale}/login-Register/Login.json`)
  ).default;
  const Payments = (await import(`./messages/${resolvedLocale}/Payments.json`))
    .default;
  const Register = (
    await import(`./messages/${resolvedLocale}/login-Register/Register.json`)
  ).default.Register;
  const Services = (await import(`./messages/${resolvedLocale}/Services.json`))
    .default;
  const Ingredients = (
    await import(`./messages/${resolvedLocale}/Ingredients.json`)
  ).default;
  const Status = (await import(`./messages/${resolvedLocale}/status.json`))
    .default;
  const Overview = (await import(`./messages/${resolvedLocale}/overview.json`))
    .default;
  const LearnMore = (
    await import(`./messages/${resolvedLocale}/learnMore.json`)
  ).default;
  const toast = (await import(`./messages/${resolvedLocale}/toast/toast.json`))
    .default;
  const Reservation_form = (
    await import(`./messages/${resolvedLocale}/Restaurant/Reservation.json`)
  ).default;
  const food_item = (
    await import(`./messages/${resolvedLocale}/Restaurant/foodItem.json`)
  ).default;
  const Verification = (
    await import(`./messages/${resolvedLocale}/Restaurant/verification.json`)
  ).default;
  const Recognition = (
    await import(`./messages/${resolvedLocale}/Recognition.json`)
  ).default;
  const MyOrders = (await import(`./messages/${resolvedLocale}/MyOrders.json`))
    .default;
  const ContactBot = (
    await import(`./messages/${resolvedLocale}/ContactBot.json`)
  ).default;
  const errorPage = (
    await import(`./messages/${resolvedLocale}/errorPage.json`)
  ).default;
  return {
    locale: resolvedLocale,
    messages: {
      ...common,
      homepage,
      Recognition,
      errorPage,
      Membership,
      About,
      Verification,
      ContactBot,
      Menu,
      Contact,
      LearnMore,
      Profile,
      Cart,
      MyOrders,
      Dashboard,
      Manager,
      Customer,
      DeliveryPartner,
      food_item,
      Form_DeliveryPartner,
      Form_Meals,
      Form_Restaurant,
      SavedAddress,
      DietPlan,
      Earnings,
      Fit_tracker,
      LoginPage,
      Payments,
      Register,
      Reservation_form,
      Services,
      Ingredients,
      Status,
      Overview,
      toast,
    },
  };
});
