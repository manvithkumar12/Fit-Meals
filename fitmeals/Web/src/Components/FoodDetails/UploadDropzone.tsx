import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, ScanLine, Trash2, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";

interface UploadDropzoneProps {
  selectedImage: string | null;
  isAnalyzing: boolean;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAnalyze: () => void;
  onImageRemove?: () => void;
}

export default function UploadDropzone({
  selectedImage,
  isAnalyzing,
  onImageUpload,
  onAnalyze,
  onImageRemove,
}: Readonly<UploadDropzoneProps>) {
  const t = useTranslations("Recognition.uploadDropzone");

  return (
    <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-100 flex flex-col items-center text-center overflow-hidden relative">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-green-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 relative ">
        {t("heroTitle")}
      </h1>
      <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed mb-10 relative">
        {t("heroSubtitle")}
      </p>

      <div className="w-full max-w-2xl mx-auto relative group z-10">
        <div
          className={`relative rounded-3xl border-2 border-dashed ${
            selectedImage
              ? "border-transparent"
              : "border-slate-300 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/10"
          } bg-slate-50 p-2 flex flex-col items-center justify-center min-h-70 transition-all overflow-hidden`}
        >
          {!selectedImage && (
            <input
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
          )}

          <AnimatePresence mode="wait">
            {selectedImage ? (
              <motion.div
                key="image-preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative w-full h-full min-h-65 rounded-2xl overflow-hidden shadow-sm flex items-center justify-center bg-slate-100 group/preview"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedImage}
                  alt="Food preview"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {!isAnalyzing && (
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm z-20">
                    <button
                      onClick={onImageRemove}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      {t("remove")}
                    </button>
                    <label className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-2 cursor-pointer">
                      <RefreshCw className="w-4 h-4" />
                      {t("change")}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={onImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}

                {isAnalyzing && (
                  <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center backdrop-blur-sm text-white z-20">
                    <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-sm font-medium animate-pulse">
                      {t("analyzingOverlay")}
                    </p>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="upload-prompt"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center gap-4 pointer-events-none py-12"
              >
                <div className="bg-white p-4 rounded-full text-green-600 mb-2 shadow-sm">
                  <UploadCloud className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold text-slate-700 mb-1">
                  {t("uploadPrompt")}
                </h3>
                <p className="text-sm text-slate-400">
                  {t("uploadHelp")}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-8 relative z-10">
        <button
          onClick={onAnalyze}
          disabled={!selectedImage || isAnalyzing}
          className={`px-8 py-4 font-bold rounded-2xl transition-all flex items-center gap-2 text-lg ${
            !selectedImage || isAnalyzing
              ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-inner"
              : "bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          }`}
        >
          <ScanLine className="w-5 h-5" />
          {isAnalyzing ? t("analyzingButton") : t("analyzeButton")}
        </button>
      </div>
    </div>
  );
}
