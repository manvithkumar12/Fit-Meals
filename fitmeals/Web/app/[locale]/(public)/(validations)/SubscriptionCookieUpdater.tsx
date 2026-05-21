"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SubscriptionCookieUpdater() {
  const router = useRouter();

  useEffect(() => {
    const updateCookie = async () => {
      await fetch("/api/updateCookie");

      router.refresh();
    };

    updateCookie();
  }, [router]);

  return null;
}
