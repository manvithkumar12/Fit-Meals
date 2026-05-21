import { addAddress } from "@/src/models/user/addressModel";
import { addressValidator } from "@/src/validators/user/address.validator";

export const createAddress = async (
  body: unknown,
  userId: number,
  isDefault: boolean,
  id?: number,
) => {
  const parsed = addressValidator.parse(body);

  return await addAddress({
    ...parsed,
    id,
    userId,
    isDefault,
  });
};