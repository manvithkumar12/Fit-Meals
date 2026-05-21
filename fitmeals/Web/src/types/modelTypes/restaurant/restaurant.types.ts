export type RestaurantInput = {
  name: string;
  images: string;
  agreementUrl?: string;
  cuisineType: string;
  priceForTwo: number;
  pinCode: number;
  facilities: string[];
  description: string[];
  openingTime: string;
  closingTime: string;
  mapLink: string;
  phoneNumber: string;
  streetName: string;
  houseNo: string;
  area: string;
  city: string;
  lat: number;
  long: number;
  address: string;
  totalPersons: number;
};
export type RestaurantDBInput = RestaurantInput & {
  ownerId: number;
};
