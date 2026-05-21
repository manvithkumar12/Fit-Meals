import Skeleton from "@mui/material/Skeleton";
import DeliveryAgentCardLoading from "./DeliveryAgentCardLoading";
import StatusLoading from "./StatusLoading";

const FoodCardLoading = () => {
  return (
    <div className="flex flex-col w-full lg:w-[70%] lg:pl-10">
      <div className="flex flex-col justify-center w-full items-center lg:items-start">
        <div className="flex gap-1 items-center w-max">
          <i className="fa-solid fa-house ml-1 opacity-50"></i>
          <div className=" font-semibold opacity-50 h-4 rounded-md w-20 cursor-pointer  ">
            {" "}
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="100%"
              className="rounded-md"
              height="100%"
            />
          </div>
          <h4 className=" font-semibold opacity-50">/</h4>
          <div className=" font-semibold opacity-50 h-4 w-20 rounded-md    cursor-pointer">
            {" "}
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="100%"
              className="rounded-md"
              height="100%"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 w-max justify-center">
          <div className="text-5xl h-15 mt-5 w-80 text-green-800 font-semibold    ">
            {" "}
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="100%"
              className="rounded-md"
              height="100%"
            />
          </div>
          <div className="text-xl mt-2 text-center h-7 w-40   lg:text-left">
            {" "}
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="100%"
              className="rounded-md"
              height="100%"
            />
          </div>
        </div>
      </div>
      <StatusLoading />
      <div className="w-full flex items-center justify-center gap-2"></div>
      <div className="w-full flex justify-center lg:w-[80%] lg:justify-start">
        <div className="flex  mt-10 justify-center lg:justify-start lg:w-full w-98 mr-2 pl-2 pr-2">
          <DeliveryAgentCardLoading />
        </div>
      </div>
    </div>
  );
};

export default FoodCardLoading;
