"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useRestaurantSearch } from "@/src/query/search/useRestaurantSearch";
import { useCookbookSearch } from "@/src/query/search/useCookbookSearch";

interface PlaceholderProps {
  Placeholder?: string;
  type?: "order" | "reservation" | "cookbook";
  onData?: (data: any[] | null) => void;
  setSearchLoading?: (loading: boolean) => void;
}

const SearchBar = ({
  Placeholder,
  type,
  onData,
  setSearchLoading,
}: PlaceholderProps) => {
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebounce(value, 400);
  const restaurantQuery = useRestaurantSearch(
    type === "order" ? debouncedValue : "",
  );
  const cookbookQuery = useCookbookSearch(
    type === "cookbook" ? debouncedValue : "",
  );
  const reservationQuery = useRestaurantSearch(
    type === "reservation" ? debouncedValue : "",
    true,
  );
  const currentQuery =
    type === "order"
      ? restaurantQuery
      : type === "cookbook"
        ? cookbookQuery
        : reservationQuery;

  const { isLoading, isFetching } = currentQuery;

  const data = currentQuery.data as any[] | undefined;
  useEffect(() => {
    setSearchLoading?.(isLoading || isFetching);
  }, [isLoading, isFetching, setSearchLoading]);

  useEffect(() => {
    if (!value.trim()) {
      onData?.(null);
    } else if (data) {
      onData?.(data);
    }
  }, [value, data, onData]);

  return (
    <div className="ml-auto w-screen flex justify-center items-center relative mb-2">
      <input
        type="text"
        value={value}
        className="h-12 w-[90%] md:w-[90%] px-5 py-2 border border-black rounded-lg"
        placeholder={Placeholder ?? "Search here..."}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
