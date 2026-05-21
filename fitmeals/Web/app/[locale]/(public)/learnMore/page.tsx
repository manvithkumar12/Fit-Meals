"use client";
import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function LearnMorePage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  const t = useTranslations("LearnMore");
  return (
    <div className="min-h-screen bg-[#f6f5f2] py-16 px-4 sm:px-6 lg:px-8 font-manrope">
      <motion.div
        className="max-w-5xl mx-auto space-y-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight font-montserrat">
            {t("header.about")} <span className="text-green-600">FitMeals</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {t("header.discover")}
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
        >
          <div className="md:flex">
            <div className="md:w-2/5 bg-linear-to-b from-green-50 to-white p-8 flex flex-col items-center justify-center border-r border-gray-100">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl mb-6">
                <Image
                  src="/Manvith.jpeg"
                  alt="Manvith - Creator of FitMeals"
                  fill
                  sizes="192px"
                  className="object-cover"
                />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 font-montserrat">
                {t("creator.name")}
              </h2>
              <p className="text-green-600 font-semibold mt-1">
                {t("creator.role")}
              </p>

              <div className="mt-6 flex gap-4">
                <Link
                  href="https://github.com/manvithkumar12/"
                  target="_blank"
                  className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:text-gray-900 hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <i className="fa-brands fa-github text-2xl"></i>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/manvith-kumar/"
                  target="_blank"
                  className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-[#0A66C2] hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <i className="fa-brands fa-linkedin-in text-xl"></i>
                </Link>
              </div>
            </div>

            <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-montserrat flex items-center gap-3">
                <i className="fa-solid fa-bullseye text-green-500"></i>
                {t("vision.title")}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6 text-[15px] md:text-base">
                {t.rich("vision.desc1", {
                  strong: (chunks) => <strong>{chunks}</strong>,
                })}
              </p>
              <p className="text-gray-600 leading-relaxed mb-8 text-[15px] md:text-base">
                {t("vision.desc2")}
              </p>

              <div className="bg-amber-50/80 rounded-2xl p-5 border border-amber-200 mb-8 relative overflow-hidden group hover:border-amber-300 transition-colors">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400 opacity-10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                  <i className="fa-solid fa-bug text-amber-600"></i>{" "}
                  {t("builtByOne.title")}
                </h4>
                <p className="text-sm text-amber-800 leading-relaxed">
                  {t("builtByOne.desc")}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <a
                  href="mailto:m6783321@gmail.com"
                  className="flex-1 flex items-center justify-center gap-3 bg-gray-900 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20 active:scale-[0.98]"
                >
                  <i className="fa-solid fa-envelope"></i>
                  {t("contact.email")}
                </a>
                <a
                  href="https://wa.me/917993625522"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 bg-[#25D366] text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-[#20bd5a] transition-all shadow-lg shadow-[#25D366]/20 active:scale-[0.98]"
                >
                  <i className="fa-brands fa-whatsapp text-xl"></i>
                  {t("contact.whatsapp")}
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-6"
        >
          <motion.div
            variants={itemVariants}
            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 group"
          >
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform group-hover:bg-blue-600 group-hover:text-white">
              <i className="fa-solid fa-robot text-2xl"></i>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3 font-montserrat">
              {t("features.ai.title")}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t("features.ai.desc")}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 group"
          >
            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform group-hover:bg-green-600 group-hover:text-white">
              <i className="fa-solid fa-store text-2xl"></i>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3 font-montserrat">
              {t("features.ecommerce.title")}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t("features.ecommerce.desc")}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 group"
          >
            <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform group-hover:bg-purple-600 group-hover:text-white">
              <i className="fa-solid fa-code-branch text-2xl"></i>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3 font-montserrat">
              {t("features.learning.title")}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t("features.learning.desc")}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
