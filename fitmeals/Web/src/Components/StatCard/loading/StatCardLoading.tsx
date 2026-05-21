"use client";
import Skeleton from "@mui/material/Skeleton";

export function StatCardLoading() {
  return (
    <div className="rounded-xl h-30 text-center">
      <Skeleton
        variant="rectangular"
        animation="wave"
        className="rounded-xl"
        width="100%"
        height="100%"
      />
    </div>
  );
}

export function BtnFlexLoading() {
  return (
    <div className="flex justify-center gap-6 mb-12">
      <button className="h-10 w-40 rounded-lg bg-red-100 text-sm md:text-md text-white font-medium transition">
        <Skeleton
          variant="rectangular"
          animation="wave"
          className="rounded-lg"
          width="100%"
          height="100%"
        />
      </button>
      <button className="w-40 h-10 rounded-lg bg-blue-100 text-sm md:text-md text-white font-medium transition">
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height="100%"
          className="rounded-lg"
        />
      </button>
    </div>
  );
}

export const DetailCardLoading = () => {
  return (
    <div className="flex justify-between rounded-md h-7">
      <Skeleton
        variant="rectangular"
        animation="wave"
        className="roundded-md"
        width="100%"
        height="100%"
      />
    </div>
  );
};

export function OfferCardLoading() {
  return (
    <div className="border border-gray-200 rounded-md h-30">
      <Skeleton
        variant="rectangular"
        animation="wave"
        className="rounded-md"
        width="100%"
        height="100%"
      />
    </div>
  );
}
