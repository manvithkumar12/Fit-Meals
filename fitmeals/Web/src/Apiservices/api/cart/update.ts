export const updateItem = async (id: number | undefined, quantity: number) => {
  const res = await fetch(`/api/user/cart/${id}/update?quantity=${quantity}`, {
    credentials: "include",
    method: "POST",
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData.message || "An error occured");
  }
};
