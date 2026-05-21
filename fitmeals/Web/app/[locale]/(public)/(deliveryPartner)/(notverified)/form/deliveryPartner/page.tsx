import PartnerFooter from "@/src/Components/Delivery-partner/partnerFooter";
import PartnerInfo from "@/src/Components/Delivery-partner/PartnerInfo";
import PartnerPhoto from "@/src/Components/Delivery-partner/PartnerPhoto";
import GuidLines from "@/src/Components/RestaurantCreation/RestaurantMeals/GuidLines";
import { RiderProvider } from "@/src/context/RiderContext";
import { getTranslations } from "next-intl/server";

const page = async ({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) => {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "Form_DeliveryPartner",
  });
  return (
    <RiderProvider>
      <div className="w-full h-max">
        <div className="text-center pt-3">
          <h1 className="text-xl lg:text-3xl font-semibold">
            {t("form.Driver_Registration")}
          </h1>
          <h3 className="text-sm opacity-50 mt-1">{t("form.sub_title")}</h3>
        </div>

        <div className="flex pb-10 flex-col w-full bg-white md:ml-auto md:mr-auto pt-2 pl-2 md:w-[80%] md:items-center md:justify-center pr-2 ">
          <PartnerInfo />
          <PartnerPhoto />
          <PartnerFooter />
          <GuidLines Pagetype="DeliveryPartner" />
        </div>
      </div>
    </RiderProvider>
  );
};

export default page;
