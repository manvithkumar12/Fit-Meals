import { toast } from "react-toastify"

export const alertCall = (
  message: string,
  status: "success" | "error" | "warning" | "info"
) => {
  toast[status](message);
};