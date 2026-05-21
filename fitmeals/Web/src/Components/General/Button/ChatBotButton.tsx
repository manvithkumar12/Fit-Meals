"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const OrderChatbot = dynamic(() => import("@/src/Components/ChatBot/OrderChatBot"), {
  ssr: false,
  loading: () => null,
});

const ChatBotButton = () => {
  const [bot, setBot] = useState(false);
  const t = useTranslations("Services.chatbot");
  return (
    <>
      <AnimatePresence>
        {!bot && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
            transition={{ duration: 0.2 }}
            className="hidden md:fixed md:block right-18 md:bottom-15 md:right-20 z-10  bg-green-400 shadow-lg text-white text-sm font-medium rounded-2xl rounded-br-sm px-4 py-2 border border-zinc-100"
          >
            {t("greeting")}👋
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setBot(!bot)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 h-14 w-14 z-10 bg-[#22c55e] text-white rounded-full shadow-lg shadow-green-500/20 flex items-center justify-center border border-green-400/50 hover:bg-green-600 transition-colors focus:outline-none"
      >
        <AnimatePresence mode="wait">
          {bot ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {bot && <OrderChatbot setState={setBot} />}
      </AnimatePresence>
    </>
  );
};

export default ChatBotButton;
