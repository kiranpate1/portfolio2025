import React from "react";
import Image from "next/image";
import Projects from "../../data/projects";
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
  return (
    <div
      className="window absolute flex flex-col items-stretch w-full z-1"
      style={{
        borderRadius: index === 3 ? "0px" : "16px",
        overflow: index === Projects.length - 1 ? "visible" : "hidden",
      }}
    >
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
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
      </div>
      {index === Projects.length - 1 ? (
        <Computer sectionProgress={sectionProgress} typedText={typedText} />
      ) : index === 3 ? (
        <Codepen sectionProgress={sectionProgress} />
      ) : null}
    </div>
  );
};

export default Project;
