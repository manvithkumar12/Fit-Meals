"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "@/src/Components/LocalizedLink";
import { motion } from "framer-motion";
import { Send, X, Bot, Activity } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useChatbotMutation } from "@/src/mutations/chatbot/chatbot.mutuation";
import { useUser } from "@/src/context/UserContext";
import { useLocale } from "next-intl";
export type Message = {
  id: string;

  sender: "user" | "bot";

  text?: string;

  isNutrientCard?: boolean;

  actionLabel?: string;

  foodData?: {
    name: string;

    calories: number;

    protein: number;

    carbs: number;

    fat: number;

    salt: number;

    overallScore: number;
  };
};

interface ChatbotProps {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const getBarColor = (
  value: number,
  type: "protein" | "carbs" | "fat" | "salt" | "calories",
) => {
  switch (type) {
    case "protein":
      return value > 20
        ? "bg-[#22c55e]"
        : value > 10
          ? "bg-[#facc15]"
          : "bg-[#ef4444]";

    case "carbs":
      return value < 30
        ? "bg-[#22c55e]"
        : value < 60
          ? "bg-[#facc15]"
          : "bg-[#ef4444]";

    case "fat":
      return value < 15
        ? "bg-[#22c55e]"
        : value < 30
          ? "bg-[#facc15]"
          : "bg-[#ef4444]";

    case "salt":
      return value < 1
        ? "bg-[#22c55e]"
        : value < 2
          ? "bg-[#facc15]"
          : "bg-[#ef4444]";

    case "calories":
      return value < 500
        ? "bg-[#22c55e]"
        : value < 800
          ? "bg-[#facc15]"
          : "bg-[#ef4444]";
  }
};

const NutrientBar = ({
  label,
  value,
  percentage,
  color,
}: {
  label: string;

  value: string;

  percentage: number;

  color: string;
}) => (
  <div className="flex flex-col gap-1">
    <div className="flex justify-between text-[11px] font-medium">
      <span className="text-zinc-500">{label}</span>

      <span className="text-zinc-800">{value}</span>
    </div>

    <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
      <motion.div
        initial={{
          width: 0,
        }}
        animate={{
          width: `${percentage}%`,
        }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        className={`h-full rounded-full ${color}`}
      />
    </div>
  </div>
);

type NutritionCardProps = {
  food: {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    salt: number;
    overallScore: number;
  };
};

const NutritionCard = ({ food }: NutritionCardProps) => {
  const score = food.overallScore;
  const scoreColor =
    score > 75
      ? "text-[#22c55e] border-[#22c55e]"
      : score > 45
        ? "text-[#facc15] border-[#facc15]"
        : "text-[#ef4444] border-[#ef4444]";

  const scoreBg =
    score > 75 ? "bg-[#dcfce7]" : score > 45 ? "bg-[#fef08a]" : "bg-[#fecaca]";

  return (
    <div className="bg-white/80 backdrop-blur-md border border-zinc-200/60 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all w-full max-w-70 mt-2 relative overflow-hidden group">
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#22c55e]/20 rounded-2xl transition-all pointer-events-none" />

      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-[15px] font-semibold text-zinc-800 tracking-tight">
            {food.name}
          </h3>

          <p className="text-[11px] text-zinc-500 font-medium flex items-center gap-1 mt-0.5">
            <Activity size={12} className="text-[#22c55e]" />
            AI Nutrition Analysis
          </p>
        </div>

        <div
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${scoreBg} ${scoreColor.split(" ")[0]}`}
        >
          {score > 75 ? "Excellent" : score > 45 ? "Moderate" : "Poor"}
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <NutrientBar
          label="Protein"
          value={`${food.protein}g`}
          percentage={Math.min(food.protein * 4, 100)}
          color={getBarColor(food.protein, "protein")}
        />

        <NutrientBar
          label="Carbs"
          value={`${food.carbs}g`}
          percentage={Math.min(food.carbs, 100)}
          color={getBarColor(food.carbs, "carbs")}
        />

        <NutrientBar
          label="Fat"
          value={`${food.fat}g`}
          percentage={Math.min(food.fat * 4, 100)}
          color={getBarColor(food.fat, "fat")}
        />

        <NutrientBar
          label="Salt"
          value={`${food.salt}g`}
          percentage={Math.min(food.salt * 40, 100)}
          color={getBarColor(food.salt, "salt")}
        />

        <NutrientBar
          label="Calories"
          value={`${food.calories} kcal`}
          percentage={Math.min(food.calories / 5, 100)}
          color={getBarColor(food.calories, "calories")}
        />
      </div>

      <div className="pt-3 border-t border-zinc-100 flex items-center gap-3">
        <div
          className={`w-11 h-11 rounded-full flex flex-col items-center justify-center border-[3px] ${scoreColor} shrink-0`}
        >
          <span className="text-sm font-bold leading-none">{score}</span>

          <span className="text-[8px] leading-none text-zinc-400 mt-0.5">
            /100
          </span>
        </div>

        <p className="text-xs text-zinc-600 leading-snug">
          {score > 75
            ? "Excellent macro balance with strong protein profile."
            : score > 45
              ? "Moderately balanced nutrition suitable for regular diets."
              : "Less balanced nutritional profile. Consume in moderation."}
        </p>
      </div>
    </div>
  );
};

const OrderChatbot = ({ setState }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const locale = useLocale();
  const user = useUser();
  const [input, setInput] = useState("");
  const mutate = useChatbotMutation();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, mutate.isPending]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    if (!user?.id) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),

          sender: "bot",

          text:
            locale === "en"
              ? "Please log in to continue."
              : "Bitte loggen Sie sich ein, um fortzufahren.",

          actionLabel: locale === "en" ? "Login" : "Anmelden",
        },
      ]);

      return;
    }

    mutate.mutate({
      message: input,
      locale,
      messages,
      setMessages,
    });

    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      handleSend();
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95,
        y: 20,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.95,
        y: 20,
      }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      className="pointer-events-auto w-[calc(100vw-32px)] sm:w-100 h-150 max-h-[80vh] fixed bottom-20 right-4 md:bottom-24 md:right-6 bg-white rounded-2xl shadow-2xl border border-zinc-200 flex flex-col overflow-hidden z-100"
    >
      <div className="flex items-center justify-between p-4 border-b border-zinc-100 bg-white/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#dcfce7] text-[#22c55e]">
            <Bot size={22} />

            <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#22c55e] border-2 border-white rounded-full"></span>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-zinc-800 tracking-tight">
              FitMeals AI
            </h2>

            <p className="text-xs text-zinc-500 font-medium">
              AI Nutrition Assistant
            </p>
          </div>
        </div>

        <button
          onClick={() => setState(false)}
          className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-full transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-zinc-50/50 space-y-5 scroll-smooth">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "bot" && (
              <div className="w-8 h-8 rounded-full bg-[#dcfce7] text-[#22c55e] flex items-center justify-center mr-2 shrink-0 mt-1">
                <Bot size={16} />
              </div>
            )}

            <div
              className={`flex flex-col max-w-[85%] ${
                msg.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              {msg.isNutrientCard && msg.foodData ? (
                <>
                  <NutritionCard food={msg.foodData} />

                  {msg.text && (
                    <p className="text-xs text-zinc-500 mt-2 max-w-70 leading-relaxed">
                      {msg.text}
                    </p>
                  )}
                </>
              ) : (
                <>
                  {msg.text && (
                    <div
                      className={`px-4 py-2.5 text-[15px] leading-relaxed shadow-sm prose prose-sm prose-p:my-0 prose-strong:font-semibold text-inherit max-w-none ${
                        msg.sender === "user"
                          ? "bg-[#dcfce7] text-zinc-800 rounded-2xl rounded-tr-sm"
                          : "bg-white border border-zinc-100 text-zinc-700 rounded-2xl rounded-tl-sm"
                      }`}
                    >
                      <ReactMarkdown>{msg.text}</ReactMarkdown>

                      {msg.actionLabel && (
                        <Link
                          href="/login/Customer"
                          className="mt-3 inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#22c55e] text-white text-sm font-medium hover:bg-[#1ea950] transition-colors"
                        >
                          {msg.actionLabel}
                        </Link>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        ))}

        {/* Typing */}
        {mutate.isPending && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="flex justify-start"
          >
            <div className="w-8 h-8 rounded-full bg-[#dcfce7] text-[#22c55e] flex items-center justify-center mr-2 shrink-0 mt-1">
              <Bot size={16} />
            </div>

            <div className="bg-white border border-zinc-100 shadow-sm rounded-2xl rounded-tl-sm px-4 py-3.5 flex items-center gap-1.5 h-10.5">
              {[0, 0.2, 0.4].map((delay, i) => (
                <motion.div
                  key={i + 1}
                  className="w-1.5 h-1.5 bg-zinc-400 rounded-full"
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} className="h-1" />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-zinc-100 z-10">
        <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-full pl-4 pr-1.5 py-1.5 focus-within:border-[#22c55e] focus-within:ring-1 focus-within:ring-[#22c55e]/20 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              locale === "en"
                ? "Ask about nutrition, calories..."
                : "Frage nach Ernährung, Kalorien..."
            }
            className="flex-1 bg-transparent border-none focus:outline-none text-[15px] text-zinc-800 placeholder:text-zinc-400 py-1"
          />

          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={`p-2 rounded-full transition-all flex items-center justify-center shrink-0 ${
              input.trim()
                ? "bg-[#22c55e] text-white hover:bg-[#1ea950] shadow-sm hover:scale-105 active:scale-95"
                : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
            }`}
          >
            <Send size={16} className={input.trim() ? "ml-0.5" : ""} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderChatbot;
