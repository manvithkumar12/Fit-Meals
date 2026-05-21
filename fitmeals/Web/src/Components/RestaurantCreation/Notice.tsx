"use client"
import React from 'react'
import { useTranslations } from 'next-intl';

const Notice = () => {
  const t = useTranslations("Form_Restaurant.notice");
  return (
  <div className="h-max w-full mt-2 bg-white p-2 text-sm text-red-600 border border-gray-200  rounded-lg flex flex-col">
    <h2>{t("title")}</h2>
  </div>
  )
}

export default Notice
