"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { RefreshCw, Home } from "lucide-react";
import { motion } from "framer-motion";

interface ErrorPageProps {
    reset?: () => void;
}

const ErrorPage = ({ reset }: ErrorPageProps) => {
    const locale = useLocale();
    const t = useTranslations("errorPage")
    return (
        <div className="min-h-[85vh] w-full bg-white flex items-center justify-center p-4 sm:p-6 md:p-8 font-manrope">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-full max-w-3xl flex flex-col items-center text-center"
            >
                {/* Main Error Illustration */}
                <div className="relative w-full max-w-2xl aspect-[3/2] -mt-4 md:-mt-8">
                    <Image
                        src="/errorPage.png"
                        alt={t("altText")}
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mt-4 sm:mt-6 z-10 px-4">
                    {reset && (
                        <button
                            onClick={() => reset()}
                            className="flex-1 py-3.5 px-6 rounded-xl bg-[#5ea30e] hover:bg-[#4d820b] text-white font-bold flex items-center justify-center gap-2.5 transition-all duration-300 shadow-md hover:shadow-[#5ea30e]/20 active:scale-98 cursor-pointer group"
                        >
                            <RefreshCw className="w-5 h-5 transition-transform group-hover:rotate-180 duration-500" />
                            {t("tryAgain")}
                        </button>
                    )}

                    <Link
                        href={`/${locale}`}
                        className="flex-1 py-3.5 px-6 rounded-xl border border-neutral-300 hover:border-neutral-400 bg-white hover:bg-neutral-50 text-neutral-600 hover:text-neutral-800 font-bold flex items-center justify-center gap-2.5 transition-all duration-300 active:scale-98 cursor-pointer shadow-sm"
                    >
                        <Home className="w-5 h-5" />
                        {t("goHome")}
                    </Link>
                </div>

                {/* Support Help Footer */}
                <div className="mt-8 text-xs text-neutral-400 font-medium">
                    {t("needHelp")}{" "}
                    <a
                        href="mailto: m6783321@gmail.com"
                        className="text-[#5ea30e] hover:text-[#4d820b] font-semibold underline transition-colors"
                    >
                        m6783321@gmail.com
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default ErrorPage;