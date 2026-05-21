"use client";
import React, { useContext, useState } from "react";
import { useTranslations } from "next-intl";
import { userDietInput } from "@/src/types/userDiet.types";
import { useUser } from "@/src/context/UserContext";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { DietContext } from "@/src/context/dietPlan/dietPlanContext";
import { createDietProfile } from "@/app/api/actions/getDiet/createDietProfile";
import { filterValidFields } from "@/src/utils/filterData";

const UpdateSection = () => {
  const t = useTranslations("DietPlan");
  const user = useUser();
  if (!user?.id) redirect("/login/Customer");
  const [loading, setLoading] = useState<boolean>(false);
  const context = useContext(DietContext);
  const setuserData = context?.setUserData;
  const userData = context?.userData;
  const refreshMacros = context?.refreshMacros;
  const userDietId = context?.setUserDietId ?? (() => {});
  const [formData, setFormData] = useState<userDietInput>({
    gender: "N/A",
    weight: 0,
    height: 0,
    age: 0,
    target_weight: 0,
    activity: "N/A",
    goal: "N/A",
  });

  React.useEffect(() => {
    if (userData) {
      setFormData({
        gender: userData.gender ?? "N/A",
        weight: userData.weight ?? 0,
        height: userData.height ?? 0,
        age: userData.age ?? 0,
        target_weight: userData.target_weight ?? 0,
        activity: userData.activity ?? "N/A",
        goal: userData.goal ?? "N/A",
      });
    }
  }, [userData]);
  const isValid = () => {
    if (
      formData.goal === "weight gain" &&
      formData.target_weight <= formData.weight
    ) {
      toast.error("Target weight should be greater than current weight");
      return false;
    }
    if (
      formData.goal === "weight loss" &&
      formData.target_weight >= formData.weight
    ) {
      toast.error("Target weight should be less than current weight");
      return false;
    }

    return true;
  };
  const handleSubmit = async (formData: userDietInput) => {
    if (user.id === undefined) {
      toast.error("Please Login");
      return null;
    }
    try {
      setLoading(true);
      const filteredData = filterValidFields(formData);
      const res = await createDietProfile(
        filteredData as userDietInput,
        user?.id,
      );
      await refreshMacros?.();
      userDietId?.(res);
      if (setuserData) {
        setuserData((prev: any) => ({
          ...prev,
          ...filteredData,
        }));
      }
      toast.success("Profile Updated");
    } catch (error) {
      toast.error("An error occured");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: keyof userDietInput, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  return (
    <div className="w-90 flex flex-col justify-center items-center p-2 h-max">
      <h2 className="font-semibold text-lg">{t("Details.title")}</h2>
      <div className="flex flex-col ml-3 gap-2 p-2 mt-2">
        <div className="flex items-center w-full">
          <h2>{t("Information.Gender")}:</h2>
          <Select
            value={formData.gender}
            labelId="demo-simple-select-label"
            className="ml-auto mr-5 bg-white h-10 border border-black/20 w-30  flex justify-center items-center font-medium rounded-md pl-2 pr-2 p-1"
            id="demo-simple-select"
            label="Gender"
            onChange={(e) => handleChange("gender", e.target.value)}
          >
            <MenuItem value={"N/A"}>N/A</MenuItem>
            <MenuItem value={"male"}>{t("Details.male")}</MenuItem>
            <MenuItem value={"female"}>{t("Details.female")}</MenuItem>
          </Select>
        </div>
        <div className="flex w-full">
          <h2>{t("Information.Weight")}:</h2>
          <input
            value={formData.weight}
            className="ml-auto mr-5 bg-white border border-black/20 w-30 font-medium rounded-md pl-2 pr-2 p-1"
            onChange={(e) => handleChange("weight", Number(e.target.value))}
          />
        </div>
        <div className="flex w-full">
          <h2>{t("Information.Height")}:</h2>
          <input
            value={formData.height}
            className="ml-auto mr-5 bg-white border border-black/20 w-30 flex justify-center items-center font-medium rounded-md pl-2 pr-2 p-1"
            onChange={(e) => handleChange("height", Number(e.target.value))}
          />
        </div>
        <div className="flex w-full">
          <h2>{t("Information.Age")}:</h2>
          <input
            value={formData.age}
            className="ml-auto mr-5 bg-white border border-black/20 w-30 flex justify-center items-center font-medium rounded-md pl-2 pr-2 p-1"
            onChange={(e) => handleChange("age", Number(e.target.value))}
          />
        </div>
        <div className="flex w-full">
          <h2 className="mt-2 mr-2">{t("Information.Activity Level")}:</h2>
          <Select
            value={formData.activity}
            labelId="demo-simple-select-label"
            className="ml-auto mr-5 bg-white h-10 border border-black/20 w-30  flex justify-center items-center font-medium rounded-md pl-2 pr-2 p-1"
            id="demo-simple-select"
            label="Gender"
            onChange={(e) => handleChange("activity", e.target.value)}
          >
            <MenuItem value={"N/A"}>N/A</MenuItem>
            <MenuItem value={"low"}>{t("Details.low")}</MenuItem>
            <MenuItem value={"moderate"}>{t("Details.moderate")}</MenuItem>
            <MenuItem value={"high"}>{t("Details.high")}</MenuItem>
          </Select>
        </div>
        <div className="flex w-full flex-wrap items-center gap-5 justify-center">
          <h2>{t("Information.goal")}:</h2>
          <div className="flex  ml-auto">
            <Select
              value={formData.goal}
              labelId="demo-simple-select-label"
              className="ml-auto mr-5 bg-white h-10 border border-black/20 w-30  flex justify-center items-center font-medium rounded-md pl-2 pr-2 p-1"
              id="demo-simple-select"
              label="Gender"
              onChange={(e) => handleChange("goal", e.target.value)}
            >
              <MenuItem value={"N/A"}>N/A</MenuItem>
              <MenuItem value={"weight gain"}>
                {t("Details.weight_gain")}
              </MenuItem>
              <MenuItem value={"weight loss"}>
                {t("Details.weight_loss")}
              </MenuItem>
            </Select>
          </div>
        </div>
        <div className="flex w-full flex-wrap items-center gap-5 justify-center">
          <h2>{t("Details.targetWeight")}:</h2>
          <div className="flex  ml-auto">
            <input
              value={formData.target_weight}
              className="ml-auto mr-5 bg-white border border-black/20 w-30 flex justify-center items-center font-medium rounded-md pl-2 pr-2 p-1"
              onChange={(e) =>
                handleChange("target_weight", Number(e.target.value))
              }
            />
          </div>
        </div>
      </div>
      <button
        disabled={loading}
        className={`md:w-full w-[80%] bg-green-700 font-semibold text-white mt-2 p-2 rounded-md  shadow-xl active:shadow ${loading ? "opacity-30 cursor-not-allowed animate-pulse" : "cursor-pointer"}`}
        onClick={() => {
          if (!isValid()) return;
          handleSubmit(formData);
        }}
      >
        {loading ? t("Details.updating") + "..." : t("Details.update")}
      </button>
    </div>
  );
};

export default UpdateSection;
