"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Eye,
  EyeOff,
  Lock,
  CheckCircle2,
  Loader2,
  X,
  AlertCircle,
} from "lucide-react";
import { useUser } from "@/src/context/UserContext";
import { UpdatePassword } from "@/app/api/actions/ProfileUpdates/UpdatePassword";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

interface PasswordUpdateProps {
  setPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PasswordUpdate({ setPopUp }: Readonly<PasswordUpdateProps>) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const user = useUser();
  const t2 = useTranslations("Profile");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorShake, setErrorShake] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const hasLength = newPassword.length >= 8;
  const hasUpper = /[A-Z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const passwordsMatch = newPassword === confirmPassword && newPassword !== "";

  const strengthScore = [hasLength, hasUpper, hasNumber].filter(Boolean).length;

  const getStrengthColor = () => {
    if (newPassword.length === 0) return "bg-gray-200";
    if (strengthScore === 0 || strengthScore === 1) return "bg-red-400";
    if (strengthScore === 2) return "bg-amber-400";
    if (strengthScore === 3) return "bg-emerald-500";
    return "bg-gray-200";
  };

  const getStrengthWidth = () => {
    if (newPassword.length === 0) return "0%";
    if (strengthScore === 0) return "15%";
    if (strengthScore === 1) return "33%";
    if (strengthScore === 2) return "66%";
    if (strengthScore === 3) return "100%";
    return "0%";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (strengthScore < 3) {
      setErrorMsg("Please meet all password requirements");
      triggerShake();
      return;
    }

    if (!passwordsMatch) {
      setErrorMsg("New passwords do not match");
      triggerShake();
      return;
    }

    setLoading(true);
    try {
       await UpdatePassword(user?.id ?? 0, newPassword);
      setSuccess(true);
      setTimeout(() => {
        setPopUp(false);
      }, 2000);
      toast.success("Password Changed Successfully");
    } catch {
      toast.error("Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const triggerShake = () => {
    setErrorShake(true);
    setTimeout(() => setErrorShake(false), 500);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={
          errorShake
            ? { x: [-10, 10, -10, 10, 0] }
            : { opacity: 1, scale: 1, y: 0, x: 0 }
        }
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{
          type: errorShake ? "keyframes" : "spring",
          duration: errorShake ? 0.4 : 0.5,
          bounce: errorShake ? undefined : 0.3,
        }}
        className="relative w-full max-w-md overflow-hidden bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(16,185,129,0.15)] ring-1 ring-emerald-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative background blur */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative p-6 sm:p-8">
          <button
            onClick={() => !loading && !success && setPopUp(false)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
            disabled={loading || success}
          >
            <X size={20} />
          </button>

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1, bounce: 0.5 }}
                  className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 text-emerald-500"
                >
                  <CheckCircle2 size={40} strokeWidth={2.5} />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {t2("passwordUpdate.success_title")}
                </h3>
                <p className="text-gray-500">
                  {t2("passwordUpdate.success_sub")}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {t2("passwordUpdate.title")}
                    </h2>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-6 mt-1 ml-13">
                  {t2("passwordUpdate.sub")}
                </p>

                <AnimatePresence>
                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 rounded-lg overflow-hidden"
                    >
                      <AlertCircle size={16} />
                      {errorMsg}
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t2("passwordUpdate.new_password")}
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                        <Lock size={18} />
                      </div>
                      <input
                        type={showNew ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                        placeholder={t2("passwordUpdate.new_password_ph")}
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        disabled={loading}
                      >
                        {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>

                    {/* Password Strength Indicator */}
                    <div className="mt-3">
                      <div className="flex gap-1 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={{ width: getStrengthWidth() }}
                          className={`h-full transition-colors duration-300 ${getStrengthColor()}`}
                        />
                      </div>
                      <div className="mt-2 flex items-start justify-between text-[11px] sm:text-xs">
                        <div
                          className={`flex items-center gap-1 transition-colors ${hasLength ? "text-emerald-600" : "text-gray-400"}`}
                        >
                          <CheckCircle2
                            size={12}
                            className={
                              hasLength ? "text-emerald-500" : "opacity-40"
                            }
                          />
                          <span>{t2("passwordUpdate.req_length")}</span>
                        </div>
                        <div
                          className={`flex items-center gap-1 transition-colors ${hasUpper ? "text-emerald-600" : "text-gray-400"}`}
                        >
                          <CheckCircle2
                            size={12}
                            className={
                              hasUpper ? "text-emerald-500" : "opacity-40"
                            }
                          />
                          <span>{t2("passwordUpdate.req_upper")}</span>
                        </div>
                        <div
                          className={`flex items-center gap-1 transition-colors ${hasNumber ? "text-emerald-600" : "text-gray-400"}`}
                        >
                          <CheckCircle2
                            size={12}
                            className={
                              hasNumber ? "text-emerald-500" : "opacity-40"
                            }
                          />
                          <span>{t2("passwordUpdate.req_number")}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t2("passwordUpdate.confirm_password")}
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                        <Lock size={18} />
                      </div>
                      <input
                        type={showConfirm ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`block w-full pl-10 pr-10 py-2.5 border rounded-xl bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 outline-none transition-all ${
                          confirmPassword.length > 0 && !passwordsMatch
                            ? "border-red-300 focus:ring-red-500/20 focus:border-red-500"
                            : confirmPassword.length > 0 && passwordsMatch
                              ? "border-emerald-300 focus:ring-emerald-500/20 focus:border-emerald-500"
                              : "border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-500"
                        }`}
                        placeholder={t2("passwordUpdate.confirm_password_ph")}
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        disabled={loading}
                      >
                        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 mt-6 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setPopUp(false)}
                      disabled={loading}
                      className="flex-1 py-2.5 px-4 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 outline-none transition-all disabled:opacity-50"
                    >
                      {t2("passwordUpdate.cancel")}
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-2 flex items-center justify-center py-2.5 px-4 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all shadow-lg shadow-emerald-600/20 disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={18} className="animate-spin mr-2" />
                          {t2("passwordUpdate.updating")}
                        </>
                      ) : (
                        t2("passwordUpdate.update")
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
