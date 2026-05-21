"use client";
import React, { createContext, ReactNode, useMemo, useState } from "react";
import { mealsFormType } from "../types/AddMealForm.types";
import { uploadToAWS } from "../Apiservices/api/upload/uploadFile";
import { deleteFromAws } from "../Apiservices/api/upload/deleteFromAws";
import { addMealApi } from "../Apiservices/api/restaurant/addMeals.api";
import { toast } from "react-toastify";
import {
  fetchedData,
  ReqData,
} from "../types/modelTypes/restaurant/fetchedData.types";
import { getNutrients } from "../Apiservices/api/restaurant/getNutrients";

type MealFormContext = {
  inputData: mealsFormType;
  setInputdata: React.Dispatch<React.SetStateAction<mealsFormType>>;
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  uploadFile: (file: File) => Promise<string | undefined>;
  handleSubmit: () => Promise<void>;
  agreed: boolean;
  setAgreed: React.Dispatch<React.SetStateAction<boolean>>;
  aiLoading: boolean;
  setAiLoading: React.Dispatch<React.SetStateAction<boolean>>;
  foodname: string;
  setFoodName: React.Dispatch<React.SetStateAction<string>>;
  fetchedData: fetchedData;
  setFetchedData: React.Dispatch<React.SetStateAction<fetchedData>>;
  handleGetData: () => Promise<any>;
  reqdata: ReqData;
  setReqData: React.Dispatch<React.SetStateAction<ReqData>>;
};

export const MealformContext = createContext<MealFormContext | null>(null);

export const MealformContextProvider = ({
  id,
  children,
}: {
  id: number;
  children: ReactNode;
}) => {
  const [agreed, setAgreed] = useState(false);
  const [fetchedData, setFetchedData] = useState<fetchedData>([]);
  const [inputData, setInputdata] = useState<mealsFormType>({
    title: "",
    price: 0,
    type: "",
    weight: 0,
    time: 0,
    foodBenefits: [],
    description: [],
    category: "",
    proteinPer100gm: 0,
    carboHydratePer100gm: 0,
    caloriesPer100gm: 0,
    salt: 0,
    fatsPer100gm: 0,
    imgUrl: "",
    ingredients: {
      title: [],
      quantity: [],
      imgUrl: null,
    },
    isAvailable: true,
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [foodname, setFoodName] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [reqdata, setReqData] = useState<ReqData>({} as ReqData);

  const uploadFile = async (file: File): Promise<string | undefined> => {
    try {
      const response = await uploadToAWS("FoodItem", { file }, id);
      return response;
    } catch (error) {
      return undefined;
    }
  };

  const handleGetData = async () => {
    if (foodname) {
      try {
        setAiLoading(true);
        const data = await getNutrients(foodname);
        setFetchedData(data?.message || []);
        return data?.message;
      } catch (error: any) {
        setAiLoading(true);
        toast.error(error?.message || "Unable to fetch data");
      } finally {
        setAiLoading(false);
      }
    } else {
      // ensure stale data is not kept when input is empty
      setFetchedData([]);
      toast.error("Enter food name");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    let uploadedImageUrl = "";

    try {
      if (file) {
        const imageUrl = await uploadFile(file);

        if (!imageUrl) {
          toast.error("Failed to upload image");
          return;
        }

        uploadedImageUrl = imageUrl;
      }

      const finalData = {
        ...inputData,
        imgUrl: uploadedImageUrl,
        title: inputData.title,
        price: Number(inputData.price),
        type: inputData.type,
        weight: Number(inputData.weight),
        time: Number(inputData.time),
        foodBenefits: Array.isArray(inputData.foodBenefits)
          ? inputData.foodBenefits.filter((item) => item.trim() !== "")
          : inputData.foodBenefits,
        description: Array.isArray(inputData.description)
          ? inputData.description.filter((item) => item.trim() !== "")
          : inputData.description,
        category: inputData.category,
        salt: Number(reqdata.salt),
        proteinPer100gm: Number(reqdata.protein),
        carboHydratePer100gm: Number(reqdata.carbohydrate),
        caloriesPer100gm: Number(reqdata.energy),
        fatsPer100gm: Number(reqdata.fat),
        isAvailable: true,
        ingredients: (inputData.ingredients.title || []).map((title, i) => ({
          title,
          quantity: inputData.ingredients.quantity?.[i] || "",
          imgUrl: inputData.ingredients.imgUrl,
        })),
      };

      await addMealApi(finalData);
      toast.success("Meal added");
      setFile(null);
      setFile(null);
    } catch (error: any) {
      if (uploadedImageUrl) {
        try {
          await deleteFromAws(uploadedImageUrl);
        } catch (deleteError) {
          console.error(deleteError);
        }
      }

      toast.error(error?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  const value = useMemo(
    () => ({
      inputData,
      setInputdata,
      file,
      setFile,
      loading,
      setLoading,
      uploadFile,
      handleSubmit,
      agreed,
      setAgreed,
      fetchedData,
      setFetchedData,
      aiLoading,
      setAiLoading,
      handleGetData,
      foodname,
      setFoodName,
      setReqData,
      reqdata,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputData, file, loading, aiLoading, foodname, agreed, reqdata],
  );
  return (
    <MealformContext.Provider value={value}>
      {children}
    </MealformContext.Provider>
  );
};
