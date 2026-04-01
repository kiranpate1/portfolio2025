import React from "react";
import DoodleOpening from "./doodles/doodleOpening";

type props = {
  height: number;
  pathRef?: React.RefObject<SVGPathElement | null>;
};

const Doodle = ({ height, pathRef }: props) => {
  return (
    <div
      className="doodle relative w-full rounded-2xl overflow-hidden md:block hidden"
      style={{ height: height }}
    >
      <svg
        width="250"
        height="180"
        viewBox="0 0 250 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={pathRef}
          d="M16.5 0.5H233.5C242.337 0.5 249.5 7.66344 249.5 16.5V163.5C249.5 172.337 242.337 179.5 233.5 179.5H16.5C7.66344 179.5 0.5 172.337 0.5 163.5V16.5C0.5 7.66344 7.66344 0.5 16.5 0.5Z"
          stroke="var(--shade-300)"
          strokeDasharray={1000}
          strokeDashoffset={1000}
          vectorEffect={"non-scaling-stroke"}
        />
      </svg>
      <DoodleOpening />
    </div>
  );
};

export default Doodle;
