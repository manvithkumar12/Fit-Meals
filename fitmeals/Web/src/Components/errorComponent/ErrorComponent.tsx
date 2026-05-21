"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "@/src/Components/LocalizedLink";
import { useRouter } from "next/navigation";

interface ErrorProps {
  label: string;
  btnTxt?: string;
  navUrl?: string;
  onClick?: () => void;
  whiteBg?: boolean;
  refreshBtn?: boolean;
}

const ErrorComponent = ({
  label,
  btnTxt,
  navUrl,
  onClick,
  whiteBg,
  refreshBtn,
}: ErrorProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const timer = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  return (
    <div className="w-full h-[70%] relative">
      <div className="w-full h-full">
        <Image
          src={whiteBg ? "/error.png" : "/error.jpeg"}
          alt="error_image"
          priority
          fill
          sizes="100vw"
        />
      </div>

      <h1 className="font-semibold text-lg text-center">{label}</h1>

      <div className="w-full flex justify-center">
        {btnTxt ? (
          <>
            {navUrl ? (
              <Link href={navUrl}>
                <button className="bg-green-700 ml-auto w-max mt-2 rounded-md mr-auto p-2 font-semibold text-white">
                  {btnTxt}
                </button>
              </Link>
            ) : (
              <button
                disabled={loading}
                onClick={() => {
                  onClick?.();
                  refreshBtn && router.refresh();
                  timer();
                }}
                className={`bg-green-700 ml-auto w-max mt-2 rounded-md mr-auto p-2 font-semibold text-white ${
                  loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                {loading ? "loading..." : btnTxt}
              </button>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ErrorComponent;
