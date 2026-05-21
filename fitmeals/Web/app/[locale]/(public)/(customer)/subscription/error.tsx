"use client";

import Link from "@/src/Components/LocalizedLink";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  useEffect(() => {
    console.error("Subscription Page Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f6f5f2] p-6 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Something went wrong
      </h1>

      <p className="text-gray-600 mb-6 max-w-md">
        We couldn’t load your subscription details. Please try again or go back
        to the dashboard.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Try Again
        </button>
        <Link href={"/"}>
          <button
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
}
