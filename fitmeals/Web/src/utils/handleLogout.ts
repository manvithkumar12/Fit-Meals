"use client";

import { toast } from "react-toastify";
import { logoutUser } from "../Apiservices/api/auth/logout";
import { usePathname } from "next/navigation";

export const useHandleLogout = () => {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await logoutUser();

      toast.success("Logged out successfully");

      const locale = pathname.split("/")[1] || "en";

      window.location.href = `/${locale}/login/Customer`;
    } catch (err: unknown) {
      let message = "Something went wrong";

      if (err instanceof Error) {
        message = err.message;
      }

      toast.error(message);
    }
  };

  return handleLogout;
};
