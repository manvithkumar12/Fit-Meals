"use client";

import { useEffect, useSyncExternalStore } from "react";

export interface HotelFilterState {
  types: string[];
  category: string[];
  price: string[];
  ratings: string[];
  dietary: string[];
}

const defaultFilters: HotelFilterState = {
  types: [],
  category: [],
  price: [],
  ratings: [],
  dietary: [],
};

const parseUrlFilters = (): HotelFilterState => {
  if (typeof window === "undefined") {
    return defaultFilters;
  }
  const params = new URLSearchParams(window.location.search);
  return {
    types: params.get("types")?.split(",").filter(Boolean) || [],
    category: params.get("category")?.split(",").filter(Boolean) || [],
    price:
      (params.get("price") || params.get("priceRange"))
        ?.split(",")
        .filter(Boolean) || [],
    ratings: params.get("ratings")?.split(",").filter(Boolean) || [],
    dietary: params.get("dietary")?.split(",").filter(Boolean) || [],
  };
};

let currentFilters: HotelFilterState = defaultFilters;
let listeners: Array<() => void> = [];
let initialized = false;

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

export function initFiltersFromUrl() {
  if (typeof window === "undefined") return;
  currentFilters = parseUrlFilters();
  initialized = true;
  emitChange();
}

export function updateUrlFromFilters(filters: HotelFilterState) {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);

  if (filters.types.length > 0) {
    params.set("types", filters.types.join(","));
  } else {
    params.delete("types");
  }

  if (filters.category.length > 0) {
    params.set("category", filters.category.join(","));
  } else {
    params.delete("category");
  }

  if (filters.price.length > 0) {
    params.set("price", filters.price.join(","));
  } else {
    params.delete("price");
    params.delete("priceRange");
  }

  if (filters.ratings.length > 0) {
    params.set("ratings", filters.ratings.join(","));
  } else {
    params.delete("ratings");
  }

  if (filters.dietary.length > 0) {
    params.set("dietary", filters.dietary.join(","));
  } else {
    params.delete("dietary");
  }

  const queryString = params.toString();
  const newUrl = queryString
    ? `${window.location.pathname}?${queryString}`
    : window.location.pathname;

  window.history.replaceState(null, "", newUrl);
}

export const hotelFilterStore = {
  getSnapshot() {
    return currentFilters;
  },
  getServerSnapshot() {
    return defaultFilters;
  },
  subscribe(listener: () => void) {
    listeners = [...listeners, listener];

    if (typeof window !== "undefined" && !initialized) {
      currentFilters = parseUrlFilters();
      initialized = true;
    }

    const handlePopState = () => {
      currentFilters = parseUrlFilters();
      emitChange();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      listeners = listeners.filter((l) => l !== listener);
      window.removeEventListener("popstate", handlePopState);
    };
  },
  setFilters(newFilters: HotelFilterState) {
    currentFilters = newFilters;
    updateUrlFromFilters(newFilters);
    emitChange();
  },
};

export const useHotelFilters = () => {
  const filters = useSyncExternalStore(
    hotelFilterStore.subscribe,
    hotelFilterStore.getSnapshot,
    hotelFilterStore.getServerSnapshot,
  );

  useEffect(() => {
    initFiltersFromUrl();
  }, []);

  const toggleFilter = (
    paramName: keyof HotelFilterState,
    itemKey: string,
  ) => {
    const current = filters[paramName] || [];
    let updated: string[];
    if (current.includes(itemKey)) {
      updated = current.filter((k) => k !== itemKey);
    } else {
      updated = [...current, itemKey];
    }

    hotelFilterStore.setFilters({
      ...filters,
      [paramName]: updated,
    });
  };

  const clearAllFilters = () => {
    hotelFilterStore.setFilters({
      types: [],
      category: [],
      price: [],
      ratings: [],
      dietary: [],
    });
  };

  const totalActiveCount =
    filters.types.length +
    filters.category.length +
    filters.price.length +
    filters.ratings.length +
    filters.dietary.length;

  const hasActiveFilters = totalActiveCount > 0;

  return {
    filters,
    toggleFilter,
    clearAllFilters,
    totalActiveCount,
    hasActiveFilters,
  };
};
