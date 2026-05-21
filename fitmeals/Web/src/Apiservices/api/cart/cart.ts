import { CartResponseType } from "@/src/types/addTocart.types";

export const addToCart = async (body: CartResponseType) => {
  let res = await fetch("/api/user/cart/create", {
    method: "POST",
    credentials: "include",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

  if (res.status === 409) {
    const errorData = await res.json().catch(() => null);
    throw new Error(
      errorData?.message || "Cart contains items from another restaurant",
    );
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "An error occured");
  }

  return res;
};

export const forceAddToCart = async (body: CartResponseType) => {
  const res = await fetch("/api/user/cart/create?force=true", {
    method: "POST",
    credentials: "include",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "An error occured");
  }

  return res;
};
