import React, { useEffect, useRef } from "react";

type props = {
  sectionProgress?: number;
};

const Codepen = ({ sectionProgress }: props) => {
  const windowRef1 = useRef<HTMLDivElement>(null);
  const windowRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      sectionProgress === undefined &&
      !windowRef1.current &&
      !windowRef2.current
    )
      return;
    const raw = typeof sectionProgress === "number" ? sectionProgress - 4 : 1;
    const rawProgress = Math.min(2, Math.max(0, raw));

    console.log(rawProgress);
    if (rawProgress <= 1) {
      windowRef1.current!.style.top = "auto";
      windowRef1.current!.style.bottom = "calc(50vh - 16px)";
      windowRef2.current!.style.top = "auto";
      windowRef2.current!.style.bottom = "0";
    } else {
      windowRef1.current!.style.top = "0";
      windowRef1.current!.style.bottom = "auto";
      windowRef2.current!.style.top = "calc(50vh - 16px)";
      windowRef2.current!.style.bottom = "auto";
    }
    if (rawProgress <= 0.5) {
      windowRef1.current!.style.flex = `0`;
      windowRef1.current!.style.minHeight = `0%`;
      windowRef2.current!.style.flex = `1`;
      windowRef2.current!.style.minHeight = `auto`;
    } else if (rawProgress > 0.5 && rawProgress <= 1) {
      windowRef1.current!.style.flex = `1`;
      windowRef1.current!.style.minHeight = `0%`;
      windowRef2.current!.style.flex = `auto`;
      windowRef2.current!.style.minHeight = `calc(50vh - 16px)`;
    } else if (rawProgress > 1 && rawProgress <= 1.5) {
      windowRef1.current!.style.flex = `auto`;
      windowRef1.current!.style.minHeight = `calc(50vh - 16px)`;
      windowRef2.current!.style.flex = `1`;
      windowRef2.current!.style.minHeight = `0%`;
    } else {
      windowRef1.current!.style.flex = `1`;
      windowRef1.current!.style.minHeight = `auto`;
      windowRef2.current!.style.flex = `0`;
      windowRef2.current!.style.minHeight = `0%`;
    }
  }, [sectionProgress]);

  return (
    <div className="relative h-full w-full flex flex-col gap-4">
      <div className="w-full flex gap-2" ref={windowRef1}>
        <div className="bg-amber-400 flex-1 rounded-2xl"></div>
        <div className="bg-amber-400 flex-1 rounded-2xl"></div>
      </div>
      <div className="w-full flex gap-2" ref={windowRef2}>
        <div className="bg-amber-400 flex-1 rounded-2xl"></div>
        <div className="bg-amber-400 flex-1 rounded-2xl"></div>
      </div>
    </div>
  );
};

export default Codepen;
