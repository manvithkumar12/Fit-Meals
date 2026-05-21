import { createContext, useState, ReactNode, useMemo } from "react";
import { uploadToAWS } from "../Apiservices/api/upload/uploadFile";
import { addRestaurant } from "../Apiservices/api/restaurant/createRestaurant";
import { toast } from "react-toastify";
import { FormData } from "../types/RestaurantForm.types";
import { useUser } from "./UserContext";
import { deleteFromAws } from "../Apiservices/api/upload/deleteFromAws";
import { useLocale } from "next-intl";

type FormContextType = {
  inputData: FormData;
  setInputdata: React.Dispatch<React.SetStateAction<FormData>>;
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  isAgreed: boolean;
  setIsAgreed: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => Promise<void>;
  setAgreementFile: React.Dispatch<React.SetStateAction<File | null>>;
  agreementFile: File | null;
};

export const formContext = createContext<FormContextType | null>(null);

export const FormContextProvider = ({ children }: { children: ReactNode }) => {
  const user = useUser();
  const locale = useLocale();
  const [inputData, setInputdata] = useState<FormData>({
    name: "",
    cuisineType: "",
    priceForTwo: 0,
    images: "",
    pinCode: 0,
    facilities: [],
    description: [],
    openingTime: "",
    closingTime: "",
    mapLink: "",
    phoneNumber: "",
    streetName: "",
    houseNo: "",
    area: "",
    city: "",
    lat: 0,
    long: 0,
    address: "",
    totalPersons: 0,
  });
  const [file, setFile] = useState<File | null>(null);
  const [isAgreed, setIsAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreementFile, setAgreementFile] = useState<File | null>(null);
  const handleSubmit = async () => {
    setLoading(true);

    let uploadedUrls: string[] = [];

    try {
      let finalData = {
        ...inputData,
        priceForTwo: Number(inputData.priceForTwo),
        pinCode: Number(inputData.pinCode),
        lat: Number(inputData.lat),
        long: Number(inputData.long),
        totalPersons: Number(inputData.totalPersons),
        description: Array.isArray(inputData.description)
          ? inputData.description.filter((item) => item.trim() !== "")
          : inputData.description
            ? [inputData.description]
            : [],
        facilities: Array.isArray(inputData.facilities)
          ? inputData.facilities.filter((item) => item.trim() !== "")
          : inputData.facilities
            ? [inputData.facilities]
            : [],
      };

      if (file) {
        const imageUrl = await uploadToAWS("Restaurant", { file }, user?.id);

        if (imageUrl) {
          uploadedUrls.push(imageUrl);

          finalData = {
            ...finalData,
            images: imageUrl,
          };
        }
      }

      if (agreementFile) {
        const agreementUrl = await uploadToAWS(
          "Restaurant",
          { file: agreementFile },
          user?.id,
        );

        if (agreementUrl) {
          uploadedUrls.push(agreementUrl);

          finalData = {
            ...finalData,
            agreementUrl,
          };
        }
      }

      await addRestaurant(finalData);
      toast.success("Added Successfully");
      globalThis.location.href = `/${locale}/verification`;
    } catch (error: any) {
      await Promise.all(uploadedUrls.map((url) => deleteFromAws(url)));

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
      isAgreed,
      setIsAgreed,
      loading,
      setLoading,
      handleSubmit,
      agreementFile,
      setAgreementFile,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputData, file, isAgreed, loading, agreementFile],
  );

  return <formContext.Provider value={value}>{children}</formContext.Provider>;
};
