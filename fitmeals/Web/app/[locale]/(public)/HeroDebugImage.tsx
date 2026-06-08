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
        const img = e.currentTarget;

        console.log("[HOME HERO LOADED]", performance.now());

        img.decode().then(() => {
          console.log("[HOME HERO DECODED]", performance.now());
        });
      }}
    />
  );
}
