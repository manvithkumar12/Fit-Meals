import { RegisterData } from "@/src/validators/user/User.validator";

export const registerUserApi = async (data: RegisterData) => {
  const res = await fetch("/api/auth/register/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Registration Failed");
  }
  return res.json();
};
