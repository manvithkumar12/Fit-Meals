import { createRestaurant as createRestaurantModel } from "@/src/models/restaurant/RestaurantModel";
import { getVerified, hasRestaurant } from "@/src/models/user/UserModel";
import { restaurantSchema } from "@/src/validators/restaurant/restaurant.validator";

export const restaurantCreateController = async (
  body: unknown,
  ownerId: number,
) => {
  const parsed = restaurantSchema.parse(body);

  const haveRestaurant = await hasRestaurant(ownerId);
  if (haveRestaurant) throw new Error("Restaurant already exist");

  await getVerified(ownerId);

  return await createRestaurantModel({ ...parsed, ownerId });
};
