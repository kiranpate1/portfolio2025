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
    if (rawProgress <= 0.5) {
      windowRef1.current!.style.height = `0%`;
      windowRef2.current!.style.height = `${100 - rawProgress * 100}%`;
    } else if (rawProgress > 0.5 && rawProgress <= 1) {
      windowRef1.current!.style.height = `${(rawProgress - 0.5) * 200}%`;
      windowRef2.current!.style.height = `50%`;
    } else if (rawProgress > 1 && rawProgress <= 1.5) {
      windowRef1.current!.style.height = `100%`;
      windowRef2.current!.style.height = `${(1.5 - rawProgress) * 200}%`;
    } else {
      windowRef1.current!.style.height = `100%`;
      windowRef2.current!.style.height = `0%`;
    }
  }, [sectionProgress]);

  return (
    <div className="flex flex-col h-full w-full gap-2">
      <div className="flex gap-2 h-full" ref={windowRef1}>
        <div className="bg-amber-400 flex-1 rounded-2xl"></div>
        <div className="bg-amber-400 flex-1 rounded-2xl"></div>
      </div>
      <div className="flex gap-2 h-full" ref={windowRef2}>
        <div className="bg-amber-400 flex-1 rounded-2xl"></div>
        <div className="bg-amber-400 flex-1 rounded-2xl"></div>
      </div>
    </div>
  );
};

export default Codepen;
