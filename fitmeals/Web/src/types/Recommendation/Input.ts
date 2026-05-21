type recomendationInputType = {
  "user": {
    "gender": string,
    "weight": number,
    "height": number,
    "age": number,
    "activity": string,
    "goal": string
  },

  "target": {
    "calories": number,
    "protein": number,
    "carbs": number,
    "fat": number
  },

  "logged": {
    "calories": number,
    "protein": number,
    "carbs": number,
    "fat": number
  },

  "preferences": {
    "high_protein": boolean,
    "low_fat": boolean,
    "low_calories": boolean,
    "high_carbs": boolean,
    "low_salt": boolean
  }
};
