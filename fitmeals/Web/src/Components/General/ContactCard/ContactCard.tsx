"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { postQuery } from "@/src/Apiservices/api/user/query";
import { queryApi } from "@/src/validators/user/query.validator";
import { toast } from "react-toastify";
import { useUser } from "@/src/context/UserContext";

const ContactCard = () => {
  const t = useTranslations("homepage");
  const t2 = useTranslations("toast");
  const [loading, setLoading] = useState(false);
  const user = useUser();
  const handleQueryPost = async (formData: queryApi) => {
    try {
      setLoading(true);
      await postQuery(formData);
      toast.success(t2("homepage.submission"));
      setLoading(false);
    } catch (error: any) {
      toast.error(t2("common.error"));
      setLoading(false);
    }
  };
  const handleQuerySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.id) return toast.warning(t2("about.pleaseLogin"));
    const fd = new FormData(e.currentTarget);
    const formData: queryApi = {
      message: fd.get("message") as string,
      email: fd.get("email") as string,
      firstName: fd.get("firstName") as string,
      lastName: fd.get("lastName") as string,
    };
    await handleQueryPost(formData);
    e.currentTarget.reset();
  };
  return (
    <div className="h-max w-screen">
      <h4 className="text-xl text-center ml-auto mr-auto w-[80%] md:w-[55%] md:ml-5 md:mr-0 md:text-left  md:text-5xl font-semibold font-montserrat">
        {t("contact.title")}
      </h4>
      <h4 className="md:mt-2 p-1 text-center md:text-left md:ml-5">
        {t("contact.subtitle")}
      </h4>
      <div className="mr-auto ml-auto mt-5 w-[90%] p-7  h-max md:w-130 md:h-max rounded-2xl bg-[#efede5]">
        <div className="flex flex-col items-center justify-between gap-5  p-2 ">
          <form onSubmit={handleQuerySubmit} className="w-full h-full">
            <div className="flex-col w-full flex gap-3 md:flex-row">
              <div className="w-full md:w-[50%]">
                <h4 className="text-xs ml-1">{t("Qform.firstname")}</h4>
                <input
                  type="text"
                  name="firstName"
                  required
                  placeholder={t("Qform.firstname")}
                  className="text-m rounded-lg h-13 p-3 w-[95%]  md:w-full border-[#dddcd5] mt-1  border-2 focus:outline-2 outline-green-700  "
                />
              </div>
              <div className="w-full md:w-[50%]">
                <h4 className="text-xs ml-1">{t("Qform.lastname")}</h4>
                <input
                  type="text"
                  name="lastName"
                  placeholder={t("Qform.lastname")}
                  className="text-m rounded-lg h-13 p-3 w-[95%]  md:w-full border-[#dddcd5] mt-1  border-2 focus:outline-2 outline-green-700  "
                />
              </div>
            </div>
            <div className="w-full flex flex-col mt-2">
              <h4 className="text-xs ml-1">{t("Qform.email")}</h4>
              <input
                type="email"
                name="email"
                required
                placeholder={t("Qform.email")}
                className="text-m rounded-lg h-13 p-3 w-[95%]  md:w-full border-[#dddcd5] mt-1  border-2 focus:outline-2 outline-green-700  "
              />
            </div>
            <div className="w-full flex flex-col mt-2">
              <h4 className="text-xs ml-1">{t("Qform.question")}</h4>
              <textarea
                placeholder={t("Qform.qplaceholder")}
                name="message"
                required
                className="w-[95%] md:w-full rounded-lg h-40 p-3 border-[#dddcd5] mt-1  border-2 focus:outline-2 outline-green-700 resize-none "
              />
              <div className="flex flex-col justify-center items-center w-full">
                <button
                  disabled={loading}
                  className={`h-10 px-6 ml-2w-[95%] sm:w-70 md:w-[98%]  md:ml-1 mt-3 rounded-lg bg-green-600 hover:bg-green-700  text-white transition font-medium ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} `}
                >
                  {t("Qform.submit")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
