
import { RecognitionResult } from "@/src/types/recognition/recognition.types";
import { nutritionData } from "./foodData";
import { RecognizeApi } from "./RecognitionApi";

export const getRecognition = async (
  file: File,
): Promise<RecognitionResult> => {
  const res = await RecognizeApi(file);

  const topPrediction = res.predictions[0];

  const macros =
    nutritionData[topPrediction.food as keyof typeof nutritionData];

  return {
    top3: res.predictions,
    macros,
  };
};
