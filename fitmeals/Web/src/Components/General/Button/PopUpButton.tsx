"use client";
import { PlainPopUp } from "@/src/Components/PopUp/Popup";
import { useState } from "react";

interface Label {
  btnTxt?: string;
  children?: React.ReactNode;
  no_bg?: boolean;
  txtclr?: string;
  icon?: boolean;
  btnDisable?:boolean;
}

const PopUpButton = ({ btnTxt, children, no_bg, txtclr, icon, btnDisable = false }: Label) => {
  const [popup, setpopup] = useState(false);
  return (
    <>
      {icon && (
        <button
        type="button"
        disabled={btnDisable}
          onClick={() => setpopup(true)}
          className="bg-transparent cursor-pointer border-none p-0"
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        )} 
        {<button
        type="button"
        disabled={btnDisable}
          className={[
            no_bg ? "bg-transparent" : "bg-green-700 text-white",
            no_bg && txtclr ? txtclr : "",
            `h-10 font-semibold w-full rounded-lg p-2 ${btnDisable ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`,
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => setpopup(true)}
        >
          {btnTxt}
        </button>
        }

      {popup ? <PlainPopUp setPopUp={setpopup}>{children}</PlainPopUp> : null}
    </>
  );
};

export default PopUpButton;
