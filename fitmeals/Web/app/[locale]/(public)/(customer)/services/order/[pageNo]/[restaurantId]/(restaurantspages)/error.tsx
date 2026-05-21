"use client";

export default function Error({
  error,
  reset,
}: Readonly<{
  error: Error;
  reset: () => void;
}>) {
  return (
    <div className="flex flex-col items-center justify-center h-80">
      <p className="text-red-500 font-semibold">Failed to load food items</p>
      <button
        onClick={() => reset()}
        className="mt-3 px-4 py-2 bg-black text-white rounded"
      >
        Try Again
      </button>
    </div>
  );
}
