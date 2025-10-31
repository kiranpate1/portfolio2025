import React, { useRef, useEffect, useState } from "react";
import Projects from "./projects";
import Doodle from "./doodle";

type props = {
  scrollProgress: number;
  padding: number;
  doodleHeight: number;
};

const Nav = ({ scrollProgress, padding, doodleHeight }: props) => {
  const infoContainer = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLDivElement>(null);
  const description = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [normalizedProgress, setNormalizedProgress] = useState(0);

  useEffect(() => {
    if (
      infoContainer.current &&
      title.current &&
      description.current &&
      scrollProgress > 1.5 &&
      scrollProgress <= Projects.length + 1.5
    ) {
      for (let i = 0; i < Projects.length + 1; i++) {
        // map new scrollProgress (1 .. Projects.length) to a 0-based project index
        const clamped = Math.max(
          1,
          Math.min(scrollProgress, Projects.length + 1)
        );
        const pos = clamped - 1; // 0 .. Projects.length - 1
        const activeIndex = Math.min(
          Projects.length,
          Math.max(1, Math.round(pos))
        );
        if (i === activeIndex) {
          infoContainer.current.style.opacity = "1";
          title.current.innerText = Projects[i - 1].project;
          description.current.innerText = Projects[i - 1].description;
          setActiveIndex(i + 1);
          break;
        }
      }
    } else if (
      infoContainer.current &&
      title.current &&
      description.current &&
      (scrollProgress <= 1.5 || scrollProgress > Projects.length + 1.5)
    ) {
      infoContainer.current.style.opacity = "0";
      setActiveIndex(0);
    }

    const normalizedScrollProgress =
      scrollProgress > 2
        ? scrollProgress < Projects.length + 1
          ? (scrollProgress - 2) / (Projects.length - 1)
          : 1
        : 0;
    setNormalizedProgress(normalizedScrollProgress);

    // Update progress bars based on scrollProgress prop instead of scroll events
    const bars = document.querySelectorAll(".bar") as NodeListOf<HTMLElement>;
    const minWidth = 10; // in percentage
    const maxWidth = 100 - (Projects.length - 1) * minWidth;
    const normalizedActiveIndex = Math.floor(scrollProgress);
    const barScrollProgress = scrollProgress % 1;
    const openingWidth = barScrollProgress * maxWidth;
    const closingWidth = (1 - barScrollProgress) * maxWidth;

    bars.forEach((bar, index) => {
      if (scrollProgress > 1.5 && scrollProgress < 2) {
        const progress = (scrollProgress - 1.5) * 2;
        const firstWidth =
          (100 / Projects.length) * (1 - progress) +
          maxWidth * progress +
          minWidth * progress;
        const otherWidth =
          (100 - firstWidth) / (Projects.length - 1 - 1 * progress);
        if (index === 0) {
          bar.style.width = `${firstWidth}%`;
        } else {
          bar.style.width = `${otherWidth}%`;
        }
      } else if (scrollProgress > 2 && scrollProgress < Projects.length + 1) {
        if (index === normalizedActiveIndex - 2) {
          bar.style.width = `${closingWidth + minWidth}%`;
        } else if (index === normalizedActiveIndex - 1) {
          bar.style.width = `${openingWidth + minWidth}%`;
        } else {
          bar.style.width = `${minWidth}%`;
        }
      } else if (
        scrollProgress > Projects.length + 1 &&
        scrollProgress <= Projects.length + 1.5
      ) {
        const progress = (scrollProgress - (Projects.length + 1)) * 2;
        const lastWidth =
          (100 / Projects.length) * progress +
          maxWidth * (1 - progress) +
          minWidth * (1 - progress);
        const otherWidth =
          (100 - lastWidth) / (Projects.length - 1 - 1 * (1 - progress));
        if (index === Projects.length - 1) {
          bar.style.width = `${lastWidth}%`;
        } else {
          bar.style.width = `${otherWidth}%`;
        }
      } else {
        bar.style.width = `${100 / Projects.length}%`;
      }
    });
  }, [scrollProgress]);

  return (
    <nav className="flex flex-col justify-between align-stretch h-[calc(100vh-32px)]">
      <div className="flex flex-col gap-4">
        <Doodle height={doodleHeight} activeIndex={activeIndex} />
        <div className="relative flex items-stretch w-full h-3 p-0.5 bg-[var(--shade-850)] rounded-2xl">
          {Projects.map((project, index) => (
            <div
              key={index}
              className="bar h-full rounded-xl p-[2px]"
              style={{
                width: `${100 / Projects.length}%`,
              }}
            >
              <div
                className="h-full rounded-xl duration-700"
                style={{
                  backgroundColor:
                    scrollProgress > 1.5 &&
                    scrollProgress < Projects.length + 1.5
                      ? project.color
                      : "#656D7F",
                }}
              ></div>
            </div>
          ))}
          <div
            className="absolute w-[1.5px] h-full bg-[#8C95BD] top-0 bottom-0"
            style={{
              left:
                scrollProgress > 1.5 ? `${normalizedProgress * 100}%` : "0%",
            }}
          ></div>
        </div>
        <div className="flex flex-wrap gap-2">
          {Projects.map((project, index) => (
            <span
              key={index}
              className="text-xs px-1.5 py-1 rounded cursor-pointer bg-[#252931] hover:bg-[#323740]"
              style={{
                opacity:
                  scrollProgress > 1.5 && scrollProgress < Projects.length + 1.5
                    ? index === activeIndex - 2
                      ? 1
                      : 0.6
                    : 0.6,
              }}
            >
              {project.title}
            </span>
          ))}
        </div>
      </div>
      <div
        className="flex-col gap-2 duration-200 md:flex hidden"
        ref={infoContainer}
      >
        <h1 ref={title} className="heading-small font-medium">
          My Projects
        </h1>
        <p ref={description} className="text-sm text-[#97a4bd] text-pretty">
          Description
        </p>
        <button className="flex items-center gap-2 mt-2 px-3 py-2 bg-[#252931] rounded-lg w-max text-sm font-medium hover:bg-[#323740] cursor-pointer">
          Visit
          <svg
            width="11"
            height="11"
            className="-translate-y-[1px]"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.2207 7.60386C9.2207 8.59387 9.2207 9.08835 9.00788 9.45682C8.86848 9.69825 8.668 9.89873 8.42658 10.0381C8.0581 10.2509 7.56363 10.2509 6.57362 10.2509H3.92653C2.42934 10.2509 1.68021 10.251 1.21538 9.78559C0.750027 9.32076 0.750027 8.57164 0.750027 7.07445V4.42736C0.750027 3.43735 0.750027 2.94287 0.962853 2.5744C1.10225 2.33297 1.30273 2.13249 1.54415 1.9931C1.91263 1.78027 2.4071 1.78027 3.39711 1.78027"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
            <path
              d="M4.98616 7.0745C4.69326 7.3674 4.21839 7.3674 3.9255 7.0745C3.6326 6.78161 3.6326 6.30674 3.9255 6.01384L4.45583 6.54417L4.98616 7.0745ZM9.75 1.25V0.5H10.5V1.25H9.75ZM4.45583 6.54417L3.9255 6.01384L9.21967 0.71967L9.75 1.25L10.2803 1.78033L4.98616 7.0745L4.45583 6.54417ZM9.75 1.25H10.5V5.48534H9.75H9V1.25H9.75ZM9.75 1.25V2H5.51466V1.25V0.5H9.75V1.25Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
