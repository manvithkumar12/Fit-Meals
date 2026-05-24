import React from "react";
import { Construction, Download } from "lucide-react";
import { useTranslations } from "next-intl";

interface SidebarProps {
  supportedCategories: string[];
}

export default function Sidebar({ supportedCategories }: Readonly<SidebarProps>) {
  const t = useTranslations("Recognition.sidebar");
  const tCategories = useTranslations("Recognition.categories");

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col shrink-0">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-50 text-yellow-700 text-xs font-bold uppercase tracking-wider rounded-full w-fit mb-6 border border-yellow-100">
        <Construction className="w-4 h-4" />
        {t("underDevelopment")}
      </div>

      <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-3">
        {t("title")}
      </h2>
      <p className="text-sm text-slate-500 leading-relaxed mb-8">
        {t("description")}
      </p>

      <div className="flex-1 mb-8">
        <div className="flex flex-wrap gap-2">
          {supportedCategories.map((category) => (
            <span
              key={category}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-full shadow-sm"
            >
              {/* @ts-ignore */}
              {tCategories(category)}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <a
          href="/Foods.zip"
          download
          className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-green-50 text-green-700 font-semibold rounded-xl hover:bg-green-100 transition-colors border border-green-200 shadow-sm"
        >
          <Download className="w-5 h-5" />
          {t("downloadSample")}
        </a>
      </div>
    </div>
  );
}
