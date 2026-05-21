"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const ChatBotButton = dynamic(
  () => import("@/src/Components/General/Button/ChatBotButton"),
  {
    ssr: false,
  },
);

export default function ChatBotWrapper() {
  const pathname = usePathname();

  if (pathname.includes("/contact/query")) {
    return null;
  }

  return <ChatBotButton />;
}
