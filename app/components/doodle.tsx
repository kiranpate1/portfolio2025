import React, { useEffect } from "react";
import DoodleOpening from "./doodles/doodleOpening";

type props = {
  height: number;
};

const Doodle = ({ height }: props) => {
  return (
    <div
      className="doodle relative w-full border-[var(--shade-300)] border rounded-2xl overflow-hidden md:block hidden"
      style={{ height: height }}
    >
      <DoodleOpening />
    </div>
  );
};

export default Doodle;
