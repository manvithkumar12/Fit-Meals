export const logoutUser = async () => {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message || "Logout failed");
  }

  const data = await res.json().catch(() => null);
  return data;
};
