"use client";
import { contactPageData } from "@/data/ContactData";
import Popup from "@/src/Components/PopUp/Popup";
import { useState, useEffect } from "react";
import ContactChatbot from "./ContactChatbot";
import { useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";
import { useUser } from "@/src/context/UserContext";
import { toast } from "react-toastify";
import { sendFeedback } from "@/app/api/actions/feedbacks/sendFeedBack";

const ContactCard = () => {
  const [popup, setPopUp] = useState(false);
  const t = useTranslations("Contact");
  const [type, setType] = useState("");
  const user = useUser();
  useEffect(() => {
    document.body.style.overflow = popup ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [popup]);
  useEffect(() => {
    const savedChatBot = localStorage.getItem("chatbotOpen");

    if (savedChatBot === "true") {
      setPopUp(true);
      setType("Contact");
    }
  }, []);

  return (
    <div className="w-full pb-10 md:pb-0 flex  flex-col lg:flex-row pt-5 items-center justify-center">
      {popup && (
        <>
          {type === "Query" && (
            <Popup
              Heading="Enter Query"
              FixedInput={2}
              InputLength={0}
              placeHolder={["Name", "Email"]}
              val={[user?.username || "", user?.email || ""]}
              ReqTxtArea={true}
              TxtAreaPlaceHolder="Enter Your Query here"
              setPopUp={setPopUp}
              onSubmit={() => {
                toast.success(
                  "Thank you for contacting us. We'll get back to you shortly.",
                );
                setPopUp(false);
              }}
            />
          )}

          {type === "Contact" && <ContactChatbot setState={setPopUp} />}

          {type === "Feedback" && (
            <Popup
              Heading="Enter FeedBack"
              InputLength={0}
              FixedInput={2}
              placeHolder={["Name", "Email"]}
              ReqTxtArea={true}
              val={[user?.username || "", user?.email || ""]}
              TxtAreaPlaceHolder="Enter Your Feedback here..."
              setPopUp={setPopUp}
              onSubmit={async (inputs, textArea) => {
                if (!user?.id) {
                  toast.error("Please login to submit feedback.");
                  return;
                }
                const success = await sendFeedback(textArea, user.id);
                if (success) {
                  toast.success("Thank you for your feedback!");
                  setPopUp(false);
                } else {
                  toast.error("Failed to submit feedback. Please try again.");
                }
              }}
            />
          )}
        </>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full max-w-5xl px-4 mt-8">
        {contactPageData(t).map((item) => {
          const cardConfigs: Record<
            string,
            { iconBg: string; btnBg: string; icon: React.ReactNode }
          > = {
            Feedback: {
              iconBg: "bg-[#EAF6F3]",
              btnBg: "bg-[#148F6E] hover:bg-[#0E7A5B] focus:ring-emerald-100",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8 text-[#148F6E]"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  <circle cx="9" cy="12" r="1" fill="currentColor" />
                  <circle cx="13" cy="12" r="1" fill="currentColor" />
                  <circle cx="17" cy="12" r="1" fill="currentColor" />
                </svg>
              ),
            },
            Contact: {
              iconBg: "bg-[#FFF9EA]",
              btnBg: "bg-[#E5A905] hover:bg-[#CA9404] focus:ring-yellow-100",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8 text-[#E5A905]"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              ),
            },
            Query: {
              iconBg: "bg-[#EEF4FF]",
              btnBg: "bg-[#1E5EE3] hover:bg-[#154DBE] focus:ring-blue-100",
              icon: (
                <svg
                  className="w-8 h-8 text-[#1E5EE3]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                  <line x1="8" y1="15" x2="12" y2="15" />
                  <path d="M12 19h6" />
                  <path
                    d="M14.5 13.5l3.5-3.5a1 1 0 1 1 1.4 1.4l-3.5 3.5-1.4.6.5-2z"
                    fill="currentColor"
                    strokeWidth="1"
                  />
                </svg>
              ),
            },
          };

          const config = cardConfigs[item.type] || cardConfigs.Feedback;

          return (
            <div
              className="group bg-white rounded-[32px] shadow-[0_15px_45px_rgba(0,0,0,0.03)] border border-slate-100/40 p-8 pb-10 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-all duration-500 ease-out"
              key={item.title}
            >
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 ${config.iconBg}`}
              >
                {config.icon}
              </div>
              <h2 className="text-[22px] font-extrabold text-[#0D3B31] mb-2 font-montserrat tracking-tight">
                {item.title}
              </h2>
              <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8 min-h-10 flex items-center justify-center">
                {item.info}
              </p>
              <button
                className={`w-full py-4 px-6 font-bold rounded-full shadow-[0_10px_20px_-5px_rgba(0,0,0,0.05)] hover:shadow-lg active:shadow-md transition-all duration-300 text-white text-sm flex items-center justify-center gap-2 tracking-wide focus:outline-none focus:ring-2 focus:ring-offset-2 ${config.btnBg}`}
                onClick={() => {
                  setPopUp(true);
                  setType(item.type);
                }}
              >
                <span>{item.btnTxt}</span>
                <ChevronRight
                  size={16}
                  strokeWidth={3}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactCard;
