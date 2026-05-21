export const subscribePayment = async (
  category: "STARTER" | "PLUS" | "PREMIUM",
  range: "monthly" | "yearly",
) => {
  const res = await fetch(`/api/payments/subscription?type=${category}&range=${range}`, {
    credentials: "include",
    method: "POST",
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData.message || "An error occured");
  }
  const data = await res.json();
  return data;
};
