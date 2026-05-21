"use client";
import React, { useState, useContext } from "react";
import { useTranslations } from "next-intl";
import { CUISINE_TYPES as C_types } from "@/src/types/enums/cuisine.types";
import { toast } from "react-toastify";
import { formContext } from "@/src/context/RestaurantFormContext";
import { TIME_FORMAT } from "@/src/types/modelTypes/restaurant/time.types";
import { PRICES_FOR_TWO } from "@/src/types/enums/prices.types";
const RegisterInfo = () => {
  const t = useTranslations("Form_Restaurant");

  const [coords, setCoords] = useState<{ lat: number; long: number } | null>(
    null,
  );

  const context = useContext(formContext);
  if (!context) return null;
  const { setInputdata } = context;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, dataset } = e.target;
    if (name === "description" || name === "facilities") {
      const index = Number(dataset.index);

      setInputdata((prev) => {
        const updatedArray = [...(prev?.[name] || [])];
        updatedArray[index] = value;

        return {
          ...prev,
          [name]: updatedArray,
        };
      });
      return;
    }

    setInputdata((prev) =>
      prev ? { ...prev, [name]: value } : ({ [name]: value } as any),
    );
  };
  const getCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const receivedLat = position.coords.latitude;
        const receivedLong = position.coords.longitude;
        toast.success("Received Geolocations");
        setCoords({ lat: receivedLat, long: receivedLong });
        setInputdata((prev) => ({
          ...prev,
          lat: receivedLat,
          long: receivedLong,
        }));
      },
      (error) => {
        toast.error("error in getting location");
      },
    );
  };
  return (
    <div className="w-full  flex flex-col p-2 gap-1 mt-2 pt-3 rounded-lg pb-5 border border-gray-200 bg-[white]">
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold">
          {t("form_section.restaurant_name")}{" "}
          <span className="font-lg text-red-500">*</span>
        </h1>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          className="h-10  border rounded-lg outline-0 w-[98.5%] p-2 text-sm border-black"
          placeholder={t("form_section.restaurant_name")}
        />
      </div>
      <div
        className="flex flex-col gap-2 text-xs md:text-lg"
        id={String(coords?.lat) || "null"}
      >
        <h1 className="font-semibold">
          {" "}
          {t("form_section.address")}{" "}
          <span className="font-lg text-red-500">*</span>
        </h1>
        <input
          type="text"
          name="address"
          onChange={handleChange}
          className="h-10 w-[98.5%] border rounded-lg outline-0 p-2 text-sm border-black"
          placeholder={t("form_section.address")}
        />
      </div>{" "}
      <div className="flex items-center justify-center mt-2  text-xs md:text-lg">
        <div className="flex flex-col gap-2 md:w-[30%]">
          <h1 className="font-semibold"> {t("form_section.cuisine_type")}</h1>
          <select
            name="cuisineType"
            onChange={handleChange}
            className="h-10 w-[95%] border rounded-lg outline-0 p-2 text-sm border-black"
          >
            <option value="">{t("form_section.cuisine_type")}</option>
            {C_types.map((item, index) => (
              <option value={item} key={index + 1}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 ml-auto md:w-[30%]">
          <h1 className="font-semibold">
            {" "}
            {t("form_section.price_for_two")}{" "}
            <span className="font-lg text-red-500">*</span>
          </h1>
          <select
            name="priceForTwo"
            onChange={handleChange}
            className="h-10 w-[95%] border rounded-lg outline-0 p-2 text-sm border-black"
          >
            <option value="">select</option>
            {PRICES_FOR_TWO.map((item, index) => (
              <option value={item} key={index + 1}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 ml-auto md:w-[30%]">
          <h1 className="font-semibold">
            {t("form_section.pin_code")}
            <span className="font-lg text-red-500">*</span>
          </h1>
          <input
            type="text"
            name="pinCode"
            onChange={handleChange}
            className="h-10 w-[95%] border rounded-lg outline-0 p-2 text-sm border-black"
            placeholder={t("form_section.pin_code")}
          />
        </div>
      </div>
      <div className="flex  h-max justify-center mt-2  text-xs md:text-lg">
        <div className="flex flex-col gap-2 sm:w-[50%]">
          <h1 className="font-semibold"> {t("form_section.facilities")}</h1>
          {Array.from({ length: 3 }).map((_, index) => (
            <textarea
              onChange={handleChange}
              key={index + 1}
              data-index={index}
              name="facilities"
              className="h-10 w-[95%] min-h-10 border rounded-lg outline-0 p-2 text-sm border-black max-h-40"
              placeholder={t("form_section.facilities")}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2 ml-auto sm:w-[50%]">
          <h1 className="font-semibold"> {t("form_section.description")}</h1>
          {Array.from({ length: 3 }).map((_, index) => (
            <textarea
              name="description"
              data-index={index}
              onChange={handleChange}
              key={index + 1}
              className="h-10 w-[95%] min-h-10 border rounded-lg outline-0 p-2 text-sm border-black max-h-40"
              placeholder={t("form_section.description")}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center w-full justify-between  text-xs md:text-lg">
        <div className="flex flex-col gap-2  md:w-[30%]">
          <h1 className="font-semibold">
            {" "}
            {t("form_section.opening_time")}{" "}
            <span className="font-lg text-red-500">*</span>
          </h1>
          <select
            name="openingTime"
            onChange={handleChange}
            className="h-10 w-[95%] min-h-10 border rounded-lg outline-0 p-2 text-sm border-black max-h-40"
          >
            {TIME_FORMAT.map((item, index) => (
              <option value={item} key={index + 1}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 ml-auto md:w-[30%]">
          <h1 className="font-semibold">
            {" "}
            {t("form_section.closing_time")}{" "}
            <span className="font-lg text-red-500">*</span>
          </h1>
          <select
            name="closingTime"
            onChange={handleChange}
            className="h-10 w-[95%] min-h-10 border rounded-lg outline-0 p-2 text-sm border-black max-h-40"
          >
            {TIME_FORMAT.map((item, index) => (
              <option value={item} key={index + 1}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 ml-auto md:w-[30%]">
          <h1 className="font-semibold"> {t("form_section.g_maps")}</h1>
          <input
            type="text"
            onChange={handleChange}
            name="mapLink"
            className="h-10 w-[95%] border rounded-lg outline-0 p-2 text-sm border-black"
            placeholder={t("form_section.g_maps")}
          />
        </div>
      </div>
      <div className="flex items-center w-full justify-between  mt-2 text-xs md:text-lg">
        <div className="flex flex-col gap-2  md:w-[30%]">
          <h1 className="font-semibold">
            {t("form_section.phoneNumber")}
            <span className="font-lg text-red-500">*</span>
          </h1>
          <input
            type="text"
            name="phoneNumber"
            onChange={handleChange}
            className="h-10 w-[95%] border rounded-lg outline-0 p-2 text-sm border-black"
            placeholder={t("form_section.phoneNumber")}
          />
        </div>
        <div className="flex flex-col gap-2 ml-auto md:w-[30%]">
          <h1 className="font-semibold">
            {t("form_section.streetNumber")}
            <span className="font-lg text-red-500">*</span>
          </h1>
          <input
            type="text"
            name="streetName"
            onChange={handleChange}
            className="h-10 w-[95%] border rounded-lg outline-0 p-2 text-sm border-black"
            placeholder={t("form_section.streetNumber")}
          />
        </div>
        <div className="flex flex-col gap-2 ml-auto md:w-[30%]">
          <h1 className="font-semibold">{t("form_section.houseNo")}</h1>
          <input
            type="text"
            onChange={handleChange}
            name="houseNo"
            className="h-10 w-[95%] border rounded-lg outline-0 p-2 text-sm border-black"
            placeholder={t("form_section.houseNo")}
          />
        </div>
      </div>
      <div className="flex items-center w-full justify-between  mt-2 text-xs md:text-lg">
        <div className="flex flex-col gap-2  md:w-[30%]">
          <h1 className="font-semibold">
            {t("form_section.area")}
            <span className="font-lg text-red-500">*</span>
          </h1>
          <input
            type="text"
            name="area"
            onChange={handleChange}
            className="h-10 w-[95%] border rounded-lg outline-0 p-2 text-sm border-black"
            placeholder={t("form_section.area")}
          />
        </div>
        <div className="flex flex-col gap-2 ml-auto md:w-[30%]">
          <h1 className="font-semibold">
            {t("form_section.city")}
            <span className="font-lg text-red-500">*</span>
          </h1>
          <input
            type="text"
            name="city"
            onChange={handleChange}
            className="h-10 w-[95%] border rounded-lg outline-0 p-2 text-sm border-black"
            placeholder={t("form_section.city")}
          />
        </div>
        <div className="flex flex-col gap-2 ml-auto md:w-[30%]">
          <h1 className="font-semibold"> {t("form_section.totalCapacity")}</h1>
          <input
            type="text"
            name="totalPersons"
            onChange={handleChange}
            className="h-10 w-[95%] border rounded-lg outline-0 p-2 text-sm border-black"
            placeholder={t("form_section.totalCapacity")}
          />
        </div>
      </div>
      <div className="flex  items-center w-full justify-between  mt-2 text-xs md:text-lg">
        <div className="flex flex-col gap-2  md:w-[30%]">
          <h1 className="font-semibold">
            {t("form_section.longitude")}
            <span className="font-lg text-red-500">*</span>
          </h1>
          <input
            type="text"
            onChange={handleChange}
            name="long"
            value={context.inputData.long || ""}
            className="h-10 w-[95%] border rounded-lg outline-0 p-2 text-sm border-black"
            placeholder={t("form_section.longitude")}
          />
        </div>
        <div className="flex flex-col gap-2 ml-auto md:w-[30%]">
          <h1 className="font-semibold">
            {t("form_section.latitude")}
            <span className="font-lg text-red-500">*</span>
          </h1>
          <input
            type="text"
            name="lat"
            onChange={handleChange}
            value={context.inputData.lat || ""}
            className="h-10 w-[95%] border rounded-lg outline-0 p-2 text-sm border-black"
            placeholder={t("form_section.latitude")}
          />
        </div>
        <div className="flex flex-col gap-2 ml-auto md:w-[30%]">
          <h1 className="font-semibold">
            Auto Fetch<span className="font-lg text-red-500">*</span>
          </h1>
          <button
            onClick={() => {
              getCoordinates();
            }}
            className="bg-green-700 w-[95%] rounded-md text-white font-semibold p-2"
          >
            {t("form_section.addbtn")}
          </button>
        </div>
      </div>
      <p className="text-red-500 text-xs ml-auto font-semibold">
        {t("form_section.alert")}
      </p>
    </div>
  );
};

export default RegisterInfo;
