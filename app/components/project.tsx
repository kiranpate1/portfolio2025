import React from "react";
import Image from "next/image";
import Projects from "./projects";

type props = {
  index: number;
  title: string;
  padding: number;
  src: string;
};

const Project = ({ index, title, padding, src }: props) => {
  return (
    <div className="window absolute flex flex-col items-stretch w-full rounded-2xl overflow-hidden">
      <Image
        className="absolute w-full bg-black"
        style={{
          minHeight: `calc(100vh - ${padding * 2}px)`,
          maxHeight: `calc(100vh - ${padding * 2}px)`,
          objectFit: title == "Codepen" ? "contain" : "cover",
        }}
        width={1000}
        height={1000}
        src={src}
        alt={`${title} Image`}
        // quality={95}
      />
      <Image
        className="filter absolute w-full rounded-2xl overflow-hidden mix-blend-plus-lighter blur-xl"
        style={{
          minHeight: `calc(100vh - ${padding * 2}px)`,
          maxHeight: `calc(100vh - ${padding * 2}px)`,
          objectFit: title == "Codepen" ? "contain" : "cover",
        }}
        width={1000}
        height={1000}
        src={src}
        alt="Filter Image"
        // quality={95}
      />
      <div className="gradient-blur top inset-[0_0_auto_0] absolute min-h-20 max-h-20 min-w-full">
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
      </div>
      {index === 0 || index === Projects.length - 1 ? (
        <div className="bg-shade absolute inset-0 bg-[var(--shade-950)] z-10 opacity-0 duration-300"></div>
      ) : null}
    </div>
  );
};

export default Project;
