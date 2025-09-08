import React from "react";
import Image from "next/image";

type props = {
  title: string;
  padding: number;
  src: string;
};

const Project = ({ title, padding, src }: props) => {
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
      <div className="gradient-blur top inset-[0_0_auto_0] absolute min-h-12 max-h-12 min-w-full">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="gradient-blur bottom inset-[auto_0_0_0] absolute min-h-12 max-h-12 min-w-full">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Project;
