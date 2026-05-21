import { queryApi } from "@/src/validators/user/query.validator";

export const postQuery = async (data: queryApi) => {
  const res = await fetch("/api/user/query", {
    credentials: "include",
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Query upload Failed");
  }
};
