export const getNutrients = async (foodname: string) => {
  const res = await fetch(`/api/restaurant/getNutrients/${foodname}`, {
    credentials: "include",
    method:"GET"
  });
  if (!res.ok) {
    const errorData =await res.json().catch(() => null);
    throw new Error(errorData?.message || "An error occured");
  }
  return res.json();
};
