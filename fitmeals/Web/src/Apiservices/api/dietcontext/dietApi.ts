import { getUserDiet } from "@/app/api/actions/getDiet/getUserDiet";
import { toast } from "react-toastify";
type UserDiet = {
  gender: string;
  weight: number;
  height: number;
  age: number;
  target_weight: number;
  activity: string;
  goal: string;
};
export const fetchuserDietData = async (userId: number | undefined) => {
  if (!userId) return undefined;
  try {
    const res: UserDiet = await getUserDiet(userId);
    return res;
  } catch (error) {
    toast.error("An error occured");
    return undefined;
  }
};
