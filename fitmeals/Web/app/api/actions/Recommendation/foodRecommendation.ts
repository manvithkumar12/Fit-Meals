"use server";

export const foodRecommendation = async (userData: recomendationInputType) => {
  const FastUrl = process.env.MODEL_URL!;
  const response = await fetch(`${FastUrl}/recommend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch food recommendations");
  }
  const data = await response.json();
  return data;
};
