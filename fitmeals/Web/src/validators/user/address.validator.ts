import { addressInput } from "@/src/types/modelTypes/user/address.types";
import { ZodType, z } from "zod";

export const addressValidator: ZodType<addressInput> = z.object({
  name: z.enum(["Home", "Work", "Other"]),
  street: z.string().trim().min(3, "streetname must be minimum 3 characters"),
  area: z.string().trim().min(3, "area must be minimum 3 characters"),
  city: z.string().trim().min(3, "city must be minimum 3 characters"),
  state: z.string().trim().min(3, "state must be minimum 3 characters"),
  pinCode: z.string().regex(/^[0-9]{5}$/, "pincode must be exactly 5 digits"),
  lat: z
    .number()
    .min(-90, "latitude must be >= -90")
    .max(90, "latitude must be <= 90"),
  long: z
    .number()
    .min(-180, "longitude must be >= -180")
    .max(180, "longitude must be <= 180"),
  address: z.string().min(3, "adress must be minimum 3 characters"),
  id: z.number().optional(),
});

export type addressForm = z.infer<typeof addressValidator>;
