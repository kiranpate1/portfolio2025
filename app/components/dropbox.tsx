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
  const tilesRef = useRef<any>(null);

  useEffect(() => {
    if (sectionProgress && filter.current) {
      const adjustedProgress = sectionProgress - 1;
      const clampedProgress = Math.min(1, Math.max(0, adjustedProgress));

      // Apply styles directly to DOM for smooth animation
      filter.current.style.opacity = `${1 - adjustedProgress}`;
      filter.current.style.filter = `blur(20px) brightness(${
        3 - adjustedProgress * 2
      })`;
    }
  }, [sectionProgress]);

  // Calculate rawProgress directly without state
  const rawProgress = sectionProgress
    ? Math.min(1, Math.max(0, sectionProgress - 1))
    : 0;

  return (
    <div className="dbx">
      <DropboxTiles rawProgress={rawProgress} />
      {/* <Image
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
      /> */}
      <div
        ref={filter}
        className="absolute inset-0 filter mix-blend-plus-lighter blur-xl"
      >
        <DropboxTiles rawProgress={rawProgress} />
      </div>
    </div>
  );
};

export default Dropbox;
