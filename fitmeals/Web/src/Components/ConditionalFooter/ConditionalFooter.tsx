"use client";

import { usePathname } from "next/navigation";
import Footer from "@/src/Components/Footer/Footer";

export default function ConditionalFooter() {
    const pathname = usePathname();

    // Helper to get path without locale prefix (e.g. /en/login -> /login)
    const getCleanPath = (path: string) => {
        if (!path) return "";
        const segments = path.split("/");
        if (segments[1] && segments[1].length === 2) {
            return "/" + segments.slice(2).join("/");
        }
        return path;
    };

    const cleanPath = getCleanPath(pathname || "");

    const hideFooterRoutes = [
        "/login",
        "/register",
        "/profile",
        "/dashboard",
        "/subscription",
        "/health/fit-tracker",
        "/health/diet/daily-plan",
        "/health/food-details",
        "/verification",
        "/PartnerVerification",
        "/earnings",
        "/FoodItems",
        "/form/"
    ];

    const hideFooter = hideFooterRoutes.some((route) =>
        cleanPath.startsWith(route)
    );

    if (hideFooter) return null;

    return <Footer />;
}
