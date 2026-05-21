import { loginInput } from "@/src/validators/auth/LoginDetails.validator";

export const userLogin = async (data: loginInput) => {
  const res = await fetch("/api/auth/login", {
    credentials: "include",
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
  const responseData = await res.json();

  if (!res.ok) {
    console.log("ErrorData", responseData);
    throw new Error(responseData?.message || "Login Failed");
  }

  return responseData;
};
