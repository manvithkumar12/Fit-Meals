import {
  BtnFlexLoading,
  DetailCardLoading,
  OfferCardLoading,
  StatCardLoading,
} from "@/src/Components/StatCard/loading/StatCardLoading";
import Skeleton from "@mui/material/Skeleton";

export default async function Loading() {
  return (
    <div className="min-h-screen bg-[#f6f5f2] flex justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-semibold h-10 w-70 rounded-md ml-auto mr-auto tracking-wide text-gray-900 text-center mb-10">
          <Skeleton
            variant="rectangular"
            animation="wave"
            className="rounded-md"
            width="100%"
            height="100%"
          />
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCardLoading />
          <StatCardLoading />
          <StatCardLoading />
        </div>

        <BtnFlexLoading />

        <div className="border border-gray-200 rounded-xl p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <DetailCardLoading />
            <DetailCardLoading />
            <DetailCardLoading />
            <DetailCardLoading />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <OfferCardLoading />
            <OfferCardLoading />
            <OfferCardLoading />
          </div>
        </div>
      </div>
    </div>
  );
}
