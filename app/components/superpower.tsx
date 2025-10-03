import React, { useEffect } from "react";

type props = {
  sectionProgress?: number;
};

const Superpower = ({ sectionProgress }: props) => {
  useEffect(() => {
    if (sectionProgress === undefined) return;
    const raw = typeof sectionProgress === "number" ? sectionProgress - 1 : 1;
    const inset = Math.min(1, Math.max(0, raw));
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const easedInset = easeOut(inset);

    const spGradient = document.querySelector(
      ".sp .gradient-blur"
    ) as HTMLDivElement;
    // spGradient.style.inset = `${0 - easedInset * 500}px`;
  }, [sectionProgress]);

  return (
    <div
      className="sp absolute min-w-full"
      style={{
        minHeight: `calc(100vh - ${16 * 2}px)`,
        maxHeight: `calc(100vh - ${16 * 2}px)`,
      }}
    >
      <div className="gradient-blur absolute inset-0 min-w-full">
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
