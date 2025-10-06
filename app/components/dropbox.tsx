import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Projects from "./projects";
const src = Projects[0].src; // Dropbox image
import DropboxTiles from "./dropboxTiles";

type props = {
  sectionProgress?: number;
};

const Dropbox = ({ sectionProgress }: props) => {
  const filter = useRef<HTMLImageElement>(null);
  const [rawProgress, setRawProgress] = React.useState(0);

  useEffect(() => {
    if (sectionProgress && filter.current) {
      const adjustedProgress = sectionProgress - 1;
      setRawProgress(Math.min(1, Math.max(0, adjustedProgress)));
      filter.current.style.opacity = `${1 - adjustedProgress}`;
      filter.current.style.filter = `blur(20px) brightness(${
        3 - adjustedProgress * 2
      })`;
    }
  }, [sectionProgress]);

  return (
    <div>
      {/* <DropboxTiles rawProgress={rawProgress} /> */}
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
