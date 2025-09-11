import React, { useRef, useEffect, useState } from "react";
import Projects from "./projects";
import Doodle from "./doodle";

type props = {
  scrollProgress: number;
  padding: number;
  doodleHeight: number;
};

const Nav = ({ scrollProgress, padding, doodleHeight }: props) => {
  const title = useRef<HTMLDivElement>(null);
  const description = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [normalizedProgress, setNormalizedProgress] = useState(0);
  const [weights, setWeights] = useState<number[]>([]);

  useEffect(() => {
    if (title.current && description.current && scrollProgress > 1) {
      for (let i = 0; i < Projects.length; i++) {
        // map new scrollProgress (1 .. Projects.length) to a 0-based project index
        const clamped = Math.max(1, Math.min(scrollProgress, Projects.length));
        const pos = clamped - 1; // 0 .. Projects.length - 1
        const activeIndex = Math.min(
          Projects.length - 1,
          Math.max(0, Math.round(pos))
        );
        if (i === activeIndex) {
          title.current.innerText = Projects[i].project;
          description.current.innerText = Projects[i].description;
          setActiveIndex(i + 1);
          break;
        }
      }
    } else if (title.current && description.current && scrollProgress <= 1) {
      title.current.innerText = "";
      description.current.innerText = "";
      setActiveIndex(0);
    }

    const normalizedScrollProgress =
      scrollProgress > 1 ? (scrollProgress - 1) / (Projects.length - 1) : 0;
    setNormalizedProgress(normalizedScrollProgress);

    setWeights(generateNumbers(normalizedScrollProgress, 40).finalWeights);
    const bars = document.querySelectorAll(".bar") as NodeListOf<HTMLElement>;

    window.addEventListener("scroll", () => {
      bars.forEach((bar, index) => {
        if (scrollProgress > 1) {
          bar.style.width = `${weights[index]}%`;
        } else {
          bar.style.width = `${100 / Projects.length}%`;
        }
        bar.style.transition = "width 0.1s ease-in-out";
      });
    });

    function generateNumbers(percentage: number, maxWeight: number) {
      const totalSum = 100; // The target total sum
      const numberOfElements = Projects.length; // Total elements in the array
      const midPoint = percentage * (numberOfElements - 1); // The "center" based on the percentage

      // Calculate preliminary weights based on proximity to the midpoint
      const rawWeights = Array.from({ length: numberOfElements }, (_, i) => {
        const distance = Math.abs(i - midPoint);
        return 1 / (distance + 1); // Closer indices have higher weights
      });

      // Normalize preliminary weights to get their relative contributions
      const rawWeightSum = rawWeights.reduce((sum, weight) => sum + weight, 0);
      const normalizedWeights = rawWeights.map(
        (weight) => weight / rawWeightSum
      );

      // Apply the max weight constraint
      const scaledWeights = normalizedWeights.map((weight) =>
        Math.min(weight * totalSum, maxWeight)
      );
      const scaledWeightSum = scaledWeights.reduce(
        (sum, weight) => sum + weight,
        0
      );

      // Redistribute excess/remaining weight proportionally
      const redistributionFactor =
        (totalSum - scaledWeightSum) / scaledWeightSum;
      const finalWeights = scaledWeights.map(
        (weight) => weight + weight * redistributionFactor
      );

      const maxWeightIndex = scaledWeights.indexOf(Math.max(...scaledWeights));

      return { finalWeights, maxWeightIndex };
    }

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, [scrollProgress]);

  return (
    <nav
      className="flex flex-col justify-between align-stretch"
      style={{
        minHeight: `calc(100vh - ${padding * 2}px)`,
        maxHeight: `calc(100vh - ${padding * 2}px)`,
      }}
    >
      <div className="flex flex-col gap-4">
        <Doodle height={doodleHeight} activeIndex={activeIndex} />
        <div className="relative flex items-stretch w-full h-3 p-0.5 bg-[#252931] rounded-2xl">
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
                    scrollProgress > 1 ? project.color : "#656D7F",
                }}
              ></div>
            </div>
          ))}
          <div
            className="absolute w-[1.5px] h-full bg-[#8C95BD] top-0 bottom-0"
            style={{
              left: scrollProgress > 1 ? `${normalizedProgress * 100}%` : "0%",
            }}
          ></div>
        </div>
        <div className="flex flex-wrap gap-2">
          {Projects.map((project, index) => (
            <span
              key={index}
              className="text-xs px-1.5 py-1 rounded cursor-pointer bg-[#252931] hover:opacity-100"
              style={{
                opacity:
                  scrollProgress > 1
                    ? index === activeIndex + 1
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
      <div className="flex flex-col gap-2">
        <h1 ref={title} className="text-lg font-medium">
          My Projects
        </h1>
        <p ref={description} className="text-sm text-[#97a4bd] text-pretty">
          Description
        </p>
        <button className="flex items-center gap-2 mt-4 px-3 py-2 bg-[#252931] rounded-full w-max text-sm font-medium hover:bg-[#323740] cursor-pointer">
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
