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
  const [scrollPos, setScrollPos] = useState(0);

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
      setScrollPos(scrollProgress);

      const windowCount = windows.length;
      const sectionProgress = scrollProgress * (windowCount - 1);
      const sectionOne = Math.floor(sectionProgress);
      const sectionTwo = sectionOne + 1;

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
          windowOne.style.height = `calc(${100 - adjustedProgress * 100}% - ${
            padding * adjustedProgress
          }px)`;
          filterOne.style.opacity = `${adjustedProgress}`;
          // filterOne.style.filter = `blur(20px) brightness(${1 + adjustedProgress})`
        }

        if (sectionTwo < windowCount) {
          const windowTwo = windows[sectionTwo];
          const filterTwo = windowTwo.querySelector(".filter") as HTMLElement;
          windowTwo.style.height = `calc(${adjustedProgress * 100}% - ${
            padding - adjustedProgress * padding
          }px)`;
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
        <Nav scrollPos={scrollPos} padding={padding} />
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
