import { foodRecommendation } from "@/app/api/actions/Recommendation/foodRecommendation";
import { useMutation } from "@tanstack/react-query";

export const useRecommendation = () => {
  return useMutation({
    mutationFn: async (body: recomendationInputType) => {
      const response = await foodRecommendation(body);
      return response;
    },
  });
};
