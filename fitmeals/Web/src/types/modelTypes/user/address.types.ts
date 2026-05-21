export type addressInput = {
  name: string;
  street: string;
  area: string;
  city: string;
  state: string;
  pinCode: string;
  id?: number;
  lat: number;
  long: number;
  address: string;
};

export type addressDB = addressInput & {
  isDefault: boolean;
  userId: number;
};
