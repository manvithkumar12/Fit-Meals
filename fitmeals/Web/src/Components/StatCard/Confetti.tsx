"use client";

import Lottie from "lottie-react";
import confettiAnimation from "@/src/animations/confetti.json";

const Confetti = () => {
  return (
    <div className="absolute inset-0 flex justify-center items-start pointer-events-none z-50">
      <Lottie
        animationData={confettiAnimation}
        loop={false}
        autoplay={true}
        style={{ width: "100%", maxWidth: 400, height: 250 }}
      />
    </div>
  );
};

export default Confetti;
