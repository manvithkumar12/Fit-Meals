"use client";
import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useUser } from "@/src/context/UserContext";
import {
  isUnderVerification,
  makeVerified,
} from "@/app/api/actions/userDetails/makeVerified";
import { toast } from "react-toastify";
import { useLocale, useTranslations } from "next-intl";

export default function VerificationPage() {
  const t = useTranslations("Verification");
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };
  const locale = useLocale();
  const userId = useUser()?.id;
  const [loading, setLoading] = useState(false);
  const [hasVerification, setHasVerification] = useState<boolean | null>(null);

  useEffect(() => {
    const checkVerification = async () => {
      if (userId) {
        try {
          const status = await isUnderVerification(userId);
          setHasVerification(status);
        } catch (error) {
          console.error(error);
          setHasVerification(false);
        }
      }
    };
    checkVerification();
  }, [userId]);

  const handleVerified = async () => {
    if (!userId) return toast.error(t("errorLogin"));
    try {
      setLoading(true);
      await makeVerified(userId);
      toast.success(t("successVerification"));
      globalThis.location.href = `/${locale}/profile`;
    } catch (err) {
      console.log(err);
      toast.error(t("errorGeneral"));
    } finally {
      setLoading(false);
    }
  };
  if (hasVerification === null) {
    return (
      <div className="min-h-screen bg-[#fafafa] relative overflow-hidden flex items-center justify-center font-manrope">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (hasVerification === false) {
    return (
      <div className="min-h-screen bg-[#fafafa] relative overflow-hidden flex items-center justify-center font-manrope px-4 py-12">
        <div
          className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-green-200/40 mix-blend-multiply filter blur-[80px] animate-pulse"
          style={{ animationDuration: "7s" }}
        ></div>
        <div
          className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-green-100/50 mix-blend-multiply filter blur-[80px] animate-pulse"
          style={{ animationDuration: "9s", animationDelay: "2s" }}
        ></div>
        <motion.div
          className="w-full max-w-lg bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_8px_40px_rgb(0,0,0,0.04)] rounded-[2rem] p-10 md:p-14 text-center relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-6"
          >
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center shadow-inner">
              <i className="fa-solid fa-file-circle-xmark text-3xl text-red-500"></i>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
              {t("notAppliedTitle")}
            </h1>
            <p className="text-gray-500 font-medium mb-8 text-[15px] md:text-base">
              {t("notAppliedDesc")}
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <button
              onClick={() =>
                (globalThis.location.href = `/${locale}/form/Register`)
              }
              className="w-full h-14 rounded-xl bg-green-600 text-white font-semibold shadow-lg shadow-green-600/30 hover:bg-green-500 hover:shadow-green-500/40 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {t("applyNowBtn")} <i className="fa-solid fa-arrow-right"></i>
            </button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] relative overflow-hidden flex items-center justify-center font-manrope px-4 py-12">
      <div
        className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-green-200/40 mix-blend-multiply filter blur-[80px] animate-pulse"
        style={{ animationDuration: "7s" }}
      ></div>
      <div
        className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-green-100/50 mix-blend-multiply filter blur-[80px] animate-pulse"
        style={{ animationDuration: "9s", animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-emerald-50/60 mix-blend-multiply filter blur-[100px] animate-pulse"
        style={{ animationDuration: "11s", animationDelay: "4s" }}
      ></div>

      <motion.div
        className="w-full max-w-2xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_8px_40px_rgb(0,0,0,0.04)] rounded-[2rem] p-8 md:p-14 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Status Badge */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm font-semibold text-green-700 tracking-wide uppercase">
              {t("badgePending")}
            </span>
          </div>
        </motion.div>

        {/* Main Headings */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 font-montserrat tracking-tight">
            {t("mainTitlePart1")} <br className="hidden md:block" />{" "}
            {t("mainTitlePart2")}
          </h1>
          <p className="text-[17px] text-gray-500 font-medium">
            {t("mainDesc")}
          </p>
        </motion.div>

        {/* Illustration/Icon */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-12 relative"
        >
          <div className="w-24 h-24 rounded-full bg-linear-to-tr from-green-100 to-green-50 flex items-center justify-center relative shadow-inner">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute inset-0 border-2 border-dashed border-green-300 rounded-full"
            />
            <i className="fa-solid fa-file-signature text-4xl text-green-600"></i>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-12 max-w-lg mx-auto"
        >
          <p className="text-gray-600 leading-relaxed text-[15px] md:text-base">
            {t("description")}
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="relative flex justify-between items-center max-w-md mx-auto">
            {/* Connecting Line */}
            <div className="absolute left-5 right-5 top-5 h-0.5 bg-gray-100 -z-10"></div>
            <div className="absolute left-5 w-1/2 top-5 h-0.5 bg-green-500 -z-10"></div>

            {/* Step 1 */}
            <div className="flex flex-col items-center gap-3 w-1/3">
              <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center shadow-md shadow-green-500/20">
                <i className="fa-solid fa-check text-sm"></i>
              </div>
              <span className="text-xs md:text-sm font-semibold text-gray-900 text-center">
                {t("step1Line1")}
                <br />
                {t("step1Line2")}
              </span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-3 w-1/3">
              <div className="w-10 h-10 rounded-full bg-white border-2 border-green-500 text-green-500 flex items-center justify-center shadow-md shadow-green-500/10">
                <i className="fa-solid fa-hourglass-half text-sm animate-pulse"></i>
              </div>
              <span className="text-xs md:text-sm font-semibold text-green-700 text-center">
                {t("step2Line1")}
                <br />
                {t("step2Line2")}
              </span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-3 w-1/3">
              <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 text-gray-300 flex items-center justify-center">
                <i className="fa-solid fa-lock text-sm"></i>
              </div>
              <span className="text-xs md:text-sm font-medium text-gray-400 text-center">
                {t("step3Line1")}
                <br />
                {t("step3Line2")}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Additional Note */}
        <motion.div
          variants={itemVariants}
          className="bg-green-50/50 rounded-2xl p-5 border border-green-100/60 mb-10 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-green-800 mb-1">
            <i className="fa-regular fa-clock"></i>
            <span className="font-semibold text-sm">
              {t("estimatedTimeTitle")}
            </span>
          </div>
          <p className="text-xs md:text-sm text-green-700">
            {t("estimatedTimeDesc1")}
            <strong className="font-bold">{t("estimatedTimeDays")}</strong>
            {t("estimatedTimeDesc2")}
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <div className="flex-1 max-w-55 mx-auto sm:mx-0">
            <button
              disabled={loading}
              onClick={handleVerified}
              className={`w-full h-16 px-6 flex flex-col justify-center items-center rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:from-purple-500 hover:to-indigo-500 transition-all active:scale-[0.98] gap-0.5 relative overflow-hidden group ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <div className="flex items-center gap-2 z-10 text-[15px]">
                <i className="fa-solid fa-bolt text-yellow-300"></i>
                <span>{t("skipBtn")}</span>
              </div>
              <span className="text-[10px] font-medium text-purple-200 z-10 tracking-widest uppercase opacity-90">
                {t("testingOnly")}
              </span>
            </button>
          </div>
          <Link href="/contact" className="flex-1 max-w-55 mx-auto sm:mx-0">
            <button className="w-full py-3.5 h-16 px-6 rounded-xl bg-white text-gray-700 font-semibold border border-gray-200 shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
              <i className="fa-regular fa-circle-question text-sm"></i>{" "}
              {t("contactBtn")}
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
