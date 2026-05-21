"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface AddressSectionProps {
  type?: "edit" | "add";
  address?: string;
  id?: number;
  userId: number | null;
}
import { addressForm } from "@/src/validators/user/address.validator";
import { toast } from "react-toastify";
import { useAdressMutuation } from "@/src/mutations/address/address.mutuation";

const AddressSection = ({ address, type, id, userId }: AddressSectionProps) => {
  const [value, setValue] = useState(address || "");
  const mutation = useAdressMutuation(userId!);
  const t = useTranslations("SavedAddress.addAddresspopup");
  const [coords, setCoords] = useState<{ lat: number; long: number } | null>(
    null,
  );
  const handlePost = (formData: addressForm) => {
    mutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Added Successfully");
      },
      onError: (error: any) => {
        toast.error(error?.message || "An error occured");
      },
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!coords) {
      toast.error("Please allow location access");
      return;
    }
    const fd = new FormData(e.currentTarget);
    const formData: addressForm = {
      name: fd.get("name") as string,
      id: id,
      street: fd.get("street") as string,
      area: fd.get("area") as string,
      city: fd.get("city") as string,
      state: fd.get("state") as string,
      pinCode: fd.get("pinCode") as string,
      address: fd.get("address") as string,
      lat: coords?.lat || 0,
      long: coords?.long || 0,
    };
    await handlePost(formData);
  };
  const UserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const receivedLat = position.coords.latitude;
        const receivedLong = position.coords.longitude;
        toast.success("Received Geolocations");
        setCoords({ lat: receivedLat, long: receivedLong });
      },
      (error) => {
        toast.error("Geolocation not supported");
      },
    );
  };
  useEffect(() => {
    setValue(address || "");
  }, [address]);

  return (
    <div className="w-full p-2 border overflow-y-auto rounded-md hide-scrollbar">
      <form className="w-full h-full" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-md mr-auto ">{t("address")}</h2>
            <textarea
              placeholder={t("placeholderAddress")}
              name="address"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="border border-black/30 w-full min-h-20 resize-none p-2 outline-0 rounded-md"
            />
          </div>
          <div className="w-full flex gap-1 justify-between">
            <div className="flex flex-col w-[47%] gap-2">
              <h2 className="font-semibold text-md  mr-auto ">
                {t("streetName")}
              </h2>
              <input
                type="text"
                name="street"
                placeholder={t("placeholderStreet")}
                className="border border-black/30 w-full h-10 p-2 outline-0 rounded-md"
              />
            </div>
            <div className="flex flex-col w-[47%] gap-2">
              <h2 className="font-semibold text-md text-left">{t("area")}</h2>
              <input
                type="text"
                name="area"
                placeholder={t("placeholderArea")}
                className="w-full border border-black/30  h-10 p-2 outline-0 rounded-md"
              />
            </div>
          </div>
          <div className="w-full flex gap-1 justify-between">
            <div className="flex flex-col w-[47%] gap-2">
              <h2 className="font-semibold text-md  mr-auto ">{t("city")}</h2>
              <input
                type="text"
                name="city"
                placeholder={t("placeholderCity")}
                className="border border-black/30 w-full h-10 p-2 outline-0 rounded-md"
              />
            </div>
            <div className="flex flex-col w-[47%] gap-2">
              <h2 className="font-semibold text-md text-left">{t("state")}</h2>
              <input
                type="text"
                name="state"
                placeholder={t("placeholderState")}
                className="w-full border border-black/30  h-10 p-2 outline-0 rounded-md"
              />
            </div>
          </div>
          <div className="w-full gap-2 flex justify-between">
            <div className="flex flex-col w-[47%] gap-2">
              <h2 className="font-semibold text-md text-left">
                {t("saveLabel")}
              </h2>
              <select
                name="name"
                className=" border border-black/30  h-10 p-2 outline-0 rounded-md"
              >
                <option value="">{t("select")}</option>
                <option value="Home">{t("home")}</option>
                <option value="Work">{t("work")}</option>
                <option value="Other">{t("other")}</option>
              </select>
            </div>
            <div className="flex flex-col w-[47%] gap-2">
              <h2 className="font-semibold text-md text-left">
                {t("pinCode")}
              </h2>
              <input
                type="text"
                name="pinCode"
                placeholder={t("placeholderPinCode")}
                className="w-full border border-black/30  h-10 p-2 outline-0 rounded-md"
              />
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-1">{t("info")}</p>
          <div className="w-full flex">
            <button
              type="button"
              onClick={() => UserLocation()}
              className="bg-green-700 mr-auto text-sm text-white w-max p-1.5 rounded-md pl-2 pr-2 font-semibold"
            >
              {t("allow_Location")}{" "}
            </button>
          </div>
          <button
            type="submit"
            disabled={mutation.isPending}
            className={`bg-green-700 font-semibold text-white p-2 h-10 rounded-md cursor-pointer mt-3 ${mutation.isPending ? "opacity-30 cursor-not-allowed" : " "} `}
          >
            {mutation.isPending ? t("mainBtn2") : t("mainBtn")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressSection;
