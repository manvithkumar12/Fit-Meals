export type userDietInput = {
  gender: "male" | "female" | "N/A";
  weight: number;
  height: number;
  age: number;
  target_weight: number;
  activity: "low" | "high" | "moderate" | "N/A";
  goal: "weight loss" | "muscle gain" | "weight gain" | "N/A";
};
