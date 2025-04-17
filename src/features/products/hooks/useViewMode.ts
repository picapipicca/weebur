import { useEffect, useState } from "react";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";

export const useViewMode = () => {
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useLocalStorage<"list" | "grid">(
    "view-mode",
    "list"
  );

  useEffect(() => {
    setMounted(true);

    const lastSet = localStorage.getItem("view-mode-timestamp");
    const now = new Date().getTime();

    if (!lastSet || now - Number(lastSet) > 86400000) {
      const newMode = Math.random() > 0.5 ? "list" : "grid";
      setViewMode(newMode);
      localStorage.setItem("view-mode-timestamp", now.toString());
    }
  }, []);

  return { viewMode, mounted };
};
