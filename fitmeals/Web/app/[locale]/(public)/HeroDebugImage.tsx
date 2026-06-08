"use client";

import Image from "next/image";

export default function HeroDebugImage() {
  return (
    <Image
      src="/home-img.webp"
      alt="intro"
      fill
      priority
      quality={70}
      sizes="100vw"
      className="object-cover"
      placeholder="blur"
      blurDataURL="/blur.jpeg"
      onLoad={(e) => {
        console.log("[HOME HERO LOADED]", {
          time: performance.now(),
          src: e.currentTarget.currentSrc,
          width: e.currentTarget.naturalWidth,
          height: e.currentTarget.naturalHeight,
        });
      }}
    />
  );
}
