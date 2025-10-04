import React from "react";
import Image from "next/image";
import Projects from "./projects";
const src = Projects[Projects.length - 1].src; // Art image

type props = {
  sectionProgress?: number;
};

const Art = ({ sectionProgress }: props) => {
  return (
    <div>
      <Image
        className="stick absolute w-full object-cover"
        style={{
          minHeight: `calc(100vh - ${16 * 2}px)`,
          maxHeight: `calc(100vh - ${16 * 2}px)`,
        }}
        width={1000}
        height={1000}
        src={src}
        alt={`Artwork Image`}
      />
      <div className="bg-shade absolute inset-0 z-1 opacity-0 p-12 bg-[var(--shade-950)]"></div>
    </div>
  );
};

export default Art;
