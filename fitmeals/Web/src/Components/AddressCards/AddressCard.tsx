"use client";

import { Building2, Home, MapPin, Trash2 } from "lucide-react";
import React from "react";
import PopUpButton from "../General/Button/PopUpButton";
import AddressSection from "./AddressSection";
import { useTranslations } from "next-intl";
import { deleteAddress } from "@/app/api/actions/address/address";
import { toast } from "react-toastify";
import { useUser } from "@/src/context/UserContext";
import { useAddress } from "@/src/query/useAddress";
import { useQueryClient } from "@tanstack/react-query";
import AddressCardLoading from "./loading/AddressCardLoading";


const AddressCard = () => {
  const t = useTranslations("SavedAddress");
  const user = useUser();
  const queryClient = useQueryClient();
  const {
    data: addresses = [],
    isLoading,
    isError,
  } = useAddress(user?.id ?? null);

  const iconByType = (type: string) => {
    if (type === "Home") return <Home size={18} />;
    if (type === "Work") return <Building2 size={18} />;
    return <MapPin size={18} />;
  };

  const handleDelete = async (id: number) => {
    const queryKey = ["address", user?.id ?? null];

    const prevAddresses = queryClient.getQueryData(queryKey);

    queryClient.setQueryData(queryKey, (old: any) =>
      old?.filter((item: any) => item.id !== id),
    );
    try {
      const res = await deleteAddress(id);
      if (!res?.success) {
        throw new Error(res?.message);
      }
    } catch (error) {
      queryClient.setQueryData(queryKey, prevAddresses);
      toast.error("Unable to delete, try again");
    }
  };

  if (isLoading) {
    return <AddressCardLoading />;
  }

  if (isError) {
    return <div>Error loading addresses</div>;
  }

  return (
    <div className="mt-10 space-y-4 flex flex-col w-full items-center justify-center">
      {addresses?.map((addr: any) => (
        <div
          key={addr.id}
          className="bg-white rounded-xl w-[90%] md:w-[70%] max-w-220 p-4 shadow-sm border"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 font-medium">
              {iconByType(addr.name)}
              {t(addr.name)}s
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-2">{addr.address}</p>

          <div className="flex justify-end gap-4 mt-3">
            <div className="rounded-md w-7 flex">
              <PopUpButton no_bg={true} icon>
                <AddressSection
                  userId={user?.id!}
                  address={addr.address}
                  type="edit"
                  id={addr.id}
                />
              </PopUpButton>
            </div>

            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDelete(addr.id)}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}

      <div
        className={`border-2 border-dashed rounded-xl p-4 max-w-220 text-center w-[90%] md:w-[70%] ${
          addresses.length === 3
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:bg-gray-50"
        }`}
      >
        <div className="flex justify-center flex-col items-center md:flex-row md:gap-2 text-gray-700">
          <MapPin size={18} />

          {addresses?.length === 3 ? (
            <button className="text-xs md:text-sm lg:text-lg whitespace-nowrap">
              {t("Add_Title")}
            </button>
          ) : (
            <div className="">
              <PopUpButton btnTxt={t("Add_Title")} txtclr="black" no_bg={true}>
                <div className="w-full md:w-100 overflow-scroll p-2 lg:h-130 h-70">
                  <AddressSection type="add" userId={user?.id!} />
                </div>
              </PopUpButton>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-500 mt-1">{t("Add_Description")}</p>
      </div>
    </div>
  );
};

export default AddressCard;
