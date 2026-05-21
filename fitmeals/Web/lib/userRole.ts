import { logedUser } from "@/src/types/logedUser.types";

export const hasRole = (user: logedUser, role: string): boolean => {
  return user?.role === role;
};

export const isCustomer = (user: logedUser): boolean =>
  hasRole(user, "CUSTOMER");

export const isOwner = (user: logedUser): boolean =>
  hasRole(user, "OWNER");

export const isDelivery = (user: logedUser): boolean =>
  hasRole(user, "DELIVERY");

export const isSupportTeam = (user: logedUser): boolean =>
  hasRole(user, "SUPPORT");