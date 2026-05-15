"use client";

import { useEffect, useState } from "react";

const lines = [
  { cmd: "whoami", output: "Yassine ANZAR BASHA" },
  { cmd: "title", output: "Développeur Full-Stack" },
  { cmd: "location", output: "Paris, France 📍" },
  { cmd: "stack", output: "React · Next.js · Expo · K8s · Terraform" },
  { cmd: "status", output: "Disponible ✓" },
];

const TYPING_SPEED = 55;
const PAUSE_AFTER_OUTPUT = 900;
const PAUSE_BETWEEN_LINES = 300;

export default function Terminal() {
  const [displayed, setDisplayed] = useState<{ cmd: string; output: string }[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [typedCmd, setTypedCmd] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    if (currentLine >= lines.length) return;

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
  }, [typedCmd, showOutput, currentLine]);

  useEffect(() => {
    if (currentLine < lines.length) return;
    const t = setTimeout(() => {
      setDisplayed([]);
      setCurrentLine(0);
      setTypedCmd("");
      setShowOutput(false);
    }, PAUSE_BETWEEN_LINES + 1200);
    return () => clearTimeout(t);
  }, [currentLine]);

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/60 shadow-xl backdrop-blur-sm">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500/70" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
        <span className="h-3 w-3 rounded-full bg-green-500/70" />
        <span className="ml-2 text-xs text-muted/30">bash</span>
      </div>

      {/* Content */}
      <div className="space-y-3 p-5 font-mono text-sm">
        {displayed.map((line, i) => (
          <div key={i} className="space-y-0.5">
            <p className="text-muted/50">
              <span className="text-accent">~</span> $ {line.cmd}
            </p>
            <p className="text-muted/80">{line.output}</p>
          </div>
        ))}

        {currentLine < lines.length && (
          <div className="space-y-0.5">
            <p className="text-muted/50">
              <span className="text-accent">~</span> ${" "}
              <span className="text-muted">{typedCmd}</span>
              <span className="animate-pulse text-accent">▋</span>
            </p>
            {showOutput && (
              <p className="text-muted/80">{lines[currentLine].output}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
