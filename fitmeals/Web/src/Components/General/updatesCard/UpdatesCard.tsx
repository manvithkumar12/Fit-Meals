"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { useUser } from "@/src/context/UserContext";
import { receiveUpdates } from "@/app/api/actions/userDetails/receiveUpdates";

const UpdatesCard = () => {
  const t = useTranslations("homepage");
  const t2 = useTranslations("toast");
  const [loading, setLoading] = useState(false);
  const user = useUser();
  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!user?.id) {
      toast.warning(t("updates.loginfirst"));
      setLoading(false);
      return;
    }
    try {
    await receiveUpdates(user.id, user?.email as string);
      toast.success(t2("homepage.featurepop"));
    } catch (error: any) {
      toast.error(error?.message || "An error occured");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      className=" w-full flex flex-col-reverse gap-5 md:gap-10 justify-center align-middle items-center p-3 mt-10  md:flex-row"
      onSubmit={handlesubmit}
    >
      <div className="email-card w-[96%] md:w-150 md:h-100 bg-[#efede5] p-6 rounded-2xl flex flex-col justify-center align-middle items-center ">
        <h4 className="text-2xl font-semibold">{t("updates.title")}</h4>
        <h4 className="mt-3 w-[90%] text-center">{t("updates.subtitle")}</h4>
        <div className="flex flex-col w-full md:flex-row justify-center align-middle items-center gap-5">
          <input
            type="email"
            placeholder={user?.email || "enter your email"}
            className="w-[70%] h-12 border border-black/20 rounded-lg mt-5 p-3 hover:outline-green-700"
          />
          <button
            className={`h-12 w-[30%] ${loading ? "bg-gray-300 cursor-not-allowed" : "cursor-pointer bg-green-700 hover:bg-green-700"} px-6 w-max mt-3 rounded-lg  text-white transition font-medium`}
            type="submit"
            disabled={loading}
          >
            {loading ? t("updates.submitting") : t("updates.submitbtn")}
          </button>
        </div>
      </div>
      <div className="email-card md:w-150 md:h-100 h-50 w-[90%] bg-[#efede5] rounded-2xl relative">
        <Image
          src="https://drin721riupcf.cloudfront.net/web-assest/updates.webp"
          alt="updates-img"
          fill
          sizes="(max-width: 768px) 90vw, 600px"
          className="object-cover rounded-2xl"
          loading="lazy"
          placeholder="blur"
          blurDataURL="/blur.jpeg"
        />
      </div>
    </form>
  );
};

export default UpdatesCard;
