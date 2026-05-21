import { userDietInput } from "../types/userDiet.types";

export const filterValidFields = (
  data: userDietInput,
): Partial<userDietInput> => {
  const filtered: Partial<userDietInput> = {};

  if (data.gender !== "N/A") filtered.gender = data.gender;
  if (data.weight !== 0) filtered.weight = data.weight;
  if (data.height !== 0) filtered.height = data.height;
  if (data.age !== 0) filtered.age = data.age;
  if (data.activity !== "N/A") filtered.activity = data.activity;
  if (data.goal !== "N/A") filtered.goal = data.goal;
  if (data.target_weight !== 0) filtered.target_weight = data.target_weight;

  return filtered;
};
