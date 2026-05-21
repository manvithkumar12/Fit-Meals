import type { RegisterRole } from "@/src/types/RegisterCard.types";
import RegisterCard from "@/src/Components/Register/RegisterCard";
import React from "react";
import { notFound } from "next/navigation";
import RoleCards from "@/src/Components/RoleCards/RoleCards";
import ApplicationCard from "@/src/Components/ApplicationCard/ApplicationCard";
import { getTranslations } from "next-intl/server";

type PageProps = {
  params: Promise<{
    locale: string;
    Type: RegisterRole;
  }>;
};

const page = async ({ params }: PageProps) => {
  const { locale, Type } = await params;

  const t = await getTranslations({
    locale,
    namespace: "Register",
  });

  const allowedRole: RegisterRole[] = [
    "Customer",
    "DeliveryPartner",
    "RestaurantPartner",
    "SupportTeam",
  ];

  if (!allowedRole.includes(Type)) notFound();

  const RoleCardsObj = {
    Customer: {
      type: "Customer",
      imageId: "https://img.icons8.com/ios-glyphs/90/user--v1.png",
      navigation: "Customer",
      btnTxt: t("card.CU"),
    },
    DeliveryPartner: {
      type: "DeliveryPartner",
      imageId: "https://drin721riupcf.cloudfront.net/web-assest/delivery.jpeg",
      navigation: "DeliveryPartner",
      btnTxt: t("card.DP"),
    },
    RestaurantPartner: {
      type: "RestaurantPartner",
      imageId:
        "https://drin721riupcf.cloudfront.net/web-assest/shopkeeper.webp",
      navigation: "RestaurantPartner",
      btnTxt: t("card.RP"),
    },
    SupportTeam: {
      type: "Customer",
      imageId: "https://img.icons8.com/ios-glyphs/90/user--v1.png",
      navigation: "Customer",
      btnTxt: t("card.RP"),
    },
  };

  return (
    <div className="w-screen justify-center items-center flex-wrap h-max pb-20 lg:gap-10 flex">
      <div className="w-95 md:w-130 mt-20">
        <RegisterCard role={Type} />
      </div>

      <div className="mt-20 gap-3 flex flex-col">
        {Type === "Customer" && (
          <div className="flex flex-col p-2 gap-3">
            <RoleCards
              type="Register"
              imageid={RoleCardsObj.RestaurantPartner.imageId}
              navigation={RoleCardsObj.RestaurantPartner.navigation}
              btnTxt={RoleCardsObj.RestaurantPartner.btnTxt}
            />
            <RoleCards
              type="Register"
              imageid={RoleCardsObj.DeliveryPartner.imageId}
              navigation={RoleCardsObj.DeliveryPartner.navigation}
              btnTxt={RoleCardsObj.DeliveryPartner.btnTxt}
            />
          </div>
        )}

        {Type === "DeliveryPartner" && (
          <div className="flex flex-col p-2 gap-3">
            <RoleCards
              type="Register"
              imageid={RoleCardsObj.RestaurantPartner.imageId}
              navigation={RoleCardsObj.RestaurantPartner.navigation}
              btnTxt={RoleCardsObj.RestaurantPartner.btnTxt}
            />
            <RoleCards
              type="Register"
              imageid={RoleCardsObj.Customer.imageId}
              navigation={RoleCardsObj.Customer.navigation}
              btnTxt={RoleCardsObj.Customer.btnTxt}
            />
          </div>
        )}

        {Type === "RestaurantPartner" && (
          <div className="flex flex-col p-2 gap-3">
            <RoleCards
              type="Register"
              imageid={RoleCardsObj.Customer.imageId}
              navigation={RoleCardsObj.Customer.navigation}
              btnTxt={RoleCardsObj.Customer.btnTxt}
            />
            <RoleCards
              type="Register"
              imageid={RoleCardsObj.DeliveryPartner.imageId}
              navigation={RoleCardsObj.DeliveryPartner.navigation}
              btnTxt={RoleCardsObj.DeliveryPartner.btnTxt}
            />
          </div>
        )}

        {Type === "SupportTeam" && (
          <div className="flex flex-col p-2 gap-3">
            <RoleCards
              type="Register"
              imageid={RoleCardsObj.Customer.imageId}
              navigation={RoleCardsObj.Customer.navigation}
              btnTxt={RoleCardsObj.Customer.btnTxt}
            />
            <RoleCards
              type="Register"
              imageid={RoleCardsObj.DeliveryPartner.imageId}
              navigation={RoleCardsObj.DeliveryPartner.navigation}
              btnTxt={RoleCardsObj.DeliveryPartner.btnTxt}
            />
          </div>
        )}
      </div>

      <div className="md:mt-25 mt-10">
        <ApplicationCard />
      </div>
    </div>
  );
};

export default page;