import Skeleton from "@mui/material/Skeleton";

const DeliveryAgentCardLoading = () => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-black/5 w-full">
      <div className="text-lg font-semibold mb-3 h-10">
        <div className={`w-50 h-7 mb-8 md:mb-5 rounded-md`}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            className="rounded-md"
            height="100%"
          />
        </div>
      </div>
      <div className="flex items-center justify-between ga-5 h-10">
        <div className="space-y-1 text-sm   h-max">
          <h2 className="text-[16px]   w-30 h-5">
            {" "}
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="100%"
              className="rounded-md"
              height="100%"
            />
          </h2>
          <h2 className="text-[16px] w-30 h-5">
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="100%"
              className="rounded-md"
              height="100%"
            />
          </h2>
        </div>
        <div className="h-20 w-20 rounded-full relative"></div>
      </div>
      <button className="mt-4 w-full text-white py-2 rounded-lg transition cursor-pointer h-15">
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          className="rounded-md"
          height="100%"
        />
      </button>
    </div>
  );
};

export default DeliveryAgentCardLoading;
