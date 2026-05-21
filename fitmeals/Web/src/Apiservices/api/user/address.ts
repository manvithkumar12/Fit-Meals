import { addressForm } from "@/src/validators/user/address.validator";

export const postAddress = async (data: addressForm) => {
  const res = await fetch("/api/user/address", {
    credentials: "include",
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...data }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "unable to upload address");
  }
};
