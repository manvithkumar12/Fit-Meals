import { postChatBot } from "@/src/Apiservices/api/chatbot/chatbot";
import { Message } from "@/src/Components/ChatBot/OrderChatBot";
import { useMutation } from "@tanstack/react-query";

type MutationProps = {
  message: string;
  locale: string;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

export const useChatbotMutation = () => {
  return useMutation({
    mutationFn: async ({ message, locale }: MutationProps) => {
      const res = await postChatBot(message, locale);

      return res;
    },

    onMutate: async ({ message, messages, setMessages }) => {
      const previousMessages = [...messages];

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "user",
          text: message,
        },
      ]);

      return {
        previousMessages,
      };
    },

    onSuccess: (data, variables) => {
      variables.setMessages((prev) => {
        const filtered = prev.filter((msg) => msg.id !== "typing");

        return [
          ...filtered,
          {
            id: Date.now().toString(),
            sender: "bot",
            text: data.reply,
            isNutrientCard: data.isNutrientCard,
            foodData: data.foodData,
          },
        ];
      });
    },

    onError: (error, variables, context) => {
      variables.setMessages(context?.previousMessages || []);

      variables.setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "bot",
          text: "Something went wrong. Please try again.",
        },
      ]);
    },
  });
};
