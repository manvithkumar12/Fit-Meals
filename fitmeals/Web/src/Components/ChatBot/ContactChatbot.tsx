"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FAQs as FAQsEN } from "@/data/ChatBot.en";
import { FAQsDE } from "@/data/ChatBot.de";
import { useLocale, useTranslations } from "next-intl";
import { useUser } from "@/src/context/UserContext";
import { CreateQuery } from "@/app/api/actions/query/createQuery";
import { toast } from "react-toastify";

type OptionItem =
  | { type: "category"; id: string; label: string }
  | {
      type: "question";
      id: number;
      label: string;
      answer: string;
      categoryId: string;
    }
  | {
      type: "action";
      id: "back" | "satisfied_yes" | "satisfied_no" | "submit_ticket";
      label: string;
    };

interface ChatbotProps {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}
const ContactChatbot = ({ setState }: ChatbotProps) => {
  const user = useUser();
  const t = useTranslations("ContactBot");
  const locale = useLocale();
  const FAQs = locale === "de" ? FAQsDE : FAQsEN;

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: t("welcome"),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const initialOptions: OptionItem[] = FAQs.map((c) => ({
    type: "category",
    id: c.id,
    label: c.title,
  }));

  const [options, setOptions] = useState<OptionItem[]>(initialOptions);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem("chatbotOpen", "true");
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (query: string) => {
    try {
      if (user?.id) {
        await CreateQuery(query, user.id);
      } else {
        toast.error(t("login_error"));
      }
    } catch (error) {
      toast.error(t("submit_error"));
    }
  };

  const handleOptionClick = (option: OptionItem) => {
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (option.type === "category") {
      const category = FAQs.find((c) => c.id === option.id);
      if (category) {
        const questionOptions: OptionItem[] = category.questions.map((q) => ({
          type: "question",
          id: q.id,
          label: q.question,
          answer: q.answer,
          categoryId: category.id,
        }));
        setOptions([
          ...questionOptions,
          { type: "action", id: "back", label: t("back") },
        ]);
      }
    } else if (option.type === "question") {
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: option.label, time: currentTime },
      ]);

      // Simulate bot thinking
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: option.answer,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
          {
            sender: "bot",
            text: t("satisfied"),
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
        setOptions([
          { type: "action", id: "satisfied_yes", label: t("yes") },
          { type: "action", id: "satisfied_no", label: t("no") },
        ]);
      }, 500);
    } else if (option.type === "action") {
      if (option.id === "back") {
        setOptions(initialOptions);
      } else if (option.id === "satisfied_yes") {
        setMessages((prev) => [
          ...prev,
          { sender: "user", text: t("user_yes"), time: currentTime },
        ]);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: t("great"),
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ]);
          setOptions(initialOptions);
        }, 500);
      } else if (option.id === "satisfied_no") {
        setMessages((prev) => [
          ...prev,
          { sender: "user", text: t("user_no"), time: currentTime },
        ]);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: t("sorry"),
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ]);
          setOptions([
            {
              type: "action",
              id: "submit_ticket",
              label: t("submit_ticket"),
            },
            { type: "action", id: "back", label: t("back") },
          ]);
        }, 500);
      } else if (option.id === "submit_ticket") {
        setShowInput(true);
      }
    }
  };

  const handleSendTicket = () => {
    if (inputValue.trim() === "") return;
    const userMsg = inputValue.trim();
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userMsg, time: currentTime },
    ]);
    setInputValue("");
    setShowInput(false);

    handleSubmit(userMsg);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: t("received"),
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setOptions(initialOptions);
    }, 500);
  };

  const handleClose = () => {
    localStorage.removeItem("chatbotOpen");
    setState(false);
  };

  return (
    <div className="fixed inset-0 top-0 flex z-50 pointer-events-none md:pointer-events-auto justify-end items-end">
      {/* Background overlay for mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 md:hidden pointer-events-auto backdrop-blur-sm"
        onClick={handleClose}
      />

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="w-full h-full md:w-95 md:h-150 flex flex-col bg-gray-50/95 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] md:rounded-2xl border border-black/5 absolute top-0 md:top-auto md:right-10 md:bottom-10 overflow-hidden pointer-events-auto z-10"
      >
        {/* Header */}
        <div className="w-full h-22 flex items-center bg-white/90 backdrop-blur-md border-b border-gray-100 z-30 px-5 shrink-0 shadow-sm relative">
          {/* Subtle gradient strip at top */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-green-400 to-green-600"></div>

          <div className="relative mt-1">
            <div className="h-11 w-11 relative rounded-full overflow-hidden border border-gray-100 shadow-sm bg-white">
              <Image
                src="/Fitmeals-logo.png"
                fill
                sizes="44px"
                className="object-cover p-1"
                alt="logo"
                priority
              />
            </div>
            {/* Online status indicator */}
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>

          <div className="pl-3 flex-1 mt-1">
            <h2 className="font-extrabold text-gray-800 text-[17px] leading-tight tracking-tight">
              {t("title")}
            </h2>
            <h3 className="text-[11px] text-green-600 font-bold flex items-center gap-1 mt-0.5">
              {t("subtitle")}
            </h3>
          </div>

          <button
            className="h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors flex justify-center items-center mt-1"
            onClick={handleClose}
          >
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 scroll-smooth">
          <div className="text-center w-full my-2">
            <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 bg-gray-200/50 px-3 py-1 rounded-full">
              {t("today")}
            </span>
          </div>

          {messages.map((msg, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={idx + msg.time}
              className={`flex flex-col max-w-[85%] ${msg.sender === "user" ? "self-end items-end" : "self-start items-start"}`}
            >
              <div
                className={`px-4 py-2.5 text-[14px] shadow-sm leading-relaxed whitespace-pre-wrap ${
                  msg.sender === "user"
                    ? "bg-green-600 text-white rounded-2xl rounded-br-sm"
                    : "bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-gray-400 mt-1.5 px-1 font-medium">
                {msg.time}
              </span>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Action / Options Area */}
        <div className="w-full bg-white/90 backdrop-blur-md border-t border-gray-100 p-3 shrink-0 flex flex-col">
          {showInput ? (
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full p-1.5 shadow-inner focus-within:ring-2 ring-green-100 focus-within:border-green-400 transition-all">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendTicket()}
                placeholder={t("placeholder")}
                className="flex-1 bg-transparent border-none outline-none px-3 text-[14px] text-gray-800 placeholder-gray-400 h-10"
              />
              <button
                onClick={handleSendTicket}
                className="w-10 h-10 bg-green-600 hover:bg-green-700 text-white rounded-full flex justify-center items-center transition-all shadow-md disabled:opacity-50 disabled:scale-95"
                disabled={inputValue.trim() === ""}
              >
                <i className="fa-solid fa-paper-plane text-sm -translate-x-px"></i>
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
              {options.map((opt, idx) => (
                <button
                  key={opt.id + "-" + idx}
                  onClick={() => handleOptionClick(opt)}
                  className="text-[13px] text-green-700 bg-green-50 border border-green-200 hover:bg-green-100 rounded-2xl px-3 py-1.5 transition-colors text-left shadow-sm"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ContactChatbot;
