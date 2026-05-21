"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import {
  ChangeProfileFields,
  Updateform,
} from "@/app/api/actions/ProfileUpdates/updateFields";
import { toast } from "react-toastify";
import { useUser } from "@/src/context/UserContext";

const UpdateSection = ({ userDetails }: { userDetails: any }) => {
  const t = useTranslations("Profile");
  const router = useRouter();
  const user = useUser();
  const [username, setUsername] = useState(userDetails?.name || "");
  const [email, setEmail] = useState(userDetails?.email || "");
  const [phonenumber, setPhonenumber] = useState(
    userDetails?.phoneNumber || "",
  );

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {

    setLoading(true);

    const updatedData: Updateform = {
      username,
      email,
      phonenumber,
      userId: user?.id,
    };

    try {
      await ChangeProfileFields(updatedData);

      toast.success("Profile updated successfully");

      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-[90%] h-max flex flex-col mt-10 p-5 bg-white rounded-lg">
      <h2 className="text-2xl font-semibold font-montserrat">
        {t("personal.title")}
      </h2>

      <h4 className="text-md">{t("personal.sub-title")}</h4>

      <div className="flex flex-col gap-4">
        <label className="flex flex-col mt-5">
          <h3>{t("personal.name")}</h3>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-12 p-3 mt-2 rounded-lg bg-[#f9f8fa] ml-1"
          />
        </label>

        <label className="flex flex-col">
          <h3>{t("personal.email")}</h3>

          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 p-3 mt-2 rounded-lg bg-[#f9f8fa] ml-1"
          />
        </label>

        <label className="flex flex-col">
          <h3>{t("personal.mobile")}</h3>

          <input
            type="text"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            className="h-12 p-3 mt-2 rounded-lg bg-[#f9f8fa] ml-1"
          />
        </label>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`${
          loading ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600"
        } mr-auto mt-5 p-2 pr-3 pl-3 text-white font-semibold rounded-lg`}
      >
        {loading ? "Updating..." : t("personal.btnTxt")}
      </button>
    </section>
  );
};

export default UpdateSection;
