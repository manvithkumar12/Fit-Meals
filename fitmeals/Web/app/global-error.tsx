"use client";

import Navbar from "@/src/Components/Navbar/Navbar";
import ErrorPage from "@/src/Components/RedirectComponent/ErrorPage/ErrorPage";

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <>
            <Navbar />
            <ErrorPage reset={reset} />
        </>);
}