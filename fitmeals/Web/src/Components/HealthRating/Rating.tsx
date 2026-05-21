"use client";
import React from "react";
import Rating from "@mui/material/Rating";
import { useTranslations } from "next-intl";

interface Ratingcard {
  RatingValue: number;
}

const RatingValueTxt = (RatingValue: number, t: any) => {
  if (RatingValue >= 4) return t("Good");
  else if (RatingValue >= 3) return t("Average");
  else if (RatingValue >= 1) return t("Not_healthy");
  return "";
};

export const RatingComponent = ({ RatingValue }: Ratingcard) => {
  const t = useTranslations("Services.Rating");
  return (
    <div className="flex gap-2 items-center">
      <Rating className="" name="read-only" value={RatingValue ?? 0} readOnly />
      {RatingValueTxt(RatingValue, t)}
    </div>
  );
};
interface RatingValueProps {
  RatingValue: number;
  display?: "none";
}
export const PlainRatingComponent = ({
  RatingValue,
  display,
}: RatingValueProps) => {
  return (
    <div className="flex items-center font-light">
      <Rating
        size="small"
        className=""
        name="read-only"
        value={RatingValue ?? 0}
        readOnly
      />
      {display === "none" ? null : RatingValue}
    </div>
  );
};
