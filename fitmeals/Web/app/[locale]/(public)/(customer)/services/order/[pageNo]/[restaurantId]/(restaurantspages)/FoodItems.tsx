"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRestaurantFoodItems } from "@/src/query/useRestaurantFoodItems";
import FoodBox from "@/src/Components/ServiceComponent/order/FoodBox";
import FoodBoxLoading from "@/src/Components/ServiceComponent/order/FoodBoxLoading";
import ErrorComponent from "@/src/Components/errorComponent/ErrorComponent";
import { useTranslations } from "next-intl";
import { FoodItem } from "@/src/Apiservices/api/restaurant/getFoodItems";

interface Props {
  restaurantId: number;
  RestaurantID?: number;
  cartItems?: {
    id: number;
    quantity: number;
    itemId: number;
  }[];
}

const FoodItems = ({ restaurantId, RestaurantID, cartItems }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data, isLoading, isError } = useRestaurantFoodItems(restaurantId);
  const t = useTranslations("toast");

  const selectedTypes = useMemo(
    () => searchParams.get("types")?.split(",").filter(Boolean) || [],
    [searchParams],
  );
  const selectedCategory = useMemo(
    () => searchParams.get("category")?.split(",").filter(Boolean) || [],
    [searchParams],
  );
  const selectedPrice = useMemo(
    () =>
      (searchParams.get("price") || searchParams.get("priceRange"))
        ?.split(",")
        .filter(Boolean) || [],
    [searchParams],
  );
  const selectedRatings = useMemo(
    () => searchParams.get("ratings")?.split(",").filter(Boolean) || [],
    [searchParams],
  );
  const selectedDietary = useMemo(
    () => searchParams.get("dietary")?.split(",").filter(Boolean) || [],
    [searchParams],
  );

  const hasActiveFilters =
    selectedTypes.length > 0 ||
    selectedCategory.length > 0 ||
    selectedPrice.length > 0 ||
    selectedRatings.length > 0 ||
    selectedDietary.length > 0;

  const filteredItems = useMemo(() => {
    if (!data?.message || !Array.isArray(data.message)) {
      return [];
    }

    return data.message.filter((item: FoodItem) => {
      // 1. Types Filter
      if (selectedTypes.length > 0) {
        const itemType = (item.type || "").toUpperCase().replace(/[-\s]/g, "_");
        const match = selectedTypes.some((tKey) => {
          const norm = tKey.toLowerCase();
          if (norm === "veg" || norm === "vegetarian") {
            return itemType === "VEGETARIAN" || itemType === "VEG";
          }
          if (
            norm === "nonveg" ||
            norm === "non_veg" ||
            norm === "non-veg" ||
            norm === "non_vegetarian"
          ) {
            return itemType === "NON_VEGETARIAN" || itemType === "NON_VEG";
          }
          if (norm === "vegan") {
            return itemType === "VEGAN";
          }
          return itemType === norm.toUpperCase();
        });
        if (!match) return false;
      }

      // 2. Category Filter
      if (selectedCategory.length > 0) {
        const itemCat = (item.category || "")
          .toUpperCase()
          .replace(/[-\s&]/g, "_");
        const match = selectedCategory.some((cKey) => {
          const norm = cKey.toLowerCase();
          if (norm === "starters" || norm === "starter") {
            return itemCat.includes("STARTER");
          }
          if (
            norm === "maincourse" ||
            norm === "main_course" ||
            norm === "main course"
          ) {
            return (
              itemCat.includes("MAIN_COURSE") || itemCat.includes("MAINCOURSE")
            );
          }
          if (norm === "biryani") {
            return itemCat.includes("BIRYANI");
          }
          if (
            norm === "riceandnoodles" ||
            norm === "rice_noodles" ||
            norm === "rice_and_noodles"
          ) {
            return itemCat.includes("RICE") || itemCat.includes("NOODLE");
          }
          if (norm === "desserts" || norm === "dessert") {
            return itemCat.includes("DESSERT");
          }
          if (norm === "beverages" || norm === "beverage") {
            return itemCat.includes("BEVERAGE");
          }
          return itemCat === norm.toUpperCase();
        });
        if (!match) return false;
      }

      // 3. Price Filter
      if (selectedPrice.length > 0) {
        const price = Number(item.price);
        const match = selectedPrice.some((pKey) => {
          if (pKey === "under100") return price < 100;
          if (pKey === "100to200") return price >= 100 && price <= 200;
          if (pKey === "200to400") return price >= 200 && price <= 400;
          if (pKey === "above400") return price > 400;
          return true;
        });
        if (!match) return false;
      }

      // 4. Ratings Filter
      if (selectedRatings.length > 0) {
        const rating = Number(item.averageRating || 0);
        const match = selectedRatings.some((rKey) => {
          const starNum = parseInt(rKey.replace(/\D/g, ""), 10);
          if (isNaN(starNum)) return true;
          return rating >= starNum;
        });
        if (!match) return false;
      }

      // 5. Dietary Filter
      if (selectedDietary.length > 0) {
        const benefits = (item.foodBenefits || []).map((b) => b.toUpperCase());
        const match = selectedDietary.some((dKey) => {
          const norm = dKey.toLowerCase();
          if (norm === "lowcalorie") {
            return (
              (item.caloriesPer100gm && item.caloriesPer100gm <= 200) ||
              benefits.some(
                (b) => b.includes("LOW CALORIE") || b.includes("WEIGHT LOSS"),
              )
            );
          }
          if (norm === "highprotein") {
            return (
              (item.proteinPer100gm && item.proteinPer100gm >= 15) ||
              benefits.some(
                (b) => b.includes("HIGH PROTEIN") || b.includes("MUSCLE GAIN"),
              )
            );
          }
          if (norm === "lowcarb") {
            return (
              (item.carboHydratePer100gm && item.carboHydratePer100gm <= 20) ||
              benefits.some(
                (b) => b.includes("LOW CARB") || b.includes("KETO"),
              )
            );
          }
          if (norm === "lowfat") {
            return (
              (item.fatsPer100gm && item.fatsPer100gm <= 5) ||
              benefits.some(
                (b) => b.includes("LOW FAT") || b.includes("GOOD FAT"),
              )
            );
          }
          return true;
        });
        if (!match) return false;
      }

      return true;
    });
  }, [
    data?.message,
    selectedTypes,
    selectedCategory,
    selectedPrice,
    selectedRatings,
    selectedDietary,
  ]);

  const clearAllFilters = () => {
    router.push(pathname, { scroll: false });
  };

  if (isLoading) {
    return (
      <div className="w-full grid grid-cols-1 gap-2 lg:grid-cols-2 lg:pt-10 h-full p-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <FoodBoxLoading key={index + 1} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-90 h-90 md:w-160 md:h-170 ml-auto mr-auto">
        <ErrorComponent
          label={t("common.failed")}
          btnTxt={t("common.tryAgain")}
          whiteBg
          refreshBtn
        />
      </div>
    );
  }

  if (!filteredItems || filteredItems.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-8 mt-10 bg-white rounded-xl border border-gray-200 shadow-sm text-center">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4 text-green-600">
          <i className="fa-solid fa-utensils text-2xl"></i>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-1">
          {hasActiveFilters
            ? "No food items found matching your filters"
            : "No food items available"}
        </h3>
        <p className="text-sm text-gray-500 max-w-md mb-4">
          {hasActiveFilters
            ? "Try adjusting your filters or clearing them to see all available menu items."
            : "This restaurant currently has no items listed in their menu."}
        </p>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg shadow transition-colors cursor-pointer"
          >
            Clear All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 gap-2 lg:grid-cols-2 lg:pt-10 h-full p-2">
      {filteredItems.map((item: any) => (
        <FoodBox
          key={item.id}
          itemsData={item}
          presentRestaurantId={restaurantId}
          RestaurantID={RestaurantID}
          cartItems={cartItems}
        />
      ))}
    </div>
  );
};

export default FoodItems;

