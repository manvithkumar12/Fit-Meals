"use client";

import { useEffect } from "react";

export default function DebugLogger() {
  useEffect(() => {
    console.log("[DEBUG] HomePage mounted");

    const onScroll = () => {
      console.log(
        "[SCROLL]",
        window.scrollY,
        performance.now()
      );
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      console.log("[DEBUG] HomePage unmounted");
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
