"use client";

import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
import FeatureCard from "./featureCard/FeatureCard";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const Features = () => {
  const t = useTranslations("homepage");
  const [popup, setPopUp] = useState(false);

  const mockFeatures = [
    {
      title: t("featuresModal.smartRecommendations.title"),
      description: t("featuresModal.smartRecommendations.description"),
      imgUrl: "/ml_rec.png",
      navUrl: "/health/fit-tracker",
      tags: [
        t("featuresModal.smartRecommendations.tag1"),
        t("featuresModal.smartRecommendations.tag2")
      ],
    },
    {
      title: t("featuresModal.macroTracking.title"),
      description: t("featuresModal.macroTracking.description"),
      imgUrl: "/Tracker.png",
      navUrl: "/health/fit-tracker",
      tags: [
        t("featuresModal.macroTracking.tag1"),
        t("featuresModal.macroTracking.tag2")
      ],
    },
    {
      title: t("featuresModal.dietPlan.title"),
      description: t("featuresModal.dietPlan.description"),
      imgUrl: "/dietplan.png",
      navUrl: "/health/diet/daily-plan",
      tags: [
        t("featuresModal.dietPlan.tag1"),
        t("featuresModal.dietPlan.tag2")
      ],
    },
    {
      title: t("featuresModal.foodRecognition.title"),
      description: t("featuresModal.foodRecognition.description"),
      imgUrl: "/Recognition.png",
      navUrl: "/health/food-details",
      tags: [
        t("featuresModal.foodRecognition.tag1"),
        t("featuresModal.foodRecognition.tag2")
      ],
    },
    {
      title: t("featuresModal.chatBot.title"),
      description: t("featuresModal.chatBot.description"),
      imgUrl: "/ChatBot.jpeg",
      navUrl: "/",
      tags: [
        t("featuresModal.chatBot.tag1"),
        t("featuresModal.chatBot.tag2")
      ],
    },
  ];

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (popup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [popup]);

  return (
    <>
      <button
        onClick={() => setPopUp(true)}
        className="h-10 px-6 w-max mt-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 cursor-pointer text-white transition-all duration-300 font-medium shadow-lg hover:shadow-emerald-500/25 active:scale-95"
      >
        {t("hero.buttonText")} →
      </button>

      <AnimatePresence>
        {popup && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 pt-20">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPopUp(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-neutral-950 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-800 bg-neutral-900/50">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    {t("featuresModal.headerTitle")}
                  </h2>
                  <p className="text-neutral-400 text-sm mt-1">
                    {t("featuresModal.headerSubtitle")}
                  </p>
                </div>
                <button
                  onClick={() => setPopUp(false)}
                  className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors group"
                >
                  <X className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
                  {mockFeatures.map((feature, idx) => (
                    <FeatureCard key={idx} {...feature} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Features;
