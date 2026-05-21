export const postChatBot = async (message: string, locale: string) => {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, locale }),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch chat data");
  }
  return res.json();
};
