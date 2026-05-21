import { Coordinates } from "@/src/query/useRestaurant";

export const getReservations = async (
  page: number,
  filters: Record<string, string[]>,
  city?: string,
  coords?: Coordinates,
) => {
  try {
    const baseUrl =
      globalThis.window === undefined ? process.env.NEXT_PUBLIC_BASE_URL : "";

    const params = new URLSearchParams();

    params.append("page", String(page));
    if (city && city.trim() !== "") {
      params.append("city", city);
    } else if (coords?.lat && coords?.long) {
      params.append("lat", coords.lat.toString());
      params.append("long", coords.long.toString());
    }
    if (city) {
      params.append("city", city);
    }

    Object.entries(filters).forEach(([key, values]) => {
      values.forEach((value) => {
        params.append(key, value);
      });
    });

    const res = await fetch(
      `${baseUrl}/api/reservations?${params.toString()}`,
      {
        next: {
          revalidate: 60,
        },
      },
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);

      throw new Error(errorData?.message || "Failed to fetch Restaurants");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching Restaurants", error);
    throw error;
  }
};
