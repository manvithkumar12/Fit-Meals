import Skeleton from "@mui/material/Skeleton";

const StatusLoading = () => {
  return (
    <div className="h-50 flex items-center lg:justify-start gap-1 md:gap-3 lg:gap-1 justify-center">
      <div className="flex flex-col h-full justify-center items-center  ">
        <div className="   flex justify-center  items-center rounded-full h-13 w-13 md:h-15 md:w-15">
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            className="rounded-full"
            height="100%"
          />
        </div>
        <div className="text-center text-sm h-10   md:text-lg"></div>
      </div>
      <div className={`min-w-10 md:min-w-25  h-2 mb-8 md:mb-10  `}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          className="rounded-full"
          height="100%"
        />
      </div>
      <div className="flex flex-col h-full justify-center items-center  ">
        <div className="   flex justify-center  items-center rounded-full h-13 w-13 md:h-15 md:w-15">
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            className="rounded-full"
            height="100%"
          />
        </div>
        <div className="text-center text-sm h-10   md:text-lg"></div>
      </div>{" "}
      <div className={`min-w-10 md:min-w-25  h-2 mb-8 md:mb-10  `}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          className="rounded-full"
          height="100%"
        />
      </div>
      <div className="flex flex-col h-full justify-center items-center  ">
        <div className="   flex justify-center  items-center rounded-full h-13 w-13 md:h-15 md:w-15">
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            className="rounded-full"
            height="100%"
          />
        </div>
        <div className="text-center text-sm h-10   md:text-lg"></div>
      </div>{" "}
      <div className={`min-w-10 md:min-w-25  h-2 mb-8 md:mb-10  `}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          className="rounded-full"
          height="100%"
        />
      </div>
      <div className="flex flex-col h-full justify-center items-center  ">
        <div className="   flex justify-center  items-center rounded-full h-13 w-13 md:h-15 md:w-15">
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            className="rounded-full"
            height="100%"
          />
        </div>
        <div className="text-center text-sm h-10   md:text-lg"></div>
      </div>
    </div>
  );
};

export default StatusLoading;
