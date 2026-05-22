import { z, ZodType } from "zod";
import { CUISINE_TYPES } from "@/src/types/enums/cuisine.types";
import { RestaurantInput } from "@/src/types/modelTypes/restaurant/restaurant.types";
import { TIME_FORMAT } from "@/src/types/modelTypes/restaurant/time.types";

export const restaurantSchema: ZodType<RestaurantInput> = z.object({
  name: z
    .string()
    .min(2, "Minimum 2 letters")
    .max(15, "Maximum 30 Letters Allowed"),
  images: z.url({ message: "Invalid image URL" }),
  agreementUrl: z.string().url("Invalid document URL").optional(),
  cuisineType: z.enum(CUISINE_TYPES, {
    message: "Invalid cuisine type selected",
  }),
  priceForTwo: z
    .number()
    .min(5, "Minimum price should be €5")
    .max(500, "Price too high max price is 500"),
  pinCode: z
    .number({ message: "Postal code must be a number" })
    .min(10000, "German postal code must be 5 digits")
    .max(99999, "German postal code must be 5 digits"),
  facilities: z
    .array(z.string().min(1, "Facility cannot be empty"))
    .min(3, "Minimum 3 facilities required")
    .max(3, "Only maximum 3 facilities can be added"),
  description: z
    .array(z.string().min(1, "Description cannot be empty"))
    .min(3, "Minimum 3 description points required")
    .max(3, "Only maximum 3 description points can be added"),
  openingTime: z.enum(TIME_FORMAT),
  closingTime: z.enum(TIME_FORMAT),
  mapLink: z.url("Invalid Url"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number too long"),
  streetName: z
    .string()
    .min(3)
    .max(30, "Street name minimum characters are 3 and maximum are 30"),
  houseNo: z.string(),
  area: z
    .string()
    .min(3)
    .max(30, "Area name minimum characters are 3 and maximum are 30"),
  city: z.string().min(2, "City name must be at least 2 characters"),
  lat: z.number("latitude must be a number"),
  long: z.number({ message: "Longitude must be a number" }),
  address: z.string().min(5, "Address must be at least 5 characters"),
  totalPersons: z.number().positive(),
});

export type RestaurantProps = z.infer<typeof restaurantSchema>;
