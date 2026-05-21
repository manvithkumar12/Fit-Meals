export type loginRole = "Customer"| "DeliveryPartner"| "RestaurantPartner" | "SupportTeam";

export interface LoginCardProps{
    role:loginRole
}