import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Projects from "./projects";
const src = Projects[2].src;

type props = {
  sectionProgress?: number;
};

const Superpower = ({ sectionProgress }: props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (sectionProgress === undefined) return;
    const raw = typeof sectionProgress === "number" ? sectionProgress - 3 : 1;
    const rawProgress = Math.min(1, Math.max(0, raw));

    const easeIn = (t: number) => t * t * t;
    const easedProgress = easeIn(raw);

    // Apply styles directly to DOM elements for smooth animation
    if (containerRef.current) {
      containerRef.current.style.transform = sectionProgress
        ? `scale(${rawProgress})`
        : "1";
      containerRef.current.style.borderRadius = sectionProgress
        ? `${100 - rawProgress * 100}%`
        : "0%";
    }

    if (imageRef.current) {
      imageRef.current.style.scale = sectionProgress
        ? `${2.75 - rawProgress * 1.75}`
        : "1";
    }

    const spGradientBlurs = document.querySelectorAll(
      ".sp .gradient-blur > div"
    ) as NodeListOf<HTMLElement>;

    spGradientBlurs.forEach((div, index) => {
      const stop1 = 0 + easedProgress * (100 / spGradientBlurs.length) * index;
      const stop2 = stop1 + (easedProgress * 100) / spGradientBlurs.length;
      const mask = `radial-gradient(circle at center, transparent ${stop1}%, white ${stop2}%)`;
      div.style.mask = mask;
      div.style.webkitMask = mask;
    });
  }, [sectionProgress]);

  return (
    <div className="sp absolute inset-0 bg-[#000000]">
      <div
        ref={containerRef}
        className="absolute min-w-full min-h-full aspect-square overflow-hidden left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center justify-center"
      >
        <Image
          ref={imageRef}
          className="absolute w-full object-cover"
          style={{
            minHeight: `calc(100vh - ${16 * 2}px)`,
            maxHeight: `calc(100vh - ${16 * 2}px)`,
          }}
          width={1000}
          height={1000}
          src={src}
          alt={`Superpower Image`}
        />
      </div>
      <div className="gradient-blur absolute inset-0 min-w-full">
        <div></div>
        <div></div>
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

export default Superpower;
