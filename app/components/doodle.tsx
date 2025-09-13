import React, { useEffect } from "react";
import DoodleOpening from "./doodles/doodleOpening";

type props = {
  height: number;
  activeIndex: number;
};

const Doodle = ({ activeIndex, height }: props) => {
  return (
    <div
      className="doodle relative w-full border-[#B1BFDB] border rounded-2xl overflow-hidden"
      style={{ height: height }}
    >
      <DoodleOpening />
    </div>
  );
};

export default Doodle;
