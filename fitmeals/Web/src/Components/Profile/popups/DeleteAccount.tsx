import React, { Dispatch, SetStateAction, useState } from "react";
import { PlainPopUp } from "../../PopUp/Popup";
import { useTranslations } from "next-intl";
import { deleteAccount } from "@/app/api/actions/userDetails/deleteAccount";
import { useUser } from "@/src/context/UserContext";
import { toast } from "react-toastify";
import { logoutUser } from "@/src/Apiservices/api/auth/logout";
import { redirect } from "next/navigation";

const DeleteAccount = ({
  setPopUp,
}: {
  setPopUp: Dispatch<SetStateAction<boolean>>;
}) => {
  const t2 = useTranslations("Profile");
  const [inputTxt, setInputText] = useState("");
  const [password, setPassword] = useState("");
  const text = "DELETE MY ACCOUNT";
  const deTxt = "MEIN KONTO LÖSCHEN";
  const [loading, setLoading] = useState(false);
  const user = useUser();
  const allowBtn = [text, deTxt].some(
    (txt) => inputTxt.trim().toLowerCase() === txt.toLowerCase(),
  );
  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await deleteAccount(user?.id!, password,user?.role!);
      if (res) {
        toast.success("Account deleted successfully");
        setPopUp(false);
        await logoutUser();
        redirect("/login/Customer");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <PlainPopUp setPopUp={setPopUp}>
      <form
        className="w-full flex flex-col items-center md:w-100"
        onSubmit={(e) => {
          e.preventDefault();
          handleDelete();
        }}
      >
        <h1 className="text-xl md:text-2xl font-extrabold text-gray-800 text-center mb-6">
          {t2("account.delete-subscription")}
        </h1>

        <div className="w-full flex flex-col gap-4">
          <input
            type="password"
            placeholder={t2("popup.password")}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-100 focus:border-green-400 transition-all h-12 rounded-xl px-4 text-sm text-gray-800 placeholder-gray-400 outline-none"
          />

          <input
            type="text"
            placeholder={t2("popup.deletion-placeholder1")}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-100 focus:border-green-400 transition-all h-12 rounded-xl px-4 text-sm text-gray-800 placeholder-gray-400 outline-none"
          />

          <div className="bg-gray-50 border border-gray-100 text-gray-700 p-4 rounded-xl flex items-start gap-3 w-full text-sm mt-2">
            <i className="fa-solid fa-circle-info mt-0.5 text-gray-400"></i>

            <p className="font-medium leading-relaxed">
              {t2("popup.deletion-text")}
            </p>
          </div>

          <button
            type="submit"
            className={`h-12 mt-4 ${
              allowBtn && !loading
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gray-300 cursor-not-allowed"
            } shadow-lg shadow-gray-800/20 w-full text-white font-bold rounded-xl flex justify-center items-center transition-all active:scale-[0.98]`}
            disabled={!allowBtn || loading}
          >
            {loading ? t2("common.submitting") : t2("common.submit")}
          </button>
        </div>
      </form>
    </PlainPopUp>
  );
};

export default DeleteAccount;
