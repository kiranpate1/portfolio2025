import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Projects from "./projects";
const src = Projects[0].src; // Dropbox image

type props = {
  sectionProgress?: number;
};

const Dropbox = ({ sectionProgress }: props) => {
  const filter = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (sectionProgress && filter.current) {
      const adjustedProgress = sectionProgress - 1;
      filter.current.style.opacity = `${1 - adjustedProgress}`;
      filter.current.style.filter = `blur(20px) brightness(${
        2 - adjustedProgress
      })`;
    }
  }, [sectionProgress]);

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
        alt={`Dropbox Image`}
      />
      <Image
        ref={filter}
        className="stick filter absolute w-full rounded-2xl overflow-hidden mix-blend-plus-lighter blur-xl object-cover"
        style={{
          minHeight: `calc(100vh - ${16 * 2}px)`,
          maxHeight: `calc(100vh - ${16 * 2}px)`,
        }}
        width={1000}
        height={1000}
        src={src}
        alt="Filter Image"
      />
    </div>
  );
};

export default Dropbox;
