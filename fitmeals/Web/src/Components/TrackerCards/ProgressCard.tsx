"use client";

import React from "react";

type Props = {
  value: number;
  max: number;
  label: string;
  unit?: string;
  color?: string;
  radiusSM?: number;
  radiusLG?: number;
  strokeclr?: string;
  textSize?: string;
  top_gap?: string;
  Tracker?: boolean;
  smallText?: boolean;
};

const ProgressRing = ({
  value,
  max,
  label,
  unit = "g",
  Tracker,
  textSize,
  top_gap,
  color = "#6b8e22",
  radiusSM = 40,
  radiusLG = 70,
  strokeclr,
  smallText = false,
}: Props) => {
  const [radius, setRadius] = React.useState(radiusLG);
  const [stroke, setStroke] = React.useState(20);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setRadius(radiusSM);
      } else {
        setRadius(radiusLG);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [radiusSM, radiusLG]);

  // Responsive stroke
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setStroke(10);
      } else {
        setStroke(20);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ---------------- CALCULATIONS ---------------- //

  const normalizedRadius = radius - stroke * 0.5;

  const circumference = normalizedRadius * 2 * Math.PI;

  // Prevent divide by zero
  const progress = max > 0 ? value / max : 0;

  // Clamp to 100%
  const clampedProgress = Math.min(progress, 1);

  const strokeDashoffset = circumference - clampedProgress * circumference;

  // Over target
  const isExceeded = value > max;

  // Text sizing
  const dynamicTextSize =
    smallText && !Tracker
      ? "text-[10px]"
      : Tracker && !smallText
        ? "text-sm md:text-lg"
        : (textSize ?? "text-2xl md:text-lg");

  return (
    <div className="relative flex flex-col w-full h-full items-center justify-center">
      <svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        className="-rotate-90"
      >
        <defs>
          <linearGradient id="grad1" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="#9ACD32" />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
        </defs>

        {/* Background */}
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* Progress */}
        <circle
          stroke={isExceeded ? "#ef4444" : (strokeclr ?? "url(#grad1)")}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-700 ease-out"
        />
      </svg>

      {/* Center text */}
      <div
        className={`absolute text-center ${smallText ? "mt-3" : "mt-0"} ${top_gap ?? "top-12"}`}
      >
        <div className="flex items-center justify-center gap-1">
          <h1 className={`${dynamicTextSize} font-bold`}>{value}</h1>

          <h4 className={`${dynamicTextSize} font-bold`}>/</h4>

          <h1 className={`${dynamicTextSize} font-bold text-gray-500`}>
            {max}
          </h1>
        </div>

        <p className={`${smallText ? "text-[10px]" : "text-xs"} text-gray-500`}>
          {unit}
        </p>

        {isExceeded && !smallText && (
          <p className="text-[10px] text-red-500 font-medium">
            +{value - max} over
          </p>
        )}

        {!isExceeded && !smallText && (
          <p className="text-[10px] text-green-500 font-medium">
            +{max - value} to go
          </p>
        )}
      </div>

      <p
        className={`${
          smallText ? "text-[10px]" : "text-lg"
        } mt-2 font-semibold`}
      >
        {label}
      </p>
    </div>
  );
};

export default ProgressRing;
