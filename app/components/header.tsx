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

  //   const nameBanner = ` __  ___  __   ______       ___       __   __   ______      ___      ___________  _______  __          ___
  // |  |/  / |  | |   _  \\     /   \\     |  \\ |  | |   _  \\    /   \\    |           ||   ____||  |        /  /
  // |  '  /  |  | |  |_)  |   /  ^  \\    |   \\|  | |  |_)  |  /  ^  \\   '---|  |----'|  |__   |  |       /  /
  // |    <   |  | |      /   /  /_\\  \\   |  , '  | |   ___/  /  /_\\  \\      |  |     |   __|  |  |      /  /
  // |  .  \\  |  | |  |\\  \\-./  _____  \\  |  |\\   | |  |     /  _____  \\   __|  |     |  |____ |  '----./  /
  // |__|\\__\\ |__| | _| '.__/__/     \\__\\ |__| \\__| |__|    /__/     \\__\\ (__)__|     |_______||_______/__/`;

  //   const nameBanner = `
  //     __   _                                 __       __
  //    / /__(_)________ _____  ____  ____ _   / /_ __  / /
  //   / //_/ / ___/ __ '/ __ \\/ __ \\/ __ '/  / __/ _ \\/ /
  //  / ,< / / /  / /_/ / / / / /_/ / /_/ /_ / /_/  __/ /
  // /_/|_/_/_/   \\__,_/_/ /_/ .___/\\_,__/(_)\\__/\\___/_/
  //                        /_/`;

  const nameBanner = (
    <>
      <pre>
        {`    __ __ ________  ___    _   ______  ___      `}
        <span className="text-[var(--accent)]">______________</span>
        {`
   / //_//  _/ __ \\/   |  / | / / __ \\/   |    `}
        <span className="text-[var(--accent)]">/_{`  `}__/ ____/ / </span>
        {`
  / ,<   / // /_/ / /| | /  |/ / /_/ / /| |     `}
        <span className="text-[var(--accent)]">/ / / __/ / / </span>
        {`
 / /| |_/ // _, _/ ___ |/ /|  / ____/ ___ | _  `}
        <span className="text-[var(--accent)]">/ / / /___/ /___</span>
        {`
/_/ |_/___/_/ |_/_/  |_/_/ |_/_/   /_/  |_|(_)`}
        <span className="text-[var(--accent)]">/_/ /_____/_____/</span>
        {`
        `}
      </pre>
    </>
  );

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

  const isActive = scrollProgress === undefined || scrollProgress <= 0.1;

  const prompt = "hello@kiranpa.tel ~ %\u00A0";

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isActive) return;

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
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

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
  }, [isActive]);

  // Auto-focus on mount
  useEffect(() => {
    if (isActive) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  }, [isActive]);

  const themes = [
    ["#00030a", "#e0e4f0", "#002d00"],
    ["#0a0e15", "#d3d8e5", "#004400"],
    ["#181b22", "#c6ccd9", "#005c00"],
    ["#252931", "#b9c0cd", "#007400"],
    ["#323740", "#acb4c1", "#008c00"],
    ["#3f4450", "#9fa8b5", "#00a400"],
    ["#4b525f", "#929ca9", "#00bc00"],
    ["#58606f", "#85909d", "#00d400"],
    ["#656d7f", "#788491", "#00ec00"],
    ["#717b8e", "#6b7885", "#00ff00"],
    ["#7e889e", "#5e6c79", "#1aff1a"],
    ["#8b96ad", "#51606d", "#33ff33"],
    ["#98a4bd", "#445461", "#4dff4d"],
    ["#a4b1cc", "#374855", "#66ff66"],
    ["#b1bfdb", "#2a3c49", "#80ff80"],
    ["#beccea", "#1d303d", "#99ff99"],
    ["#cbdaf9", "#102431", "#b3ffb3"],
    ["#d8e5ff", "#031825", "#ccffcc"],
    ["#e6eeff", "#000c19", "#e6ffe6"],
    ["#f3f7ff", "#00000d", "#ffffe6"],
    ["#1E2527", "#F5F7FA", "#0A260F"],
    ["#4ade80", "#16a34a", "#4ade80"],
  ];

  const themeChange = (theme: string) => {
    document.documentElement.style.setProperty(
      "--shade-1000",
      theme === "dark"
        ? themes[0][0]
        : theme === "light"
          ? themes[0][1]
          : themes[0][2],
    );
    document.documentElement.style.setProperty(
      "--shade-950",
      theme === "dark"
        ? themes[1][0]
        : theme === "light"
          ? themes[1][1]
          : themes[1][2],
    );
    document.documentElement.style.setProperty(
      "--shade-900",
      theme === "dark"
        ? themes[2][0]
        : theme === "light"
          ? themes[2][1]
          : themes[2][2],
    );
    document.documentElement.style.setProperty(
      "--shade-850",
      theme === "dark"
        ? themes[3][0]
        : theme === "light"
          ? themes[3][1]
          : themes[3][2],
    );
    document.documentElement.style.setProperty(
      "--shade-800",
      theme === "dark"
        ? themes[4][0]
        : theme === "light"
          ? themes[4][1]
          : themes[4][2],
    );
    document.documentElement.style.setProperty(
      "--shade-750",
      theme === "dark"
        ? themes[5][0]
        : theme === "light"
          ? themes[5][1]
          : themes[5][2],
    );
    document.documentElement.style.setProperty(
      "--shade-700",
      theme === "dark"
        ? themes[6][0]
        : theme === "light"
          ? themes[6][1]
          : themes[6][2],
    );
    document.documentElement.style.setProperty(
      "--shade-650",
      theme === "dark"
        ? themes[7][0]
        : theme === "light"
          ? themes[7][1]
          : themes[7][2],
    );
    document.documentElement.style.setProperty(
      "--shade-600",
      theme === "dark"
        ? themes[8][0]
        : theme === "light"
          ? themes[8][1]
          : themes[8][2],
    );
    document.documentElement.style.setProperty(
      "--shade-550",
      theme === "dark"
        ? themes[9][0]
        : theme === "light"
          ? themes[9][1]
          : themes[9][2],
    );
    document.documentElement.style.setProperty(
      "--shade-500",
      theme === "dark"
        ? themes[10][0]
        : theme === "light"
          ? themes[10][1]
          : themes[10][2],
    );
    document.documentElement.style.setProperty(
      "--shade-450",
      theme === "dark"
        ? themes[11][0]
        : theme === "light"
          ? themes[11][1]
          : themes[11][2],
    );
    document.documentElement.style.setProperty(
      "--shade-400",
      theme === "dark"
        ? themes[12][0]
        : theme === "light"
          ? themes[12][1]
          : themes[12][2],
    );
    document.documentElement.style.setProperty(
      "--shade-350",
      theme === "dark"
        ? themes[13][0]
        : theme === "light"
          ? themes[13][1]
          : themes[13][2],
    );
    document.documentElement.style.setProperty(
      "--shade-300",
      theme === "dark"
        ? themes[14][0]
        : theme === "light"
          ? themes[14][1]
          : themes[14][2],
    );
    document.documentElement.style.setProperty(
      "--shade-250",
      theme === "dark"
        ? themes[15][0]
        : theme === "light"
          ? themes[15][1]
          : themes[15][2],
    );
    document.documentElement.style.setProperty(
      "--shade-200",
      theme === "dark"
        ? themes[16][0]
        : theme === "light"
          ? themes[16][1]
          : themes[16][2],
    );
    document.documentElement.style.setProperty(
      "--shade-150",
      theme === "dark"
        ? themes[17][0]
        : theme === "light"
          ? themes[17][1]
          : themes[17][2],
    );
    document.documentElement.style.setProperty(
      "--shade-100",
      theme === "dark"
        ? themes[18][0]
        : theme === "light"
          ? themes[18][1]
          : themes[18][2],
    );
    document.documentElement.style.setProperty(
      "--shade-50",
      theme === "dark"
        ? themes[19][0]
        : theme === "light"
          ? themes[19][1]
          : themes[19][2],
    );
    document.documentElement.style.setProperty(
      "--screen",
      theme === "dark"
        ? themes[20][0]
        : theme === "light"
          ? themes[20][1]
          : themes[20][2],
    );
    document.documentElement.style.setProperty(
      "--accent",
      theme === "dark"
        ? themes[21][0]
        : theme === "light"
          ? themes[21][1]
          : themes[21][2],
    );
  };

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
            "Available commands: about, clear, connect, ethos, help, skills, projects, pwd, theme",
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
        } else if (currentInput.trim().startsWith("theme")) {
          setLines((prev) => [
            ...prev,
            "Available themes: dark, light, system",
          ]);
          if (currentInput.trim() === "theme dark") {
            themeChange("dark");
            setLines((prev) => [...prev, "Theme set to dark."]);
          } else if (currentInput.trim() === "theme light") {
            themeChange("light");
            setLines((prev) => [...prev, "Theme set to light."]);
          } else if (currentInput.trim() === "theme system") {
            themeChange("system");
            setLines((prev) => [...prev, "Theme set to system."]);
          }
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
            <div className="text-[var(--shade-450)]">
              Designer · developer · artist · freelancer
            </div>
            <pre>{nameBanner}</pre>
            <div className="text-[var(--shade-450)]">
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
              <span className="text-[var(--accent)] select-text">{prompt}</span>
              <div className="flex-1 relative">
                <span className="text-[var(--accent)] select-text">
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
        className="drag absolute w-12 h-1.5 rounded-full flex flex-col gap-0.5 text-[var(--shade-600)] left-[50%] -bottom-1 translate-y-[100%] translate-x-[-50%] cursor-ns-resize z-100 duration-100 transition-opacity after:content-[''] after:absolute after:h-4 after:w-[calc(100vw-250px)] after:left-[50%] after:top-[50%] after:translate-x-[-50%] after:translate-y-[-50%]"
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="w-full border-b border-b-[inherit]"></div>
        ))}
      </div>
    </div>
  );
};

export default Header;
