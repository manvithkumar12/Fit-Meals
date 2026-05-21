"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Membership from "./popups/Membership";
import CancelSub from "./popups/CancelSub";
import DeleteAccount from "./popups/DeleteAccount";
import { logedUser } from "@/src/types/logedUser.types";
import PasswordUpdate from "./popups/PasswordUpdate";

const ProfileCard = ({ user }: { user: logedUser | null }) => {
  const [popup, setPopUp] = useState(false);
  const t2 = useTranslations("Profile");
  const [type, setType] = useState("null");
  const renderPopup = () => {
    if (type === "Update") {
      return <PasswordUpdate setPopUp={setPopUp} />;
    }

    if (type === "Cancel") {
      return <CancelSub setPopUp={setPopUp} />;
    }

    if (type === "Delete") {
      return <DeleteAccount setPopUp={setPopUp} />;
    }

    return <Membership setPopUp={setPopUp} />;
  };

  return (
    <div className="flex flex-col mt-6 gap-4 w-full">
      {popup && renderPopup()}

      <div className="w-full bg-white border border-gray-100 shadow-sm rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between transition-all hover:shadow-md hover:border-green-200 group">
        <div>
          <h2 className="text-lg font-bold font-montserrat text-gray-800">
            {t2("account.password")}
          </h2>
          <h4 className="text-sm text-gray-500 mt-1">
            {t2("account.sub-password")}
          </h4>
        </div>
        <button
          className="w-full md:w-40 h-11 font-bold text-green-700 bg-green-50 border border-green-200 group-hover:bg-green-600 group-hover:text-white group-hover:border-transparent transition-all rounded-xl active:scale-[0.98] shadow-sm"
          onClick={() => {
            setPopUp(true);
            setType("Update");
          }}
        >
          {t2("account.btn1")}
        </button>
      </div>
      {user?.role === "CUSTOMER" && (
        <>
          <div className="w-full bg-white border border-gray-100 shadow-sm rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between transition-all hover:shadow-md hover:border-green-200 group">
            <div>
              <h2 className="text-lg font-bold font-montserrat text-gray-800">
                {t2("account.manage-subscription")}
              </h2>
              <h4 className="text-sm text-gray-500 mt-1">
                {t2("account.sub-manage-subscription")}
              </h4>
            </div>
            <button
              className="w-full md:w-40 h-11 font-bold text-green-700 bg-green-50 border border-green-200 group-hover:bg-green-600 group-hover:text-white group-hover:border-transparent transition-all rounded-xl active:scale-[0.98] shadow-sm"
              onClick={() => {
                setPopUp(true);
                setType("");
              }}
            >
              {t2("account.btn2")}
            </button>
          </div>

          <div className="w-full bg-white border border-gray-100 shadow-sm rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between transition-all hover:shadow-md hover:border-amber-200 group">
            <div>
              <h2 className="text-lg font-bold font-montserrat text-gray-800">
                {t2("account.cancel-subscription")}
              </h2>
              <h4 className="text-sm text-gray-500 mt-1">
                {t2("account.sub-delete-subscription")}
              </h4>
            </div>
            <button
              className="w-full md:w-48 h-11 font-bold text-amber-700 bg-amber-50 border border-amber-200 group-hover:bg-amber-600 group-hover:text-white group-hover:border-transparent transition-all rounded-xl active:scale-[0.98] shadow-sm"
              onClick={() => {
                setPopUp(true);
                setType("Cancel");
              }}
            >
              {t2("account.btn3")}
            </button>
          </div>
        </>
      )}
      <div className="w-full bg-white border border-gray-100 shadow-sm rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between transition-all hover:shadow-md hover:border-red-200 group">
        <div>
          <h2 className="text-lg font-bold font-montserrat text-red-600">
            {t2("account.delete-subscription")}
          </h2>
          <h4 className="text-sm text-gray-500 mt-1">
            {t2("account.sub-delete-subscription")}
          </h4>
        </div>
        <button
          className="w-full md:w-40 h-11 font-bold text-red-600 bg-red-50 border border-red-200 group-hover:bg-red-600 group-hover:text-white group-hover:border-transparent transition-all rounded-xl active:scale-[0.98] shadow-sm"
          onClick={() => {
            setPopUp(true);
            setType("Delete");
          }}
        >
          {t2("account.btn4")}
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
