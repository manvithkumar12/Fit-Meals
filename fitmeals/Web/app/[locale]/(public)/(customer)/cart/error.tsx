"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: Readonly<{
  error: Error;
  reset: () => void;
}>) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6">
      <h2 className="text-lg font-semibold">
        Something went wrong while loading your cart.
      </h2>
      <button
        onClick={() => reset()}
        className="rounded bg-black px-4 py-2 text-white"
      >
        Try again
      </button>
    </div>
  );
}
