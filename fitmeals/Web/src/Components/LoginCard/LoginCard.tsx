"use client";
import { LoginCardProps } from "../../types/LoginCard.types";
import Link from "@/src/Components/LocalizedLink";
import { useTranslations, useLocale } from "next-intl";
import { userLogin } from "@/src/Apiservices/api/auth/login";
import { loginInput } from "@/src/validators/auth/LoginDetails.validator";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import LoginWithOtp from "./LoginWithOtp";
import { googleLogin } from "@/src/Apiservices/api/auth/googleLogin";

const LoginCard = ({ role }: LoginCardProps) => {
  const t = useTranslations("LoginPage");
  const [loading, setLoading] = useState(false);
  let mappedRole: "CUSTOMER" | "DELIVERY" | "OWNER" | "SUPPORT";
  if (role === "Customer") mappedRole = "CUSTOMER";
  else if (role === "DeliveryPartner") mappedRole = "DELIVERY";
  else if (role === "SupportTeam") mappedRole = "SUPPORT";
  else mappedRole = "OWNER";
  const locale = useLocale();
  const router = useRouter();

  const RoleConfig = {
    Customer: {
      title: t("title-section1.title"),
      subtitle: t("title-section1.subtitle"),
      coloum1: t("title-section1.coloum1"),
      Register: t("title-section1.Register"),
    },
    DeliveryPartner: {
      title: t("title-section2.title"),
      subtitle: t("title-section2.subtitle"),
      coloum1: t("title-section2.coloum1"),
      Register: t("title-section2.Register"),
    },
    RestaurantPartner: {
      title: t("title-section3.title"),
      subtitle: t("title-section3.subtitle"),
      coloum1: t("title-section3.coloum1"),
      Register: t("title-section3.Register"),
    },
    SupportTeam: {
      title: t("title-section4.title"),
      subtitle: t("title-section4.subtitle"),
      coloum1: t("title-section4.coloum1"),
      Register: t("title-section4.Register"),
    },
  };

  const CurRole = RoleConfig[role];
  const handleLogin = async (formData: loginInput) => {
    try {
      setLoading(true);
      const res = await userLogin(formData);
      toast.success("Login Successful");
      if (res?.userId) {
        window.location.href = `/${locale}/profile`;
      }
    } catch (error: any) {
      toast.error(error?.message || "An error occured");
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const formData: loginInput = {
      email: fd.get("email") as string,
      password: fd.get("password") as string,
      role: mappedRole,
    };
    await handleLogin(formData);
  };

  return (
    <div className=" h-max w-[95%] md:w-130 md:h-150 flex md:p-10 flex-col items-center">
      <h1 className="font-semibold text-center font-montserrat text-2xl">
        {CurRole.title}
      </h1>
      <div className="flex flex-col justify-center items-center w-[90%] gap-3 mt-5">
        <div className="flex flex-col w-full">
          <form
            action=""
            onSubmit={handleSubmit}
            className="w-full h-full flex flex-col gap-5"
          >
            <input
              type="email"
              name="email"
              placeholder={t("body.placeholder_email")}
              className="h-11 rounded-sm w-full border border-gray-400 outline-0 focus:border-black p-3 "
            />
            <input
              type="password"
              name="password"
              placeholder={t("body.placeholder_password")}
              className="h-11 rounded-sm w-full border border-gray-400 outline-0 focus:border-black p-3 "
            />
            <button
              disabled={loading}
              className={`w-full h-11 text-sm text-white bg-green-600 font-semibold rounded-md ${loading ? "opacity-50 cursor-not-allowed" : ""} `}
            >
              {t("body.login")}
            </button>
          </form>
        </div>
        <LoginWithOtp />
      </div>
      {role === "Customer" ? (
        <>
          <div className="flex mt-4 justify-center items-center gap-2">
            <div className="w-40 bg-black h-0.5"></div>
            <h1>OR</h1>
            <div className="w-40 bg-black h-0.5"></div>
          </div>
          <div className="flex flex-col gap-3 w-[90%] mt-4">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                console.log("GOOGLE RESPONSE", credentialResponse);
                try {
                  if (!credentialResponse.credential) {
                    toast.error("Google login failed");
                    return;
                  }
                  const res = await googleLogin(
                    credentialResponse.credential,
                    mappedRole as "CUSTOMER" | "OWNER" | "DELIVERY",
                  );

                  toast.success(res.message || "Login Successful");
                  router.push(`/${locale}/profile`);
                } catch (error: any) {
                  toast.error(
                    error?.message ||
                      error?.response?.data?.message ||
                      "Google login failed",
                  );
                }
              }}
              onError={() => {
                toast.error("Google login failed");
              }}
            />
          </div>
        </>
      ) : null}
      <div className="flex gap-1">
        <h3 className="font-semibold text-md mt-2 cursor-pointer">
          {CurRole.coloum1}
        </h3>
        <Link href={`/register/${role}`}>
          <h3 className="font-semibold underline underline-offset-2 text-blue-700 text-md mt-2 cursor-pointer">
            {CurRole.Register}
          </h3>
        </Link>
      </div>
    </div>
  );
};

export default LoginCard;
