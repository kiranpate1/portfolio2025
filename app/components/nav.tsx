import React, { useRef, useEffect, useState } from "react";
import Projects from "./projects";

type props = {
  scrollPos: number;
  padding: number;
};

const Nav = ({ scrollPos, padding }: props) => {
  const title = useRef<HTMLDivElement>(null);
  const description = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (title.current && description.current) {
      for (let i = 0; i < Projects.length; i++) {
        const adjScrollPos = scrollPos + 1 / ((Projects.length - 1) * 2);
        const activeIndex = Math.floor(adjScrollPos * (Projects.length - 1));
        if (i === activeIndex) {
          title.current.innerText = Projects[i].project;
          description.current.innerText = Projects[i].description;
          setActiveIndex(i);
          break;
        }
      }
    }
  }, [scrollPos]);

  return (
    <nav
      className="flex flex-col justify-between align-stretch"
      style={{
        minHeight: `calc(100vh - ${padding * 2}px)`,
        maxHeight: `calc(100vh - ${padding * 2}px)`,
      }}
    >
      <div className="flex flex-col gap-4">
        <div className="relative flex gap-[3px] items-stretch w-full h-4 p-1 bg-[#222] rounded-2xl">
          {Projects.map((project, index) => (
            <div
              key={index}
              className="flex-1 h-full rounded-xl"
              style={{ backgroundColor: project.color }}
            ></div>
          ))}
          <div
            className="absolute w-[1px] h-full bg-white top-0 bottom-0"
            style={{ left: `${scrollPos * 100}%` }}
          ></div>
        </div>
        <div className="flex flex-wrap gap-2">
          {Projects.map((project, index) => (
            <span
              key={index}
              className="text-xs px-1.5 py-1 rounded cursor-pointer bg-[#222] hover:opacity-100"
              style={{
                opacity: index === activeIndex ? 1 : 0.6,
              }}
            >
              {project.title}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h1 ref={title} className="text-lg font-medium">
          My Projects
        </h1>
        <p
          ref={description}
          className="text-sm text-[rgba(255,255,255,0.6)] text-pretty"
        >
          Description
        </p>
        <button className="flex items-center gap-2 mt-4 px-3 py-2 bg-[#222] text-white rounded-full w-max text-sm font-medium hover:bg-[#333] cursor-pointer">
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
              stroke="white"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
            <path
              d="M4.98616 7.0745C4.69326 7.3674 4.21839 7.3674 3.9255 7.0745C3.6326 6.78161 3.6326 6.30674 3.9255 6.01384L4.45583 6.54417L4.98616 7.0745ZM9.75 1.25V0.5H10.5V1.25H9.75ZM4.45583 6.54417L3.9255 6.01384L9.21967 0.71967L9.75 1.25L10.2803 1.78033L4.98616 7.0745L4.45583 6.54417ZM9.75 1.25H10.5V5.48534H9.75H9V1.25H9.75ZM9.75 1.25V2H5.51466V1.25V0.5H9.75V1.25Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
