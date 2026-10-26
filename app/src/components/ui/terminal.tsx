"use client";

import { useEffect, useState } from "react";

type Line = { cmd: string; output: string };

const TYPING_SPEED = 55;
const PAUSE_AFTER_OUTPUT = 900;
const RESTART_PAUSE = 1500;

export default function Terminal({ lines }: Readonly<{ lines: Line[] }>) {
  const [displayed, setDisplayed] = useState<Line[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [typedCmd, setTypedCmd] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- matchMedia is client-only
    setReduced(matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced || currentLine >= lines.length) return;
    const { cmd, output } = lines[currentLine];

    if (typedCmd.length < cmd.length) {
      const t = setTimeout(
        () => setTypedCmd(cmd.slice(0, typedCmd.length + 1)),
        TYPING_SPEED,
      );
      return () => clearTimeout(t);
    }
    if (!showOutput) {
      const t = setTimeout(() => setShowOutput(true), 180);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setDisplayed((prev) => [...prev, { cmd, output }]);
      setTypedCmd("");
      setShowOutput(false);
      setCurrentLine((n) => n + 1);
    }, PAUSE_AFTER_OUTPUT);
    return () => clearTimeout(t);
  }, [typedCmd, showOutput, currentLine, lines, reduced]);

  useEffect(() => {
    if (reduced || currentLine < lines.length) return;
    const t = setTimeout(() => {
      setDisplayed([]);
      setCurrentLine(0);
    }, RESTART_PAUSE);
    return () => clearTimeout(t);
  }, [currentLine, lines.length, reduced]);

  return (
    <div className="w-full max-w-md border border-line bg-bg">
      <div className="border-b border-line px-4 py-2 text-xs text-fg-muted">
        bash
      </div>
      <div className="min-h-64 space-y-3 p-5 text-sm">
        {(reduced ? lines : displayed).map((line) => (
          <div key={line.cmd}>
            <p className="text-fg-muted">
              <span className="text-accent-ink">~</span> $ {line.cmd}
            </p>
            <p className="text-fg">{line.output}</p>
          </div>
        ))}
        {!reduced && currentLine < lines.length && (
          <div>
            <p className="text-fg-muted">
              <span className="text-accent-ink">~</span> ${" "}
              <span className="text-fg">{typedCmd}</span>
              <span className="animate-pulse text-accent-ink">▋</span>
            </p>
            {showOutput && <p className="text-fg">{lines[currentLine].output}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
