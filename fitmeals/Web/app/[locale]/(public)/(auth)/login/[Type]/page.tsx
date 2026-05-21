import type { loginRole } from "@/src/types/LoginCard.types";
import LoginCard from "@/src/Components/LoginCard/LoginCard";
import React from "react";
import { notFound } from "next/navigation";
import RoleCards from "@/src/Components/RoleCards/RoleCards";
import ApplicationCard from "@/src/Components/ApplicationCard/ApplicationCard";
import { getTranslations } from "next-intl/server";

type PageProps = {
  params: Promise<{
    locale: string;
    Type: loginRole;
  }>;
};

const page = async ({ params }: PageProps) => {
  const { locale, Type } = await params;

  const t = await getTranslations({
    locale,
    namespace: "LoginPage",
  });

  const allowedRole: loginRole[] = [
    "Customer",
    "DeliveryPartner",
    "SupportTeam",
    "RestaurantPartner",
  ];

  if (!allowedRole.includes(Type)) notFound();

  const RoleCardsObj = {
    Customer: {
      type: "Customer",
      imageId: "https://img.icons8.com/ios-glyphs/90/user--v1.png",
      navigation: "Customer",
      btnTxt: t("dynamic_card.login_as_user"),
    },
    SupportTeam: {
      type: "Customer",
      imageId: "https://img.icons8.com/ios-glyphs/90/user--v1.png",
      navigation: "Customer",
      btnTxt: t("dynamic_card.login_as_user"),
    },
    DeliveryPartner: {
      type: "DeliveryPartner",
      imageId: "https://drin721riupcf.cloudfront.net/web-assest/delivery.jpeg",
      navigation: "DeliveryPartner",
      btnTxt: t("dynamic_card.login_as_delivery_partner"),
    },
    RestaurantPartner: {
      type: "RestaurantPartner",
      imageId:
        "https://drin721riupcf.cloudfront.net/web-assest/shopkeeper.webp",
      navigation: "RestaurantPartner",
      btnTxt: t("dynamic_card.login_as_restaurant_partner"),
    },
  };

  const renderRoleCards = () => {
    if (Type === "Customer") {
      return (
        <div className="flex flex-col p-2 gap-3">
          <RoleCards
            type="Login"
            imageid={RoleCardsObj.RestaurantPartner.imageId}
            navigation={RoleCardsObj.RestaurantPartner.navigation}
            btnTxt={RoleCardsObj.RestaurantPartner.btnTxt}
          />
          <RoleCards
            type="Login"
            imageid={RoleCardsObj.DeliveryPartner.imageId}
            navigation={RoleCardsObj.DeliveryPartner.navigation}
            btnTxt={RoleCardsObj.DeliveryPartner.btnTxt}
          />
        </div>
      );
    }

    if (Type === "DeliveryPartner") {
      return (
        <div className="flex flex-col p-2 gap-3">
          <RoleCards
            type="Login"
            imageid={RoleCardsObj.RestaurantPartner.imageId}
            navigation={RoleCardsObj.RestaurantPartner.navigation}
            btnTxt={RoleCardsObj.RestaurantPartner.btnTxt}
          />
          <RoleCards
            type="Login"
            imageid={RoleCardsObj.Customer.imageId}
            navigation={RoleCardsObj.Customer.navigation}
            btnTxt={RoleCardsObj.Customer.btnTxt}
          />
        </div>
      );
    }

    if (Type === "RestaurantPartner") {
      return (
        <div className="flex flex-col p-2 gap-3">
          <RoleCards
            type="Login"
            imageid={RoleCardsObj.Customer.imageId}
            navigation={RoleCardsObj.Customer.navigation}
            btnTxt={RoleCardsObj.Customer.btnTxt}
          />
          <RoleCards
            type="Login"
            imageid={RoleCardsObj.DeliveryPartner.imageId}
            navigation={RoleCardsObj.DeliveryPartner.navigation}
            btnTxt={RoleCardsObj.DeliveryPartner.btnTxt}
          />
        </div>
      );
    }

    if (Type === "SupportTeam") {
      return (
        <div className="flex flex-col p-2 gap-3">
          <RoleCards
            type="Login"
            imageid={RoleCardsObj.Customer.imageId}
            navigation={RoleCardsObj.Customer.navigation}
            btnTxt={RoleCardsObj.Customer.btnTxt}
          />
          <RoleCards
            type="Login"
            imageid={RoleCardsObj.DeliveryPartner.imageId}
            navigation={RoleCardsObj.DeliveryPartner.navigation}
            btnTxt={RoleCardsObj.DeliveryPartner.btnTxt}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-screen justify-center items-center flex-wrap h-max pb-20 lg:gap-10 flex">
      <div className="w-[95%] md:w-130 mt-20">
        <LoginCard role={Type} />
      </div>

      <div className="mt-20 gap-3 flex flex-col">
        {renderRoleCards()}
      </div>

      <div className="md:mt-25 mt-10">
        <ApplicationCard />
      </div>
    </div>
  );
};

export default page;