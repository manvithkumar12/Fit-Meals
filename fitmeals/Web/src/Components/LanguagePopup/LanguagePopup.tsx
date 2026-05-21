"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { X, Globe } from "lucide-react";

export default function LanguagePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  useEffect(() => {
    const isDismissed = localStorage.getItem("fitmeals_lang_popup_dismissed");
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLanguageSelect = (locale: "en" | "de") => {
    localStorage.setItem("fitmeals_lang_popup_dismissed", "true");
    setIsOpen(false);

    if (currentLocale === locale) return;
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
  };

  const handleClose = () => {
    localStorage.setItem("fitmeals_lang_popup_dismissed", "true");
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-neutral-950/35 backdrop-blur-[2px]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
            className="relative w-full max-w-md bg-[#fbf8f2] border border-amber-900/10 rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col items-center text-center z-10"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/40 rounded-full transition-all duration-300 group"
              aria-label="Close language selector"
            >
              <X className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" />
            </button>

            {/* Premium Icon Header */}
            <div className="relative mb-6">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 border border-emerald-100 shadow-inner">
                <Globe className="w-8 h-8 animate-[spin_8s_linear_infinite]" />
              </div>
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#fbf8f2] animate-pulse" />
            </div>

            {/* Headings */}
            <h2 className="text-2xl font-bold font-manrope text-neutral-800 leading-tight">
              Choose Your Language
            </h2>
            <h3 className="text-lg font-medium font-manrope text-emerald-700/80 mt-1 italic">
              Sprache wählen
            </h3>
            <p className="text-sm text-neutral-500 font-manrope mt-3 max-w-[280px] sm:max-w-none">
              Please select your preferred language to continue.
              <span className="block text-neutral-400 text-xs mt-1">
                Bitte wählen Sie Ihre bevorzugte Sprache aus.
              </span>
            </p>

            {/* Language Selection Grid */}
            <div className="grid grid-cols-2 gap-4 w-full mt-8">
              {/* English Card */}
              <button
                onClick={() => handleLanguageSelect("en")}
                className={`flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-300 group relative ${
                  currentLocale === "en"
                    ? "border-emerald-600 bg-emerald-50/40 shadow-md shadow-emerald-600/5 text-neutral-800"
                    : "border-neutral-200 hover:border-emerald-500 bg-white/70 hover:bg-emerald-50/10 text-neutral-600 hover:text-neutral-800 hover:shadow-lg active:scale-95"
                }`}
              >
                <span className="text-3xl font-extrabold tracking-wider font-montserrat opacity-90 group-hover:scale-110 transition-transform duration-300">
                  EN
                </span>
                <span className="text-sm font-semibold font-manrope mt-2">
                  English
                </span>
                <span className="text-[10px] text-neutral-400 font-medium">
                  Default Language
                </span>
                {currentLocale === "en" && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full" />
                )}
              </button>

              {/* German Card */}
              <button
                onClick={() => handleLanguageSelect("de")}
                className={`flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-300 group relative ${
                  currentLocale === "de"
                    ? "border-emerald-600 bg-emerald-50/40 shadow-md shadow-emerald-600/5 text-neutral-800"
                    : "border-neutral-200 hover:border-emerald-500 bg-white/70 hover:bg-emerald-50/10 text-neutral-600 hover:text-neutral-800 hover:shadow-lg active:scale-95"
                }`}
              >
                <span className="text-3xl font-extrabold tracking-wider font-montserrat opacity-90 group-hover:scale-110 transition-transform duration-300">
                  DE
                </span>
                <span className="text-sm font-semibold font-manrope mt-2">
                  Deutsch
                </span>
                <span className="text-[10px] text-neutral-400 font-medium">
                  German Translation
                </span>
                {currentLocale === "de" && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full" />
                )}
              </button>
            </div>

            {/* Cancel/Dismiss Action */}
            <div className="flex flex-col items-center mt-6 w-full gap-2">
              <button
                onClick={handleClose}
                className="w-full py-3 rounded-xl border border-neutral-300 bg-white/50 hover:bg-neutral-100 text-neutral-500 hover:text-neutral-700 transition-all font-semibold font-manrope text-sm active:scale-98 shadow-sm"
              >
                Cancel / Abbrechen
              </button>
              <span className="text-[10px] text-neutral-400 font-medium font-manrope mt-1">
                You can change language anytime from the navigation bar.
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
