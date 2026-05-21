export interface FoodPrediction {
  food: string;
  confidence: number;
}

export interface resRecognition {
  predictions: FoodPrediction[];
}

export interface RecognitionResult {
  top3: FoodPrediction[];
  macros: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}
