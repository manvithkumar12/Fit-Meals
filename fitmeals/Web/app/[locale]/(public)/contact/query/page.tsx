import ContactCard from "@/src/Components/ChatBot/ContactCard";
import React from "react";
import { getTranslations } from "next-intl/server";
import { Headphones } from "lucide-react";

const query = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "Contact",
  });
  return (
    <div className="min-h-[85vh] pb-20 pt-5 relative w-full overflow-hidden bg-linear-to-b from-[#fbf8f2] via-white to-[#F8FAFC]">
      {/* Decorative ambient glowing background circles */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-green-100/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -left-20 w-100 h-100 bg-blue-50/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full flex flex-col items-center justify-center max-w-7xl mx-auto px-4 relative z-10">

        {/* Premium visual header banner matching design with custom decorative patterns */}
        <div className="relative w-full max-w-4xl bg-linear-to-br from-[#F5F9F6] via-[#FCFDFD] to-[#F2F7F4] border border-emerald-100/25 rounded-[32px] p-8 md:p-12 text-center shadow-[0_15px_35px_-10px_rgba(13,59,49,0.03)] overflow-hidden">

          {/* Subtle background glow for dot pattern */}
          <div className="absolute right-12 top-1/2 -translate-y-1/2 w-44 h-44 bg-[#EAF6F3] rounded-full blur-2xl opacity-70 pointer-events-none md:block hidden" />

          {/* Elegant SVG outline leaf branch illustration on left */}
          <svg
            className="absolute left-6 top-1/2 -translate-y-1/2 w-48 h-48 opacity-[0.06] pointer-events-none select-none md:block hidden text-[#0D3B31]"
            viewBox="0 0 200 200"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M40,160 C70,140 100,100 130,40" />
            <path d="M130,40 C110,50 100,70 110,85 C120,100 135,90 130,40 Z" />
            <path d="M110,85 C125,90 145,100 140,115 C135,130 120,120 110,85 Z" />
            <path d="M85,115 C65,120 50,135 55,150 C60,165 75,155 85,115 Z" />
            <path d="M98,100 C115,105 130,115 125,130 C120,145 105,135 98,100 Z" />
          </svg>

          {/* Elegant SVG dot matrix grid pattern on right */}
          <svg
            className="absolute right-8 top-1/2 -translate-y-1/2 w-32 h-32 opacity-[0.06] pointer-events-none select-none md:block hidden text-[#0D3B31]"
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            {Array.from({ length: 5 }).map((_, i) =>
              Array.from({ length: 5 }).map((_, j) => (
                <circle key={`${i}-${j}`} cx={20 + i * 15} cy={20 + j * 15} r="2.5" />
              ))
            )}
          </svg>

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            {/* Active support badge with headphones icon */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF6F1] border border-[#148F6E]/10 text-[#148F6E] text-[11px] font-bold tracking-wider uppercase mb-5 shadow-sm">
              <Headphones size={13} strokeWidth={2.5} className="animate-pulse" />
              FITMEALS KUNDENSERVICE
            </span>

            <h1 className="text-3xl md:text-5xl font-extrabold font-montserrat text-[#0D3B31] tracking-tight leading-tight mb-4">
              {t("main.title")}
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-500 font-medium leading-relaxed">
              {t("main.sub-title")}
            </p>
          </div>
        </div>

        <ContactCard />

        {/* Bottom Horizontal Divider with Heart Badge matching design exactly */}
        <div className="relative w-full flex items-center justify-center mt-1 max-w-5xl mx-auto">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200/50" />
          </div>
          <div className="relative bg-[#FAFAFA] px-5 py-2 flex items-center gap-3 rounded-full text-[13px] text-slate-500 font-bold tracking-wide">
            <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#148F6E]">
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            </div>
            <span>{t("bottomText")}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default query;
