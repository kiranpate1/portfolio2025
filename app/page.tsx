"use client";

import React, { useRef, useEffect, useState } from "react";
import Nav from "./components/nav";
import Projects from "./components/projects";
import Project from "./components/project";
import Lenis from "lenis";

export default function Home() {
  const padding = 16;
  const scrollWindow = useRef<HTMLDivElement>(null);
  const main = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });

    const windows = document.querySelectorAll(
      ".window"
    ) as NodeListOf<HTMLElement>;
    const main = document.querySelector("main");
    if (main) {
      main.style.minHeight = `${windows.length * 100}vh`;
    }
    let ticking = false;

    function updateWindows() {
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
        const firstWeight = 250 / vh; // 250px relative to 100vh
        const otherWeight = 1; // represents 100vh
        const weights: number[] = [
          firstWeight,
          ...Array(Math.max(segments - 1, 0)).fill(otherWeight),
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

        sectionProgress = Math.min(Math.max(sectionProgress, 0), segments);
      }
      const sectionOne = Math.floor(sectionProgress);
      const sectionTwo = sectionOne + 1;
      setScrollProgress(sectionProgress);

      if (sectionOne >= 0 && sectionOne < windowCount) {
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
          if (sectionOne == 0) {
            windowOne.style.height = `calc(160px - ${
              padding * adjustedProgress
            }px - ${adjustedProgress * 160}px)`;
            windowOne.style.filter = `brightness(1)`;
          } else {
            windowOne.style.height = `calc(${100 - adjustedProgress * 100}% - ${
              padding * adjustedProgress
            }px)`;
            windowOne.style.filter = `brightness(1)`;
          }
          filterOne.style.opacity = `${adjustedProgress}`;
          // filterOne.style.filter = `blur(20px) brightness(${1 + adjustedProgress})`
        }

        if (sectionTwo < windowCount) {
          const windowTwo = windows[sectionTwo];
          const filterTwo = windowTwo.querySelector(".filter") as HTMLElement;
          if (sectionTwo == 1) {
            windowTwo.style.height = `calc(100% - ${
              padding - adjustedProgress * padding
            }px - ${160 - adjustedProgress * 160}px)`;
            windowTwo.style.filter = `brightness(1)`;
          } else {
            windowTwo.style.height = `calc(${adjustedProgress * 100}% - ${
              padding - adjustedProgress * padding
            }px)`;
            windowTwo.style.filter = `brightness(1)`;
          }
          filterTwo.style.opacity = `${1 - adjustedProgress}`;
          // filterTwo.style.filter = `blur(20px) brightness(${2 - adjustedProgress})`
        }
      }

      ticking = false;
    }
    updateWindows();

    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateWindows);
        ticking = true;
      }
    }

    window.addEventListener("scroll", requestTick, { passive: true });

    return () => {
      window.removeEventListener("scroll", requestTick);
    };
  }, [padding, scrollWindow, main]);

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
        <Nav scrollProgress={scrollProgress} padding={padding} />
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
        <div className="window window absolute flex flex-col items-stretch w-full rounded-2xl overflow-hidden h-40 bg-[#323740]">
          <div className="w-full h-full relative flex items-center justify-center text-3xl font-medium">
            <h1>kiranpa.tel</h1>
          </div>
          <div className="filter absolute w-full rounded-2xl overflow-hidden mix-blend-plus-lighter blur-xl h-full"></div>
        </div>
        {Projects.map((project, index) => (
          <Project
            key={index}
            padding={padding}
            title={project.title}
            src={project.src}
          />
        ))}
      </div>
    </main>
  );
}
