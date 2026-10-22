"use client";

import { useEffect, useState } from "react";

export function CurrentYear() {
  const [year, setYear] = useState("");

  useEffect(() => {
    // Reading the clock once after hydration avoids prerender variance.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setYear(String(new Date().getFullYear()));
  }, []);

  return <span>{year}</span>;
}
