import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Projects, { projectIcons } from "../../data/projects";
import Dropbox from "./dropbox";
import TorontoTechWeek from "./ttw";
import Superpower from "./superpower";
import Codepen from "./codepen";
import Art from "./art";
import Computer from "../computer";

type props = {
  index: number;
  title: string;
  src: string;
  sectionProgress?: number;
  typedText?: string;
};

const Project = ({ index, title, src, sectionProgress, typedText }: props) => {
  const projectIconOrder: Array<keyof typeof projectIcons> = [
    "Dropbox",
    "TTW",
    "Superpower",
    "Codepen",
    "DDR",
    "Art",
  ];

  useEffect(() => {
    console.log(sectionProgress);
  }, [sectionProgress]);

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsAnimating(true), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="window absolute flex flex-col items-stretch w-full z-1"
      style={{
        borderRadius: index === 3 ? "0px" : "16px",
        overflow: index === Projects.length - 1 ? "visible" : "hidden",
      }}
    >
      <div
        className="absolute inset-0 z-10 rounded-2xl bg-[var(--shade-900)] overflow-hidden pointer-events-none duration-300"
        style={{ opacity: isAnimating ? 0 : 1 }}
      >
        {projectIcons[projectIconOrder[index]] ? (
          <div
            className="absolute inset-0 flex items-center justify-center border border-[var(--shade-300)] rounded-2xl overflow-hidden duration-200"
            style={{ opacity: isAnimating ? 0 : 1 }}
          >
            {projectIcons[projectIconOrder[index]]}
          </div>
        ) : null}
        {/* <svg
          width="100%"
          height="100%"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M59.5 16.5L59.5 43.5C59.5 52.337 52.3366 59.5 43.5 59.5L16.5 59.5C7.663 59.5 0.5 52.337 0.500001 43.5L0.500002 16.5C0.500002 7.66344 7.663 0.5 16.5 0.500001L43.5 0.500002C52.3366 0.500002 59.5 7.66344 59.5 16.5Z"
            stroke="var(--shade-300)"
            vectorEffect={"non-scaling-stroke"}
          />
        </svg> */}
      </div>
      <Link
        href={Projects[index].link}
        target={Projects[index].link ? "_blank" : "_self"}
        style={{
          pointerEvents:
            sectionProgress && sectionProgress < Projects.length + 1.3
              ? "auto"
              : "none",
        }}
        className="absolute inset-0 rounded-2xl overflow-hidden"
      >
        <div className="stick absolute min-w-full md:h-[calc(100vh-48px)] h-[calc(100vh-48px-84px)]">
          {index === 0 ? (
            <Dropbox sectionProgress={sectionProgress} />
          ) : index === 1 ? (
            <TorontoTechWeek sectionProgress={sectionProgress} />
          ) : index === 2 ? (
            <Superpower sectionProgress={sectionProgress} />
          ) : index === 3 ? null : index === Projects.length - 1 ? (
            <Art sectionProgress={sectionProgress} />
          ) : (
            <Image
              className="stick absolute w-full md:h-[calc(100vh-48px)] h-[calc(100vh-48px-84px)] object-cover"
              width={1000}
              height={1000}
              src={src}
              alt={`${title} Image`}
            />
          )}
        </div>
      </Link>
      {index === Projects.length - 1 ? (
        <Computer sectionProgress={sectionProgress} typedText={typedText} />
      ) : index === 3 ? (
        <Codepen sectionProgress={sectionProgress} />
      ) : null}
    </div>
  );
};

export default Project;
