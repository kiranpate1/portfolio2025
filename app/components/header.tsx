import React, { useState, useEffect, useRef } from "react";

type props = {
  height: number;
  scrollProgress?: number;
};

const Header = ({ height, scrollProgress }: props) => {
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

  const drag = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollProgress !== undefined && terminalRef.current && drag.current) {
      const terminal = terminalRef.current;
      const dragElement = drag.current;
      if (scrollProgress > 0.9) {
        terminal.style.zIndex = "0";
        dragElement.style.opacity = "0";
      } else {
        terminal.style.zIndex = "2";
        dragElement.style.opacity = "1";
      }
    }
  }, [scrollProgress]);

  const nameBanner = ` __  ___  __   ______       ___       __   __   ______      ___      ___________  _______  __          ___
|  |/  / |  | |   _  \\     /   \\     |  \\ |  | |   _  \\    /   \\    |           ||   ____||  |        /  /
|  '  /  |  | |  |_)  |   /  ^  \\    |   \\|  | |  |_)  |  /  ^  \\   '---|  |----'|  |__   |  |       /  / 
|    <   |  | |      /   /  /_\\  \\   |  , '  | |   ___/  /  /_\\  \\      |  |     |   __|  |  |      /  /  
|  .  \\  |  | |  |\\  \\-./  _____  \\  |  |\\   | |  |     /  _____  \\   __|  |     |  |____ |  '----./  /   
|__|\\__\\ |__| | _| '.__/__/     \\__\\ |__| \\__| |__|    /__/     \\__\\ (__)__|     |_______||_______/__/`;
  const firstLine = `Last login: ${isMounted ? fullDate : ""} on ttys013`;
  const [lines, setLines] = useState<string[]>([firstLine]);

  // Keep the first history line in sync with the computed fullDate after hydration.
  // We compare before updating to avoid unnecessary state updates.
  useEffect(() => {
    setLines((prev) => {
      if (prev[0] === firstLine) return prev;
      const updated = [...prev];
      updated[0] = firstLine;
      return updated;
    });
  }, [fullDate, isMounted]);

  const [currentInput, setCurrentInput] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const prompt = "hello@kiranpa.tel ~ %\u00A0";

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

      if (currentInput.trim()) {
        setCommandHistory((prev) => [...prev, currentInput.trim()]);
      }
      setHistoryIndex(-1); // Reset history index

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
            setLines((prev) => [...prev, "yo mama"]);
          } else {
            setLines((prev) => [
              ...prev,
              "• portfolio2025 — a fast, polished personal site (this site)",
              "• experimental-visuals — WebGL + creative coding experiments",
              "• client-work — design systems, prototypes, brand identities",
            ]);
          }
        } else if (currentInput.trim() === "ethos") {
          setLines((prev) => [...prev, '"Design with code. Ship with craft."']);
        } else if (currentInput.trim().startsWith("connect")) {
          if (currentInput.trim() === "connect --method=contact") {
            setLines((prev) => [...prev, "> email: kiran@example.com"]);
          } else {
            setLines((prev) => [...prev, "> email: kiran@example.com"]);
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
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        const command = commandHistory[newIndex];
        setCurrentInput(command);
        setCursorPosition(command.length);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput("");
          setCursorPosition(0);
        } else {
          setHistoryIndex(newIndex);
          const command = commandHistory[newIndex];
          setCurrentInput(command);
          setCursorPosition(command.length);
        }
      }
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
      className="window absolute w-full rounded-2xl bg-[var(--shade-950)] z-2"
      style={{
        height: `${height}px`,
      }}
    >
      <div className="w-full h-full overflow-hidden relative rounded-2xl">
        <div
          className="w-full h-full flex flex-col caption-small select-text justify-start p-3"
          style={{
            justifyContent:
              lines.length < Math.floor((height - 96) / 16) - 1
                ? "flex-start"
                : "flex-end",
          }}
        >
          <div>
            <div className="text-[#8b96ad]">
              Designer · developer · artist · open to work
            </div>
            <pre>{nameBanner}</pre>
            <div className="text-[#8b96ad]">
              ==========================================================================================================
            </div>
          </div>
          <div className="flex flex-col items-stretch w-full">
            {lines.map((line, index) => (
              <div
                key={index}
                className="whitespace-pre-wrap select-text leading-4"
              >
                {line}
              </div>
            ))}

            <div className="flex select-text leading-4">
              <span className="text-green-400 select-text">{prompt}</span>
              <div className="flex-1 relative">
                <span className="text-green-400 select-text">
                  {currentInput}
                </span>
                <span
                  className={`absolute top-0 bg-green-400 text-black w-[7px] h-4 ${
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
        </div>
      </div>
      <div
        ref={drag}
        className="drag absolute w-full h-1.5 rounded-full -bottom-1 left-0 translate-y-[100%] after:content-[''] after:absolute after:inset-[-16px_auto_-16px_auto] after:w-[calc(100vw-250px)] after:left-[50%] after:translate-x-[-50%] cursor-ns-resize z-100 duration-100 transition-opacity"
      >
        <div className="relative w-12 h-full rounded-full bg-[var(--shade-750)] left-[50%] translate-x-[-50%]"></div>
      </div>
    </div>
  );
};

export default Header;
