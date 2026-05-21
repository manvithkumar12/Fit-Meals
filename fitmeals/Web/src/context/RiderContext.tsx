"use client";
import { RiderForm, RiderFormData } from "@/app/api/actions/Rider/RiderForm";
import { createContext, useMemo, useState, useCallback } from "react";
import { useUser } from "./UserContext";
import { uploadToAWS } from "../Apiservices/api/upload/uploadFile";
import { toast } from "react-toastify";
import { deleteFromAws } from "../Apiservices/api/upload/deleteFromAws";

type riderContextType = {
  name: string;
  age: number;
  setName: (name: string) => void;
  setAge: (age: number) => void;
  vehicle: string;
  setVehicle: (vehicle: string) => void;
  selfie: File | undefined;
  setSelfie: (selfie: File) => void;
  license: File | undefined;
  setLicense: (license: File) => void;
  application: File | undefined;
  setApplication: (application: File) => void;
  HandleSubmit: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const RiderContext = createContext<riderContextType | null>(null);

export const RiderProvider = ({ children }: { children: React.ReactNode }) => {
  const userId = useUser()?.id;
  const [name, setName] = useState("");
  const [age, setAge] = useState<number>(0);
  const [vehicle, setVehicle] = useState("");
  const [loading, setLoading] = useState(false);
  const [selfie, setSelfie] = useState<File>();
  const [license, setLicense] = useState<File>();
  const [application, setApplication] = useState<File>();
  const handleAWS = useCallback(
    async (file: File) => {
      if (!userId) return;
      return await uploadToAWS("Driver", { file }, userId);
    },
    [userId],
  );
  const HandleSubmit = useCallback(async () => {
    let selfieUrl: string | undefined;
    let licenseUrl: string | undefined;
    let applicationUrl: string | undefined;

    try {
      if (!userId) return;

      setLoading(true);

      if (!selfie || !license || !application) {
        toast.error("All files are required");
        return;
      }

      selfieUrl = await handleAWS(selfie);
      licenseUrl = await handleAWS(license);
      applicationUrl = await handleAWS(application);

      if (!selfieUrl || !licenseUrl || !applicationUrl) {
        toast.error("Failed to upload files. Please try again.");
        return;
      }

      const Data: RiderFormData = {
        FullName: name,
        age,
        userId,
        vehicle,
        SelfieUrl: selfieUrl,
        LicenseUrl: licenseUrl,
        ApplicationUrl: applicationUrl,
      };

      const res = await RiderForm(Data);

      if (res) {
        toast.success("Application submitted successfully");
      }
    } catch (error) {
      try {
        if (selfieUrl) await deleteFromAws(selfieUrl);
        if (licenseUrl) await deleteFromAws(licenseUrl);
        if (applicationUrl) await deleteFromAws(applicationUrl);
      } catch (deleteError) {
        console.error("Cleanup failed:", deleteError);
      }

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [userId, selfie, license, application, handleAWS, name, age, vehicle]);
  const value = useMemo(
    () => ({
      name,
      age,
      setName,
      setAge,
      vehicle,
      setVehicle,
      selfie,
      HandleSubmit,
      setSelfie,
      license,
      setLicense,
      application,
      setApplication,
      loading,
      setLoading,
    }),
    [name, age, vehicle, selfie, license, application, loading, HandleSubmit],
  );
  return (
    <RiderContext.Provider value={value}>{children}</RiderContext.Provider>
  );
};
