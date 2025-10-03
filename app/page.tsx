"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Nav from "./components/nav";
import Header from "./components/header";
import Projects from "./components/projects";
import Project from "./components/project";
import Footer from "./components/footer";
import Lenis from "lenis";
import Computer from "./components/computer";

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
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const windows = document.querySelectorAll(
      ".window"
    ) as NodeListOf<HTMLElement>;
    const main = document.querySelector("main");
    if (main) {
      main.style.minHeight = `${windows.length * 100}vh`;
    }
    let ticking = false;
    let lastFrameTime = 0;

    function updateWindows() {
      const now = performance.now();

      // Throttle to 60fps (16.67ms between frames)
      if (now - lastFrameTime < 16.67) {
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
          segments - 0.01
        );
      }
      const sectionOne = Math.floor(sectionProgress);
      const sectionTwo = sectionOne + 1;
      setScrollProgress((prev) => {
        // only update state if the value changed significantly to avoid excessive re-renders
        if (Math.abs(prev - sectionProgress) < 0.01) return prev;
        return sectionProgress;
      });

      if (sectionOne >= 0 && sectionOne < windowCount - 1) {
        for (let i = 0; i < windowCount; i++) {
          const filter = windows[i].querySelector(".filter") as HTMLElement;
          if (i < sectionOne || i > sectionTwo) {
            windows[i].style.height = `0px`;
            if (filter) {
              filter.style.opacity = `0`;
            }
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
          const filterOne = windowOne.querySelector(".filter") as HTMLElement;
          const shade = document.querySelector(".bg-shade") as HTMLElement;
          if (sectionOne == 0) {
            windowOne.style.height = `calc(${doodleHeight}px - ${
              padding * adjustedProgress
            }px - ${adjustedProgress * doodleHeight}px)`;
            windowOne.style.filter = `brightness(1)`;
          } else if (sectionOne == windowCount - 2) {
            windowOne.style.height = `calc(100% - ${
              adjustedProgress * footerHeight
            }px)`;
            shade.style.opacity = `${adjustedProgress * 2}`;
          } else {
            windowOne.style.height = `calc(${100 - adjustedProgress * 100}% - ${
              padding * adjustedProgress
            }px)`;
            windowOne.style.filter = `brightness(1)`;
            filterOne.style.opacity = `${adjustedProgress}`;
            filterOne.style.filter = `blur(20px) brightness(${
              1 + adjustedProgress
            })`;
          }
        }

        if (sectionTwo < windowCount) {
          const windowTwo = windows[sectionTwo];
          const filterTwo = windowTwo.querySelector(".filter") as HTMLElement;
          const mainItems = windowTwo.querySelector(
            ".main-items"
          ) as HTMLElement;
          if (sectionTwo == 1) {
            windowTwo.style.height = `calc(100% - ${
              padding - adjustedProgress * padding
            }px - ${doodleHeight - adjustedProgress * doodleHeight}px)`;
            filterTwo.style.opacity = `${1 - adjustedProgress}`;
            // mainItems.style.opacity = `${-1 + adjustedProgress * 2.5}`;
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
            filterTwo.style.opacity = `${1 - adjustedProgress}`;
            filterTwo.style.filter = `blur(20px) brightness(${
              2 - adjustedProgress
            })`;
            // mainItems.style.opacity = `1`;
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

    // Use passive scroll listener for better performance
    window.addEventListener("scroll", requestTick, { passive: true });

    const lenis = new Lenis({
      autoRaf: true,
    });

    // Use requestTick instead of calling updateWindows directly
    lenis.on("scroll", requestTick);

    // initial call to set correct heights
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
      drag.style.backgroundColor = "#4b525f";
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
      drag.style.backgroundColor = "#323740";
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
      setFooterHeight(((window.innerWidth - 150) * 647) / 1432);
      if (window.innerWidth >= 1470) {
        setFooterHeight((1290 * 647) / 1432);
      }
      requestTick();
    }

    return () => {
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", handleFooterResize);

      // Clean up lenis
      if (lenis && typeof (lenis as any).destroy === "function") {
        (lenis as any).destroy();
      }

      if (drag) {
        drag.removeEventListener("mousedown", handleMouseDown);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, [doodleHeight, footerHeight]);
  return (
    <main ref={main}>
      <div
        className="fixed w-[250px]"
        style={{
          top: `${padding}px`,
          left: `${padding}px`,
          height: `calc(100vh - ${padding * 2}px)`,
        }}
      >
        <Nav
          scrollProgress={scrollProgress}
          padding={padding}
          doodleHeight={originalDoodleHeight}
        />
      </div>
      <div
        ref={scrollWindow}
        className="fixed overflow-hidden"
        style={{
          top: `${padding}px`,
          right: `${padding}px`,
          width: `calc(100% - 250px - ${padding * 3}px)`,
          height: `calc(100vh - ${padding * 2}px)`,
        }}
      >
        <Header height={doodleHeight} />
        <Computer sectionProgress={scrollProgress} />
        {Projects.map((project, index) => (
          <Project
            key={index}
            index={index}
            padding={padding}
            title={project.title}
            src={project.src}
            sectionProgress={scrollProgress}
          />
        ))}
        <Footer height={footerHeight} sectionProgress={scrollProgress} />
      </div>
    </main>
  );
}
