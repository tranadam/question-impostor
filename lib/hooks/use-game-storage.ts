"use client";

import { useEffect, useState } from "react";

export function useGameStorage<T>(key: UserGameConfig, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      if (item !== null) {
        setValue(JSON.parse(item));
      }
    } catch (e) {
      console.error("sessionStorage read failed", e);
    }
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("sessionStorage write failed", e);
    }
  }, [key, value, hydrated]);

  return [value, setValue] as const;
}
