"use client";
import React, { useState, useMemo } from "react";
interface Elements {
  InputLength: number;
  FixedInput?: number;
  placeHolder: string[];
  ReqTxtArea: boolean;
  val?: string[];
  TxtAreaPlaceHolder: string;
  setPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  alert?: string;
  Heading?: string;
  Inputtype?: string[];
  children?: React.ReactNode;
  onSubmit?: (inputs: string[], textArea: string) => Promise<void> | void;
}
const Popup = ({
  setPopUp,
  alert,
  InputLength,
  Inputtype,
  Heading,
  FixedInput = 0,
  placeHolder,
  ReqTxtArea,
  TxtAreaPlaceHolder,
  val,
  children,
  onSubmit,
}: Elements) => {
  const [inputs, setInputs] = useState<string[]>(
    new Array(InputLength).fill(""),
  );
  const [textArea, setTextArea] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (index: number, value: string) => {
    const updated = [...inputs];
    updated[index] = value;
    setInputs(updated);
  };

  const isDisabled = useMemo(() => {
    const dynamicEmpty = inputs.some((v) => v.trim() === "");
    const fixedEmpty = FixedInput > 0 && !val?.every((v) => v.trim() !== "");
    const textAreaEmpty = ReqTxtArea && textArea.trim() === "";
    return dynamicEmpty || fixedEmpty || textAreaEmpty;
  }, [inputs, val, ReqTxtArea, textArea, FixedInput]);

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-start justify-center z-200 overflow-y-auto p-4 animate-in fade-in-0 duration-300"
      onClick={() => setPopUp(false)}
    >
      <div
        className="p-6 w-80 md:w-100 relative bg-white rounded-2xl shadow-2xl m-auto justify-center items-center gap-5 flex flex-col z-210 transform scale-95 animate-in zoom-in-95 duration-300"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="mt-10 flex flex-col items-center justify-center w-full gap-5">
          <h1 className="text-center">{Heading}</h1>
          {Array.from({ length: InputLength }).map((_, index) => (
            <input
              type={Inputtype?.[index] ?? "text"}
              className="w-[80%] border border-black/60 h-12 rounded-md p-3"
              key={index++}
              placeholder={placeHolder[index]}
              value={inputs[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          ))}
          {Array.from({ length: FixedInput }).map((item, index) => (
            <input
              type="text"
              className={`w-[80%] border border-black/60 h-12 rounded-md p-3 ${val ? "text-black/60" : ""}`}
              key={index++}
              placeholder={placeHolder[InputLength + index] ?? ""}
              value={val?.[index] ?? ""}
              readOnly={Boolean(val?.[index])}
            />
          ))}
        </div>
        {ReqTxtArea ? (
          <textarea
            className="w-[80%] p-3 max-h-50 min-h-30 border border-black/60 rounded-md"
            placeholder={TxtAreaPlaceHolder}
            value={textArea}
            onChange={(e) => setTextArea(e.target.value)}
          />
        ) : null}
        <button
          className="h-10 p-3 mt-5 bg-green-600 shadow-lg active:shadow w-[80%] text-white font-semibold rounded-lg flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isDisabled || loading}
          onClick={async () => {
            if (onSubmit) {
              setLoading(true);
              try {
                await onSubmit(inputs, textArea);
              } catch (error) {
                console.error(error);
              } finally {
                setLoading(false);
              }
            } else {
              setPopUp(false);
            }
          }}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </span>
          ) : (
            "Submit"
          )}
        </button>
        <i
          className="fa-solid fa-xmark absolute top-0 right-0 mr-5 mt-4 text-2xl"
          onClick={() => {
            setPopUp(false);
          }}
        ></i>
        <p className="text-xs text-center text-red-400 font-semibold">
          {alert}
        </p>
      </div>
    </div>
  );
};
interface PlainPopUpProps {
  setPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}
const PlainPopUp = ({ setPopUp, children }: PlainPopUpProps) => {
  React.useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center mt-10 md:mt-0 justify-center z-200 p-4 animate-in fade-in-0 duration-300"
      onClick={() => setPopUp(false)}
    >
      <div
        className="max-h-[95vh] p-6 w-full md:w-max relative bg-white rounded-2xl shadow-2xl items-center gap-5 flex flex-col z-210 transform scale-95 animate-in zoom-in-95 duration-300"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="mt-10 flex flex-col items-center justify-center w-full gap-5">
          {children}
          <i
            className="fa-solid fa-xmark absolute font-semibold top-0 right-0 mr-5 mt-4 text-2xl"
            onClick={() => {
              setPopUp(false);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export { Popup, PlainPopUp };
export default Popup;
