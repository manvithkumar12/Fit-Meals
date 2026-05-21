"use client";

import { usePathname } from "next/navigation";
import Footer from "@/src/Components/Footer/Footer";

export default function ConditionalFooter() {
    const pathname = usePathname();

    const hideFooterRoutes = [
        "/login",
        "/register",
        "/profile",
        "/dashboard",
        "/subscription",
        "/health/fit-tracker",
        "/health/diet/daily-plan",
        "/health/food-details",
    ];

    const hideFooter = hideFooterRoutes.some((route) =>
        pathname.startsWith(route)
    );

    if (hideFooter) return null;

    return <Footer />;
}