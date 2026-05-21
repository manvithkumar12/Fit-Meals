import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Skeleton from "@mui/material/Skeleton";
import Link from "@/src/Components/LocalizedLink";
import { toast } from "react-toastify";
import { cartContext } from "@/src/context/cartContext";
import { useAddress } from "@/src/query/useAddress";
import { useTranslations } from "next-intl";
import ErrorComponent from "../errorComponent/ErrorComponent";
import { setCartaddress } from "@/app/api/actions/address/address";

interface Dataprops {
  userId: number | undefined;
  setpopUp: React.Dispatch<React.SetStateAction<boolean>>;
}
interface Address {
  id: number;
  name: string;
  pinCode: string;
  isDefault: boolean;
  address: string;
  lat: number | null;
  long: number | null;
}
const AddressBlock = ({ userId, setpopUp }: Dataprops) => {
  const router = useRouter();
  const [addressloading, setAddressLoading] = useState(false);
  const context = useContext(cartContext);
  const setUserAddress = context?.setUserAddress;
  const setCityName = context?.setCityName;
  const t = useTranslations("Cart");
  const { data: addressData, isLoading, error } = useAddress(userId!);
  const changeAddress = async (itemId: number) => {
    if (!userId) {
      toast.error(t("CartPage.pleaseLoginFirst"));
      router.push("/login");
      return;
    }
    try {
      setAddressLoading(true);
      setpopUp(false);
      const UseraddressData = await setCartaddress(userId, itemId);
    } catch {
      toast.error(t("CartPage.errorOccured"));
      setpopUp(true);
    } finally {
      setAddressLoading(false);
    }
  };
  const changeContext = ({ lat, long }: { lat: number; long: number }) => {
    context?.setUserAddress({ lat, long });
  };
  return (
    <div className="h-max w-90 text-xs md:text-[15px] md:w-120  flex flex-col justify-center items-center gap-3">
      <h2 className="text-lg font-semibold">
        {t("CartPage.selectSavedAddress")}
      </h2>
      {isLoading ? (
        <div>
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index + 1}
              className="md:w-110 bg-white border border-gray-400 mt-2 rounded-md h-30 flex items-center cursor-pointer shadow-md active:shadow"
            >
              <Skeleton
                variant="rectangular"
                animation="wave"
                width="100%"
                height="100%"
              />
            </div>
          ))}
        </div>
      ) : addressData?.length === 0 ? (
        <div className="h-90 w-90">
          <ErrorComponent
            whiteBg
            label={t("CartPage.noSavedAddress")}
            btnTxt={t("CartPage.addAddress")}
            navUrl={"/deliveryaddress/saved-address"}
          />
        </div>
      ) : (
        addressData?.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              changeAddress(item.id);
              changeContext({ lat: item.lat ?? 0, long: item.long ?? 0 });
              setCityName?.(item?.address || "");
            }}
            className={`w-[95%] border border-gray-400 rounded-md h-30 flex items-center px-3 cursor-pointer shadow-md active:shadow ${addressloading ? "opacity-25 cursor-not-allowed" : ""}`}
          >
            <h2 className="w-[80%] h-max overflow-y-scroll ">
              {item?.address || t("CartPage.noAddress")}
            </h2>
            <div className="w-[17%] bg-green-600 rounded-lg ml-auto p-1 flex justify-center font-semibold text-white">
              {item.name}
            </div>
          </div>
        ))
      )}
      {(!addressData || addressData.length > 0) && (
        <Link href={"/deliveryaddress/saved-address"}>
          <button className="bg-green-600 cursor-pointer shadow-xl active:shadow text-white w-max pl-2 pr-2 h-10 font-semibold rounded-md">
            {t("CartPage.addNewAddress")}
          </button>
        </Link>
      )}
    </div>
  );
};

export default AddressBlock;
