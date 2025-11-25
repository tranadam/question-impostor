"use client";

import { useState, useEffect } from "react";

export function useGameStorage<T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const stored = sessionStorage.getItem(key);
    setValue(stored ? JSON.parse(stored) : initialValue);
  }, [key, initialValue]);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof sessionStorage === "undefined"
    ) {
      return;
    }
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
