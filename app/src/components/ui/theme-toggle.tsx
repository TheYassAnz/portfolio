"use client";

import { useEffect, useState } from "react";

export const THEME_SCRIPT = `try{var t=localStorage.theme;if(t==="light"||(!t&&matchMedia("(prefers-color-scheme: light)").matches))document.documentElement.classList.add("light")}catch(e){}`;

export default function ThemeToggle({ label }: { label: string }) {
  const [light, setLight] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync with class set by THEME_SCRIPT before hydration
    setLight(document.documentElement.classList.contains("light"));
  }, []);

  function toggle() {
    const next = document.documentElement.classList.toggle("light");
    setLight(next);
    try {
      localStorage.theme = next ? "light" : "dark";
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={light}
      className="font-mono text-fg hover:text-accent-ink"
    >
      {light ? "[ ☀ ]" : "[ ☾ ]"}
    </button>
  );
}
