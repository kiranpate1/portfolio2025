"use client";

import React, {
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
import Nav from "./components/nav";
import Header from "./components/header";
import Projects from "./data/projects";
import Project from "./components/projects/project";
import Footer from "./components/projects/footer";
import Lenis from "lenis";
import OpeningDesktop from "./components/openingDesktop";

export default function Home() {
  const padding = 16;
  const originalDoodleHeight = 180;
  const [doodleHeight, setDoodleHeight] = useState(originalDoodleHeight);
  const dragStartHeightRef = useRef(originalDoodleHeight);
  const posRef = useRef({ top: 0, left: 0, x: 0, y: 0 });
  const [footerHeight, setFooterHeight] = useState(0);
  const isDraggingRef = useRef(false);
  const scrollWindow = useRef<HTMLDivElement>(null);
  const main = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const projectTitleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const openingDesktopRef = useRef<HTMLDivElement | null>(null);
  const windowsRef = useRef<HTMLDivElement | null>(null);
  const doodlePathRef = useRef<SVGGeometryElement | null>(null);
  const headerPathRef = useRef<SVGGeometryElement | null>(null);
  const openingDesktopPathRef = useRef<SVGGeometryElement | null>(null);
  const introCompleteRef = useRef(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollProgressRef = useRef(0);
  const targetProjectIndexRef = useRef<number | null>(null);
  const [typedText, setTypedText] = useState("");
  const estimatedWindowCount = Projects.length + 3;

  const handleKeyboardInput = useCallback((key: string) => {
    if (key === "Backspace") {
      setTypedText((prev) => prev.slice(0, -1));
    } else if (key === "Enter") {
      setTypedText((prev) => prev + "\n");
    } else if (key.length === 1) {
      setTypedText((prev) => prev + key);
    }
  }, []);

  const scrollToProject = useCallback(
    (index: number) => {
      const vh = window.innerHeight;
      const firstWeight = doodleHeight / vh;
      const lastWeight = footerHeight / vh;
      const segments = Projects.length + 2;
      const weights = [firstWeight, ...Array(segments - 2).fill(1), lastWeight];
      const totalWeight = weights.reduce((a: number, b: number) => a + b, 0);
      // Project i is window i+2; sectionProgress=i+2 means it's fully in view
      // scaled = sum of weights[0..i+1]
      let scaled = 0;
      for (let w = 0; w <= index + 1; w++) scaled += weights[w];
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({
        top: (scaled / totalWeight) * maxScroll,
        behavior: "smooth",
      });
    },
    [doodleHeight, footerHeight],
  );

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
    // If scroll position has drifted far from the tracked target (manual scroll),
    // clear the target so the next keypress re-derives from actual position.
    if (targetProjectIndexRef.current !== null) {
      const scrollIndex = Math.round(scrollProgress - 2);
      if (Math.abs(targetProjectIndexRef.current - scrollIndex) > 1) {
        targetProjectIndexRef.current = null;
      }
    }
  }, [scrollProgress]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      e.preventDefault();
      // Initialize from scroll if no target is tracked yet (e.g. after manual scroll)
      if (targetProjectIndexRef.current === null) {
        targetProjectIndexRef.current = Math.max(
          Math.round(scrollProgressRef.current - 2),
          0,
        );
      }
      if (e.key === "ArrowDown") {
        const next = Math.min(
          targetProjectIndexRef.current + 1,
          Projects.length - 1,
        );
        targetProjectIndexRef.current = next;
        scrollToProject(next);
      } else {
        const prev = Math.max(targetProjectIndexRef.current - 1, 0);
        targetProjectIndexRef.current = prev;
        scrollToProject(prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scrollToProject]);

  useEffect(() => {
    const windows = document.querySelectorAll(
      ".window",
    ) as NodeListOf<HTMLElement>;
    let ticking = false;
    let lastFrameTime = 0;

    function updateWindows() {
      const now = performance.now();

      // Light throttling only to prevent excessive calls, maintain 60fps
      if (now - lastFrameTime < 8) {
        ticking = false;
        return;
      }
      lastFrameTime = now;

      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(scrollTop / maxScroll, 1);

      const windowCount = windows.length;
      // allocate less scroll space to the first transition so it happens "faster"
      const segments = Math.max(windowCount - 1, 0);
      let sectionProgress = 0;
      if (segments <= 0) {
        sectionProgress = 0;
      } else {
        const vh = Math.max(window.innerHeight, 1);
        const firstWeight = doodleHeight / vh; // doodleHeight relative to 100vh
        const otherWeight = 1; // represents 100vh
        const lastWeight = footerHeight / vh; // footerHeight relative to 100vh
        const weights: number[] = [
          firstWeight,
          ...Array(Math.max(segments - 2, 0)).fill(otherWeight),
          lastWeight,
        ];
        const totalWeight = weights.reduce((a, b) => a + b, 0);
        const scaled = Math.min(Math.max(scrollProgress, 0), 1) * totalWeight;

        let acc = 0;
        for (let i = 0; i < weights.length; i++) {
          const w = weights[i];
          if (scaled >= acc + w) {
            acc += w;
            continue;
          }
          const within = (scaled - acc) / w;
          sectionProgress = i + within;
          break;
        }

        // If scaled reaches or exceeds the total weight (bottom of page),
        // ensure we set sectionProgress to the final segment instead of leaving it at 0.
        if (scaled >= totalWeight) {
          sectionProgress = segments;
        }

        sectionProgress = Math.min(
          Math.max(sectionProgress, 0),
          segments - 0.01,
        );
      }
      const sectionOne = Math.floor(sectionProgress);
      const sectionTwo = sectionOne + 1;
      setScrollProgress((prev) => {
        // Update React state more frequently for smooth component updates
        if (Math.abs(prev - sectionProgress) < 0.001) return prev;
        return sectionProgress;
      });

      if (sectionOne >= 0 && sectionOne < windowCount - 1) {
        for (let i = 0; i < windowCount; i++) {
          if (i < sectionOne || i > sectionTwo) {
            windows[i].style.height = `0px`;
          } else if (i <= sectionOne) {
            windows[i].classList.add("scrollout");
            windows[i].classList.remove("scrollin");
          } else if (i >= sectionTwo) {
            windows[i].classList.add("scrollin");
            windows[i].classList.remove("scrollout");
          }
        }

        const adjustedProgress = sectionProgress % 1;

        if (sectionOne >= 0) {
          const windowOne = windows[sectionOne];
          // const shade = document.querySelector(".bg-shade") as HTMLElement;
          if (sectionOne == 0) {
            if (introCompleteRef.current) {
              windowOne.style.height = `calc(${doodleHeight}px - ${
                padding * adjustedProgress
              }px - ${adjustedProgress * doodleHeight}px)`;
              windowOne.style.filter = `brightness(1)`;
            }
          } else if (sectionOne == windowCount - 2) {
            windowOne.style.height = `calc(100% - ${
              adjustedProgress * footerHeight
            }px)`;
            // shade.style.opacity = `${adjustedProgress * 2}`;
          } else {
            windowOne.style.height = `calc(${100 - adjustedProgress * 100}% - ${
              padding * adjustedProgress
            }px)`;
            windowOne.style.filter = `brightness(1)`;
          }
        }

        if (sectionTwo < windowCount) {
          const windowTwo = windows[sectionTwo];
          if (sectionTwo == 1) {
            if (introCompleteRef.current) {
              windowTwo.style.height = `calc(100% - ${
                padding - adjustedProgress * padding
              }px - ${doodleHeight - adjustedProgress * doodleHeight}px)`;
            }
          } else if (sectionTwo == windowCount - 1) {
            // Transitioning into last section - grow to footer height
            windowTwo.style.height = `calc(${
              adjustedProgress * footerHeight
            }px)`;
            windowTwo.style.filter = `brightness(1)`;
          } else {
            windowTwo.style.height = `calc(${adjustedProgress * 100}% - ${
              padding - adjustedProgress * padding
            }px)`;
            windowTwo.style.filter = `brightness(1)`;
          }
        }
      }

      ticking = false;
    }
    updateWindows();

    function requestTick() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateWindows);
      }
    }

    const lenis = new Lenis({
      autoRaf: true,
    });

    // Start scroll system immediately
    window.addEventListener("scroll", requestTick, { passive: true });
    lenis.on("scroll", requestTick);
    requestTick();

    const drag = document.querySelector(".drag") as HTMLElement;

    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      posRef.current = {
        left: drag.scrollLeft,
        top: drag.scrollTop,
        x: e.clientX,
        y: e.clientY,
      };
      dragStartHeightRef.current = doodleHeight;
      drag.style.color = "var(--shade-300)";
      document.body.style.userSelect = "none";
      document.body.style.cursor = "ns-resize";
      e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaY = e.clientY - posRef.current.y;
      if (
        dragStartHeightRef.current + deltaY > 100 &&
        dragStartHeightRef.current + deltaY < window.innerHeight - 100 - padding
      ) {
        setDoodleHeight(dragStartHeightRef.current + deltaY);
      }
      e.preventDefault();
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      drag.style.color = "var(--shade-600)";
      document.body.style.userSelect = "auto";
      document.body.style.cursor = "auto";
    };

    if (drag) {
      drag.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    window.addEventListener("resize", handleFooterResize);
    handleFooterResize();

    function handleFooterResize() {
      setFooterHeight(window.innerHeight / 2 - 32);
      requestTick();
    }

    return () => {
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", handleFooterResize);

      // Clean up lenis
      if (
        lenis &&
        typeof (lenis as { destroy?: () => void }).destroy === "function"
      ) {
        (lenis as { destroy: () => void }).destroy();
      }

      if (drag) {
        drag.removeEventListener("mousedown", handleMouseDown);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, [doodleHeight, footerHeight]);

  useLayoutEffect(() => {
    const isDesktop = window.innerWidth >= 768;

    // if (!isDesktop) return;

    const mr = main.current;
    const nr = navRef.current;
    const projectTitleEls = projectTitleRefs.current;
    const tr = terminalRef.current;
    const sw = scrollWindow.current;
    const od = openingDesktopRef.current;
    const wr = windowsRef.current;
    const dp = doodlePathRef.current;
    const hp = headerPathRef.current;
    const op = openingDesktopPathRef.current;
    // Reveal synchronously before first browser paint — prevents hydration flash
    if (sw) sw.style.visibility = "visible";
    // Set up stroke-draw animation start state before first paint
    if (dp) {
      const length = dp.getTotalLength();
      dp.style.strokeDasharray = `${length}`;
      dp.style.strokeDashoffset = `${length}`;
      requestAnimationFrame(() => {
        dp.style.transition = "stroke-dashoffset 1s ease";
        dp.style.strokeDashoffset = "0";
      });
    }
    const hpTimer = setTimeout(() => {
      if (hp) {
        const length = hp.getTotalLength();
        hp.style.strokeDasharray = `${length}`;
        hp.style.strokeDashoffset = `${length}`;
        requestAnimationFrame(() => {
          hp.style.transition = "stroke-dashoffset 0.5s ease";
          hp.style.strokeDashoffset = "0";
        });
      }
    }, 150);
    const opTimer = setTimeout(() => {
      if (op) {
        const length = op.getTotalLength();
        op.style.strokeDasharray = `${length}`;
        op.style.strokeDashoffset = `${length}`;
        requestAnimationFrame(() => {
          op.style.transition = "stroke-dashoffset 0.5s ease";
          op.style.strokeDashoffset = "0";
        });
      }
    }, 250);
    const animTimer = setTimeout(() => {
      if (mr) {
        mr.style.transition = "width 1s ease";
        mr.style.width = "100%";
      }
      if (nr) {
        nr.style.transition = "transform 1s ease";
        nr.style.transform = "translate(0,0)";
      }
      projectTitleEls.forEach((projectTitleEl) => {
        if (!projectTitleEl) return;
        projectTitleEl.style.width = "24px";
        void projectTitleEl.offsetWidth;
        projectTitleEl.style.transition = "width 1s ease";
        projectTitleEl.style.width = `${projectTitleEl.scrollWidth}px`;
      });
      if (tr) {
        tr.style.transition = "height 1s ease";
        tr.style.height = `${originalDoodleHeight}px`;
        tr.style.overflow = "visible";
      }
      if (sw) {
        sw.style.transition =
          "height 1s ease, width 1s ease, transform 1s ease";
        sw.style.height = "calc(100vh - 48px)";
        sw.style.width = isDesktop
          ? "calc(100% - 250px - 48px)"
          : "calc(100vw - 32px)";
        sw.style.transform = "translate(0,0)";
        sw.style.overflow = "visible";
      }
      if (od) {
        od.style.transition = "height 1s ease";
        od.style.height = "calc(100% - 196px)";
        od.style.overflow = "visible";
      }
      if (wr) {
        wr.style.height = "calc(100% + 0vh)";
        void wr.offsetHeight; // force reflow so browser registers the start value
        wr.style.transition = "height 1s ease";
        wr.style.height = "calc(100% + 20vh)";
      }
    }, 1000);
    const doneTimer = setTimeout(() => {
      introCompleteRef.current = true;
      if (mr) {
        mr.style.transition = "";
        mr.style.width = "auto";
      }
      if (nr) {
        nr.style.transition = "";
        nr.style.transform = "translate(0,0)";
      }
      projectTitleRefs.current.forEach((projectTitleEl) => {
        if (!projectTitleEl) return;
        projectTitleEl.style.transition = "";
        projectTitleEl.style.width = "";
      });
      if (terminalRef.current) {
        terminalRef.current.style.transition = "";
        terminalRef.current.style.overflow = "";
      }
      if (scrollWindow.current) {
        scrollWindow.current.style.transition = "";
        scrollWindow.current.style.height = "";
        scrollWindow.current.style.width = "";
        scrollWindow.current.style.transform = "translate(0,0)";
        scrollWindow.current.style.overflow = "";
      }
      if (openingDesktopRef.current) {
        openingDesktopRef.current.style.transition = "";
        openingDesktopRef.current.style.overflow = "";
      }
      if (windowsRef.current) {
        windowsRef.current.style.transition = "";
      }
      if (doodlePathRef.current) {
        doodlePathRef.current.style.transition = "";
      }
      if (headerPathRef.current) {
        headerPathRef.current.style.transition = "";
        headerPathRef.current.style.strokeDasharray = "";
        headerPathRef.current.style.strokeDashoffset = "";
      }
      if (openingDesktopPathRef.current) {
        openingDesktopPathRef.current.style.transition = "";
        openingDesktopPathRef.current.style.strokeDasharray = "";
        openingDesktopPathRef.current.style.strokeDashoffset = "";
      }
    }, 2000);
    return () => {
      clearTimeout(hpTimer);
      clearTimeout(opTimer);
      clearTimeout(animTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <main
      ref={main}
      className="w-[calc(250px_+_96px)]"
      style={{
        // width: "calc(250px + 96px)",
        minHeight: `${estimatedWindowCount * 100}vh`,
      }}
    >
      <div
        ref={navRef}
        // style={{
        //   transform:
        //     "translate(calc(50vw - (250px + 96px) / 2), calc(50vh - (250px + 96px) / 2))",
        // }}
        className="fixed top-4 left-4 z-2 md:w-[250px] w-[calc(100vw-32px)] md:h-[calc(100vh-32px)] h-21 md:transform-[translate(calc(50vw_-_(250px_+_96px)_/_2),_calc(50vh_-_(250px_+_96px)_/_2))]"
      >
        <Nav
          scrollProgress={scrollProgress}
          padding={padding}
          doodleHeight={originalDoodleHeight}
          projectTitleRefsProp={projectTitleRefs}
          doodlePathRefProp={doodlePathRef}
          onProjectClick={scrollToProject}
        />
      </div>
      <div
        ref={scrollWindow}
        className="fixed top-[116px] md:top-4 bottom-auto md:bottom-auto left-4 md:left-[282px] z-1 md:w-[calc(100%-250px-48px)] w-[calc(100vw-32px)] md:h-[calc(100vh-48px)] h-[calc(100vh-48px-84px)] transform-[translate(calc(50vw_-_45px),calc(50vh_-_175px))] md:transform-[translate(calc(50vw_-_(250px_+_96px)_/_2),_calc(50vh_-_(250px_+_96px)_/_2))]"
        style={{
          width: "60px",
          height: "136px",
          // transform:
          //   "translate(calc(50vw - (250px + 96px) / 2), calc(50vh - (250px + 96px) / 2))",
          overflow: "hidden",
          visibility: "hidden",
        }}
      >
        <Header
          ref={terminalRef}
          height={doodleHeight}
          scrollProgress={scrollProgress}
          pathRef={headerPathRef}
        />
        <OpeningDesktop
          ref={openingDesktopRef}
          windowsRefProp={windowsRef}
          sectionProgress={scrollProgress}
          pathRef={openingDesktopPathRef}
        />
        {Projects.map((project, index) => (
          <Project
            key={index}
            index={index}
            title={project.title}
            src={project.src}
            sectionProgress={scrollProgress}
            typedText={typedText}
          />
        ))}
        <Footer
          height={footerHeight}
          sectionProgress={scrollProgress}
          onKeyboardInput={handleKeyboardInput}
        />
      </div>
    </main>
  );
}
