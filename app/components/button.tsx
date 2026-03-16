import React from "react";

type props = {
  name: string;
  onClick?: () => void;
  type?: "primary" | "secondary";
  isEnabled?: boolean;
};

const Button = ({
  name,
  onClick,
  type = "primary",
  isEnabled = true,
}: props) => {
  return (
    <button
      className={`flex items-center gap-2 mt-2 px-3 py-2 rounded-lg w-max text-sm font-medium hover:bg-[var(--shade-800)]!`}
      style={{
        opacity: isEnabled ? 1 : 0.5,
        cursor: isEnabled ? "pointer" : "auto",
        backgroundColor:
          type === "primary" ? "var(--shade-250)" : "var(--shade-850)",
        color: type === "primary" ? "var(--shade-900)" : "var(--shade-50)",
      }}
      onClick={onClick}
      disabled={!isEnabled}
    >
      {name}
      <svg
        width="11"
        height="11"
        className="-translate-y-[1px]"
        viewBox="0 0 11 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.2207 7.60386C9.2207 8.59387 9.2207 9.08835 9.00788 9.45682C8.86848 9.69825 8.668 9.89873 8.42658 10.0381C8.0581 10.2509 7.56363 10.2509 6.57362 10.2509H3.92653C2.42934 10.2509 1.68021 10.251 1.21538 9.78559C0.750027 9.32076 0.750027 8.57164 0.750027 7.07445V4.42736C0.750027 3.43735 0.750027 2.94287 0.962853 2.5744C1.10225 2.33297 1.30273 2.13249 1.54415 1.9931C1.91263 1.78027 2.4071 1.78027 3.39711 1.78027"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="M4.98616 7.0745C4.69326 7.3674 4.21839 7.3674 3.9255 7.0745C3.6326 6.78161 3.6326 6.30674 3.9255 6.01384L4.45583 6.54417L4.98616 7.0745ZM9.75 1.25V0.5H10.5V1.25H9.75ZM4.45583 6.54417L3.9255 6.01384L9.21967 0.71967L9.75 1.25L10.2803 1.78033L4.98616 7.0745L4.45583 6.54417ZM9.75 1.25H10.5V5.48534H9.75H9V1.25H9.75ZM9.75 1.25V2H5.51466V1.25V0.5H9.75V1.25Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
};

export default Button;
