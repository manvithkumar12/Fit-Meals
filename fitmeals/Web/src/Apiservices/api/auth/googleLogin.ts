export const googleLogin = async (
  credential: string,
  role: "CUSTOMER" | "OWNER" | "DELIVERY",
) => {
  const res = await fetch("/api/auth/google-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      credential,
      role,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Google login failed");
  }

  return data;
};
