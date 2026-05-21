export type RegisterRole =
  | "Customer"
  | "DeliveryPartner"
  | "RestaurantPartner"
  | "SupportTeam";

export interface RegisterCardProps {
  role: RegisterRole;
}
