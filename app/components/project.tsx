import React from "react";
import Image from "next/image";
import Projects from "./projects";
import Computer from "./computer";
import Superpower from "./superpower";
import TorontoTechWeek from "./ttw";

type props = {
  index: number;
  title: string;
  padding: number;
  src: string;
  sectionProgress?: number;
};

const Project = ({ index, title, padding, src, sectionProgress }: props) => {
  return (
    <div className="window absolute flex flex-col items-stretch w-full rounded-2xl overflow-hidden z-1">
      {index === 0 ? null : index === 2 ? (
        <TorontoTechWeek sectionProgress={sectionProgress} />
      ) : null}
      <Image
        className="stick absolute w-full"
        style={{
          minHeight: `calc(100vh - ${padding * 2}px)`,
          maxHeight: `calc(100vh - ${padding * 2}px)`,
          objectFit: title == "Codepen" ? "contain" : "cover",
        }}
        width={1000}
        height={1000}
        src={src}
        alt={`${title} Image`}
      />
      <Image
        className="stick filter absolute w-full rounded-2xl overflow-hidden mix-blend-plus-lighter blur-xl"
        style={{
          minHeight: `calc(100vh - ${padding * 2}px)`,
          maxHeight: `calc(100vh - ${padding * 2}px)`,
          objectFit: title == "Codepen" ? "contain" : "cover",
        }}
        width={1000}
        height={1000}
        src={src}
        alt="Filter Image"
      />
      {/* <div className="gradient-blur top inset-[0_0_auto_0] absolute min-h-20 max-h-20 min-w-full">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="gradient-blur bottom inset-[auto_0_0_0] absolute min-h-20 max-h-20 min-w-full">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div> */}
      {index === Projects.length - 1 ? (
        <div
          className="bg-shade absolute inset-0 z-1 opacity-0 p-12"
          style={{
            backgroundColor:
              index === 0 ? "var(--shade-900)" : "var(--shade-950)",
          }}
        ></div>
      ) : index === 1 ? (
        <Superpower sectionProgress={sectionProgress} />
      ) : null}
    </div>
  );
};

export default Project;
