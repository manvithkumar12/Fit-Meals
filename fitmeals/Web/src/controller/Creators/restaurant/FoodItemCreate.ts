import { FoodItemSchema } from "@/src/validators/restaurant/FoodItem.validator"
import { addFood } from "@/src/models/restaurant/FoodItemModel"

export const foodItemCreate = async(body : unknown,restaurantId : number) =>{
    const parsed = FoodItemSchema.parse(body)
    return await addFood({
        ...parsed,restaurantId})
}