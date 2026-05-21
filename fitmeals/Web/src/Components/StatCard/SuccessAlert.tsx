import { Dispatch, SetStateAction } from "react";
import { PlainPopUp } from "../PopUp/Popup";
import dynamic from "next/dynamic";

const Confetti = dynamic(() => import("./Confetti"), {
  ssr: false,
});

interface Data {
  state: Dispatch<SetStateAction<boolean>>;
  title: string;
  subTitle: string;
  info: string;
}

const SuccessAlert = ({ state, title, subTitle, info }: Data) => {
  return (
    <PlainPopUp setPopUp={state}>
      <div className="relative w-100 h-max flex justify-center flex-col items-center gap-2">
        <Confetti />
        <i className="fa-solid text-[62px] text-green-600 fa-circle-check"></i>
        <h2 className="text-xl font-semibold">{title}</h2>
        <h2 className="text-lg">{subTitle}</h2>
        <h3 className="text-center">{info}</h3>
        <button
          onClick={() => state(false)}
          className="p-2 bg-green-700 w-50 mt-3 rounded-md text-white font-semibold cursor-pointer"
        >
          Close
        </button>
      </div>
    </PlainPopUp>
  );
};

export default SuccessAlert;
