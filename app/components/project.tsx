import React from "react";
import Image from "next/image";
import Projects from "./projects";
import Dropbox from "./dropbox";
import Superpower from "./superpower";
import TorontoTechWeek from "./ttw";
import Art from "./art";
import FooterDesktop from "./computer";

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
      <div className="stick absolute min-w-full md:h-[calc(100vh-32px)] h-[calc(100dvh-48px-84px)]">
        {index === 0 ? (
          <Dropbox sectionProgress={sectionProgress} />
        ) : index === 1 ? (
          <TorontoTechWeek sectionProgress={sectionProgress} />
        ) : index === 2 ? (
          <Superpower sectionProgress={sectionProgress} />
        ) : index === Projects.length - 1 ? (
          <Art sectionProgress={sectionProgress} />
        ) : (
          <Image
            className="stick absolute w-full md:h-[calc(100vh-32px)] h-[calc(100dvh-48px-84px)] object-cover"
            width={1000}
            height={1000}
            src={src}
            alt={`${title} Image`}
          />
        )}
      </div>
      {/* <div className="gradient-blur top inset-[0_0_auto_0] absolute min-h-20 max-h-20 min-w-full">
        <div></div>
        <div></div>
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
        <div></div>
        <div></div>
      </div> */}
      {index === Projects.length - 1 ? (
        <FooterDesktop sectionProgress={sectionProgress} />
      ) : null}
    </div>
  );
};

export default Project;
