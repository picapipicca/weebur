"use client";

import React, { useEffect, useState } from "react";
import ArrowUp from "@/shared/assets/icons/arrowUp.svg";

const ScrollTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      aria-label="맨 위로 이동"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="cursor-pointer fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-lg bg-primary hover:bg-hover_primary transition"
    >
      <ArrowUp className="h-6 w-6 text-white" />
    </button>
  );
};

export default ScrollTopButton;
