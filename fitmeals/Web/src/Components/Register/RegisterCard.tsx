"use client";
import { RegisterCardProps } from "../../types/RegisterCard.types";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "@/src/Components/LocalizedLink";
import { registerUserApi } from "@/src/Apiservices/api/auth/register";
import { RoleConfig } from "@/data/RoleConfig";
import { RegisterData } from "@/src/validators/user/User.validator";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { googleLogin } from "@/src/Apiservices/api/auth/googleLogin";
import { GoogleLogin } from "@react-oauth/google";

const RegisterCard = ({ role }: RegisterCardProps) => {
  const t = useTranslations("Register");
  const [loading, setloading] = useState(false);
  const router = useRouter();
  let mappedRole: "CUSTOMER" | "DELIVERY" | "OWNER" | "SUPPORT";
  if (role === "RestaurantPartner") {
    mappedRole = "OWNER";
  } else if (role === "SupportTeam") {
    mappedRole = "SUPPORT";
  } else if (role === "DeliveryPartner") {
    mappedRole = "DELIVERY";
  } else {
    mappedRole = "CUSTOMER";
  }
  const CurRole = RoleConfig(t)[role];
  const locale = useLocale();
  const handleSubmit = async (formData: RegisterData) => {
    try {
      setloading(true);
      await registerUserApi(formData);
      toast.success("Registered sucessfully");
      setloading(false);
      window.location.href = `/${locale}/profile`;
    } catch (error: any) {
      setloading(false);
      toast.error(error?.message || "Registration failed");
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);

    const formData: RegisterData = {
      email: fd.get("email") as string,
      phoneNumber: fd.get("phoneNumber") as string,
      name: fd.get("username") as string,
      password: fd.get("password") as string,
      role: mappedRole,
      subscriptionsType: "NONE",
    };

    await handleSubmit(formData);
  };
  return (
    <div className=" h-max w-95 md:w-130 md:h-150 flex md:p-10 flex-col items-center">
      <h1 className="font-semibold text-center font-montserrat text-2xl">
        {CurRole.title}
      </h1>
      <div className="flex flex-col justify-center items-center w-[90%] gap-3 mt-5">
        <div className="w-full">
          <form className="gap-5 flex flex-col w-full" onSubmit={onSubmit}>
            <input
              type="email"
              placeholder="email"
              name="email"
              className="h-11 rounded-sm w-full border border-gray-400 outline-0 focus:border-black p-3 "
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone No"
              className="h-11 rounded-sm w-full border border-gray-400 outline-0 focus:border-black p-3 "
            />
            <input
              type="text"
              name="username"
              placeholder={t("Username")}
              className="h-11 rounded-sm w-full border border-gray-400 outline-0 focus:border-black p-3 "
            />
            <input
              type="password"
              name="password"
              placeholder={t("Password")}
              className="h-11 rounded-sm w-full border border-gray-400 outline-0 focus:border-black p-3 "
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full h-11 text-sm text-white bg-green-600 shadow-2xl active:shadow font-semibold rounded-md ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {t("RegisterBtn")}
            </button>
          </form>
        </div>
      </div>
      {role === "Customer" ? (
        <>
          <div className="flex mt-4 justify-center items-center gap-2">
            <div className="w-40 bg-black h-0.5"></div>
            <h1>{t("OR")}</h1>
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
        <Link href={`/login/${role}`}>
          <h3 className="font-semibold underline underline-offset-2 text-blue-700 text-md mt-2 cursor-pointer">
            {CurRole.Login}
          </h3>
        </Link>
      </div>
    </div>
  );
};

export default RegisterCard;
