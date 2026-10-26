"use client";

import { useEffect, useRef, useState } from "react";

export default function CopyEmail({
  email,
  copy,
  copied,
}: {
  email: string;
  copy: string;
  copied: string;
}) {
  const [done, setDone] = useState(false);
  const [fallback, setFallback] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setDone(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setDone(false), 2000);
    } catch {
      setFallback(true);
    }
  };

  // Missing clipboard API throws inside onCopy's try, landing here too
  return fallback ? (
    <a href={`mailto:${email}`} className="hover:text-accent-ink">
      {email}
    </a>
  ) : (
    <button type="button" onClick={onCopy} className="text-left hover:text-accent-ink">
      {email} <span aria-live="polite" className="text-fg-muted">[ {done ? copied : copy} ]</span>
    </button>
  );
}
