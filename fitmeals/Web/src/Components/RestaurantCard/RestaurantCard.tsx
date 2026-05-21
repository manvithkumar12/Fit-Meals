import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

interface Type {
  CardType: "reservation" | "order";
  pageNo?: number | 1;
  pageNoReservation?: number | 1;
  hotelData?: {
    address: string;
    area: string;
    averageRating: number;
    city: string;
    closingTime: string;
    cuisineType: string;
    id: number;
    images: string;
    mapLink: string;
    name: string;
    openingTime: string;
    priceForTwo: number;
    streetName: string;
    totalReviews: number;
  };
}

const getHref = (
  locale: string,
  CardType: "reservation" | "order",
  id: number | null,
  hotelName: string,
  pageNo?: number | 1,
  pageNoReservation?: number | 1,
): string => {
  if (!id) return "#";

  if (CardType === "reservation") {
    return `/${locale}/services/reservation/${pageNoReservation}/${id}-${hotelName}`;
  }

  return `/${locale}/services/order/${pageNo}/${id}-${hotelName}`;
};

const RestaurantCard = ({
  CardType,
  hotelData,
  pageNo,
  pageNoReservation,
}: Type) => {
  const t = useTranslations("Services.RestaurantCard");

  const locale = useLocale();

  const [isOpen, setIsOpen] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const checkIsOpen = () => {
      if (!hotelData?.openingTime || !hotelData?.closingTime) return false;

      const now = new Date();

      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();

      const [openH, openM] = hotelData.openingTime.split(":").map(Number);

      const [closeH, closeM] = hotelData.closingTime.split(":").map(Number);

      const currentTotalMinutes = currentHours * 60 + currentMinutes;

      const openTotalMinutes = openH * 60 + openM;

      let closeTotalMinutes = closeH * 60 + closeM;

      if (closeTotalMinutes < openTotalMinutes) {
        if (currentTotalMinutes <= closeTotalMinutes) {
          return true;
        }

        closeTotalMinutes += 24 * 60;
      }

      return (
        currentTotalMinutes >= openTotalMinutes &&
        currentTotalMinutes <= closeTotalMinutes
      );
    };

    setIsOpen(checkIsOpen());
  }, [hotelData?.openingTime, hotelData?.closingTime]);

  const buttonText =
    CardType === "reservation" ? t("book_now") : t("view_menu");

  return (
    <div className="w-full overflow-scroll h-max max-h-57 rounded-lg pl-2 pt-2 pb-2 shadow-md hover:shadow-lg transition-shadow flex bg-white border border-gray-300">
      <div className="w-[38%] mt-3">
        <div className="image relative rounded-lg h-30 md:h-38 bg-red-400">
          <Image
            alt={hotelData?.name || "Restaurant Image"}
            src={hotelData?.images || "/Fitmeals-logo.png"}
            loading="lazy"
            fill
            sizes="(max-width: 768px) 120px, 152px"
            placeholder="blur"
            blurDataURL="/blur.jpeg"
            className="object-cover rounded-lg"
          />
        </div>

        <div>
          <button
            className="bg-green-600 gap-2 p-1 pr-1.5 pl-1.5 flex items-center font-semibold text-white mt-2 rounded-md"
            onClick={() =>
              (globalThis.location.href = hotelData?.mapLink || "")
            }
          >
            <i className="fa-solid fa-map text-white"></i>
            {t("view_maps")}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 w-[60%] pl-3 p-2">
        <h2 className="font-bold text-xl">{hotelData?.name}</h2>

        <h4 className="text-sm">
          <i className="fa-solid mr-2 fa-location-dot"></i>
          1.2km • {hotelData?.city} • {hotelData?.area}
        </h4>

        <div className="flex gap-2 w-full">
          <div className="flex w-max pl-3 pr-3 rounded-lg p-1 bg-yellow-100 items-center gap-2">
            <i className="fa-solid fa-star text-yellow-300"></i>

            <h2 className="font-bold">{hotelData?.averageRating}</h2>
          </div>

          <div className="hidden md:flex w-max pl-3 pr-3 rounded-lg p-1 bg-gray-100 items-center gap-2">
            <h2>
              ({hotelData?.totalReviews} {t("review")})
            </h2>
          </div>
        </div>

        <div className="hidden md:flex gap-2 items-center">
          <h4 className="text-sm">
            <span className="font-bold">€{hotelData?.priceForTwo}</span>{" "}
            {t("for_two")}
          </h4>

          <h4 className="text-sm">
            •
            {hotelData?.cuisineType
              ? hotelData.cuisineType.charAt(0).toUpperCase() +
                hotelData.cuisineType.slice(1).toLowerCase()
              : ""}
            <span className="ml-1">{t("Cuisine")}</span>
          </h4>
        </div>

        <div className="gap-2 hidden md:flex min-h-7">
          {isOpen === true && (
            <>
              <div className="bg-green-100 w-max p-1 pl-2 pr-2 rounded-lg">
                <h4 className="text-green-700 text-sm font-semibold">
                  • {t("open_now")}
                </h4>
              </div>

              <div className="w-max p-1 pl-2 pr-2 rounded-lg">
                <h4 className="text-sm">
                  {t("closes_at")} {hotelData?.closingTime}
                </h4>
              </div>
            </>
          )}

          {isOpen === false && (
            <>
              <div className="bg-red-100 w-max p-1 pl-2 pr-2 rounded-lg">
                <h4 className="text-red-700 text-sm font-semibold">
                  • {t("closed")}
                </h4>
              </div>

              <div className="w-max p-1 pl-2 pr-2 rounded-lg">
                <h4 className="text-sm">
                  {t("opens_at")} {hotelData?.openingTime}
                </h4>
              </div>
            </>
          )}
        </div>

        <div className="w-max ml-auto">
          <Link
            href={getHref(
              locale,
              CardType,
              hotelData?.id || null,
              hotelData?.name || "",
              pageNo || 1,
              pageNoReservation || 1,
            )}
            className="ml-auto"
          >
            <button className="ml-auto md:mt-1 flex gap-1 items-center max-h-8 mt-3 bg-green-600 h-10 group rounded-md text-white font-semibold cursor-pointer p-1 pr-1.5 pl-1.5 md:p-2">
              {buttonText}

              <i className="fa-solid text-xl fa-angle-right transition-transform duration-200 group-hover:translate-x-0.5"></i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
