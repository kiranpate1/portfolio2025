import React from "react";

type props = {
  activeIndex: number;
};

const Doodle = ({ activeIndex }: props) => {
  return (
    <div className="relative w-full h-40 border-[#8C95BD] border rounded-2xl overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <g>
          <circle
            cx="400"
            cy="300"
            r={200 + activeIndex * 20}
            stroke="#ff6f61"
            strokeWidth="4"
            fill="none"
            opacity="0.6"
          />
          <circle
            cx="400"
            cy="300"
            r={150 + activeIndex * 15}
            stroke="#6b5b95"
            strokeWidth="4"
            fill="none"
            opacity="0.6"
          />
          <circle
            cx="400"
            cy="300"
            r={100 + activeIndex * 10}
            stroke="#88b04b"
            strokeWidth="4"
            fill="none"
            opacity="0.6"
          />
          <circle
            cx="400"
            cy="300"
            r={50 + activeIndex * 5}
            stroke="#f7cac9"
            strokeWidth="4"
            fill="none"
            opacity="0.6"
          />
        </g>
      </svg>
    </div>
  );
};

export default Doodle;
