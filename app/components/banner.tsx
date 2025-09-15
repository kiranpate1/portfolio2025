import React, { useState, useEffect, useRef } from "react";

type props = {
  height: number;
};

// $ cat about.me
// Name:     Kiran Patel
// Roles:    Designer / Developer / Artist
// Status:   Freelancing · Remote-friendly
// Focus:    UX, frontend (React + TypeScript), generative/motion visuals

// $ skills
// - Product & interface design
// - Component-driven frontend (React / Next.js / TypeScript)
// - Interactive visuals & generative art
// - Prototyping, motion, illustration

// $ projects --recent
// • portfolio2025 — a fast, polished personal site (this site)
// • experimental-visuals — WebGL + creative coding experiments
// • client-work — design systems, prototypes, brand identities

// $ ethos
// "Design with code. Ship with craft."

// $ connect --method=contact
// > email: hello@kiranpa.tel     github: github.com/kiranpatel
// > dribbble / behance / linkedin — available on profile links

const Banner = ({ height }: props) => {
  const [fullDate, setFullDate] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const date = new Date();
    const dayofWeek = date.toLocaleDateString("en-US", { weekday: "short" });
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const day = date.getDate();
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const fullDate = `${dayofWeek} ${month} ${day} ${time}`;
    setFullDate(fullDate);
    // mark mounted so we only render the dynamic date after hydration
    setIsMounted(true);
  }, []);

  const firstLine = `Last login: ${isMounted ? fullDate : ""} on ttys013`;
  const [lines, setLines] = useState<string[]>([firstLine]);

  // Keep the first history line in sync with the computed fullDate after hydration.
  // We compare before updating to avoid unnecessary state updates.
  useEffect(() => {
    const newFirst = `Last login: ${isMounted ? fullDate : ""} on ttys013`;
    setLines((prev) => {
      if (prev[0] === newFirst) return prev;
      const updated = [...prev];
      updated[0] = newFirst;
      return updated;
    });
  }, [fullDate, isMounted]);

  const [currentInput, setCurrentInput] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const prompt = "kiran@kiranpa.tel ~ %\u00A0";

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Only focus input if user isn't selecting text
      const selection = window.getSelection();
      if (!selection || selection.toString().length === 0) {
        inputRef.current?.focus();
      }
    };

    const terminal = terminalRef.current;
    if (terminal) {
      terminal.addEventListener("click", handleClick);
      return () => terminal.removeEventListener("click", handleClick);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus input when user starts typing (but not during text selection)
      const selection = window.getSelection();
      if (
        (!selection || selection.toString().length === 0) &&
        e.key.length === 1 &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey
      ) {
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setCursorPosition(Math.min(cursorPosition, currentInput.length));
  }, [currentInput, cursorPosition]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      // Add current line to history
      setLines((prev) => [...prev, prompt + currentInput]);

      // Simulate command response (you can extend this)
      if (currentInput.trim()) {
        if (currentInput.trim() === "clear") {
          setLines([firstLine]);
        } else if (currentInput.trim() === "help") {
          setLines((prev) => [
            ...prev,
            "Available commands: about, clear, connect, ethos, help, skills, projects, pwd",
          ]);
        } else if (currentInput.trim() === "about") {
          setLines((prev) => [
            ...prev,
            "Name:     Kiran Patel",
            "Roles:    Designer / Developer / Artist",
            "Status:   Freelancing · Remote-friendly",
            "Focus:    UX, frontend (React + TypeScript), generative/motion visuals",
          ]);
        } else if (currentInput.trim() === "skills") {
          setLines((prev) => [
            ...prev,
            "- Product & interface design",
            "- Component-driven frontend (React / Next.js / TypeScript)",
            "- Interactive visuals & generative art",
            "- Prototyping, motion, illustration",
          ]);
        } else if (currentInput.trim().startsWith("projects")) {
          if (currentInput.trim() === "projects --recent") {
            setLines((prev) => [
              ...prev,
              "• portfolio2025 — a fast, polished personal site (this site)",
              "• experimental-visuals — WebGL + creative coding experiments",
              "• client-work — design systems, prototypes, brand identities",
            ]);
          } else {
            setLines((prev) => [
              ...prev,
              "• portfolio2025 — a fast, polished personal site (this site)",
              "• experimental-visuals — WebGL + creative coding experiments",
              "• client-work — design systems, prototypes, brand identities",
            ]);
          }
        } else if (currentInput.trim() === "pwd") {
          setLines((prev) => [...prev, "https://kiranpa.tel/"]);
        } else {
          setLines((prev) => [
            ...prev,
            `zsh: command not found: ${currentInput.trim()}`,
          ]);
        }
      }

      setCurrentInput("");
      setCursorPosition(0);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setCursorPosition((prev) => Math.max(0, prev - 1));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setCursorPosition((prev) => Math.min(currentInput.length, prev + 1));
    } else if (e.key === "Backspace") {
      e.preventDefault();
      if (cursorPosition > 0) {
        const newInput =
          currentInput.slice(0, cursorPosition - 1) +
          currentInput.slice(cursorPosition);
        setCurrentInput(newInput);
        setCursorPosition((prev) => prev - 1);
      }
    } else if (e.key === "Delete") {
      e.preventDefault();
      if (cursorPosition < currentInput.length) {
        const newInput =
          currentInput.slice(0, cursorPosition) +
          currentInput.slice(cursorPosition + 1);
        setCurrentInput(newInput);
      }
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      const newInput =
        currentInput.slice(0, cursorPosition) +
        e.key +
        currentInput.slice(cursorPosition);
      setCurrentInput(newInput);
      setCursorPosition((prev) => prev + 1);
    }
  };

  return (
    <div
      ref={terminalRef}
      className="window flex flex-col absolute w-full rounded-2xl bg-[#0a0e15] overflow-scroll"
      style={{
        height: `${height}px`,
        justifyContent: lines.length < 6 ? "flex-start" : "flex-end",
      }}
    >
      <div className="flex flex-col items-stretch p-3 w-full caption-small select-text">
        {lines.map((line, index) => (
          <div
            key={index}
            className="whitespace-pre-wrap select-text leading-3"
          >
            {line}
          </div>
        ))}

        <div className="flex select-text leading-3">
          <span className="text-green-400 select-text">{prompt}</span>
          <div className="flex-1 relative">
            <span className="text-green-400 select-text">{currentInput}</span>
            <span
              className={`absolute top-0 bg-green-400 text-black w-1.5 h-3 ${
                cursorVisible ? "opacity-100" : "opacity-0"
              } transition-opacity`}
              style={{
                left: `${cursorPosition * 0.6}em`, // Approximate character width in monospace
              }}
            >
              {cursorPosition < currentInput.length
                ? currentInput[cursorPosition]
                : " "}
            </span>
            <input
              ref={inputRef}
              type="text"
              value=""
              onKeyDown={handleKeyDown}
              className="absolute inset-0 bg-transparent border-none outline-none text-transparent w-full pointer-events-none"
              style={{ caretColor: "transparent" }}
              readOnly
            />
          </div>
        </div>
      </div>
      <div className="filter"></div>
    </div>
  );
};

export default Banner;
