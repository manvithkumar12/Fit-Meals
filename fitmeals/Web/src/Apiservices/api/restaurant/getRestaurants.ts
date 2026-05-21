type Coordinates = {
  lat?: number;
  long?: number;
};

export const getRestaurantsData = async (
  coords: Coordinates,
  city?: string,
  page: number = 1,
  limit: number = 8,
  filters?: Record<string, string[]>,
) => {
  let url = "/api/restaurant/getRestaurants";

  const params = new URLSearchParams();

  params.append("page", page.toString());
  params.append("limit", limit.toString());

  if (city && city.trim() !== "") {
    params.append("city", city);
  } else if (coords?.lat && coords?.long) {
    params.append("lat", coords.lat.toString());
    params.append("long", coords.long.toString());
  }
  if (filters) {
    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        params.append(key, values.join(","));
      }
    });
  }

  url += `?${params.toString()}`;

  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);

    throw new Error(errorData?.message || "Failed to fetch restaurants");
  }

  return res.json();
};
