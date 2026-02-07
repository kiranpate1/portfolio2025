import React, { useEffect, useRef } from "react";

type props = {
  sectionProgress?: number;
};

const Codepen = ({ sectionProgress }: props) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const windowRef1 = useRef<HTMLDivElement>(null);
  const windowRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      sectionProgress === undefined &&
      !windowRef.current &&
      !windowRef1.current &&
      !windowRef2.current
    )
      return;
    const raw = typeof sectionProgress === "number" ? sectionProgress - 4 : 1;
    const rawProgress = Math.min(2, Math.max(0, raw));

    windowRef1.current!.style.gridTemplateColumns = `${rawProgress * 50}% ${
      100 - rawProgress * 50
    }%`;
    windowRef2.current!.style.gridTemplateColumns = `${
      100 - rawProgress * 50
    }% ${rawProgress * 50}%`;

    const videos = windowRef.current!.querySelectorAll(
      "video",
    ) as NodeListOf<HTMLVideoElement>;
    if (rawProgress < 0.5 && videos) {
      videos.forEach((video, index) => {
        video.style.filter = "blur(50px)";
        video.pause();
      });
    } else if (rawProgress >= 0.5 && rawProgress < 1.5 && videos) {
      videos.forEach((video, index) => {
        video.style.filter = "blur(0px)";
        video.play();
      });
    } else if (rawProgress >= 1.5 && videos) {
      videos.forEach((video, index) => {
        video.style.filter = "blur(50px)";
        video.pause();
      });
    }
  }, [sectionProgress]);

  return (
    <div className="absolute inset-0 grid grid-rows-2 gap-2" ref={windowRef}>
      <div className="h-full w-full grid grid-rows-1 gap-2" ref={windowRef1}>
        <div className="h-full w-full bg-white rounded-2xl overflow-hidden flex justify-center items-center">
          <video
            className="h-[calc(50vh-20px)] w-full object-contain duration-300"
            src="/videos/music.mp4"
            autoPlay
            loop
            muted
            playsInline
          ></video>
        </div>
        <div className="h-full w-[calc(100%-8px)] bg-black rounded-2xl overflow-hidden flex justify-center items-center">
          <video
            className="h-[calc(50vh-20px)] w-full object-cover duration-300"
            src="/videos/buttons.mp4"
            autoPlay
            loop
            muted
            playsInline
          ></video>
        </div>
      </div>
      <div className="h-full w-full grid grid-rows-1 gap-2" ref={windowRef2}>
        <div className="h-full w-full rounded-2xl overflow-hidden flex justify-center items-center">
          <video
            className="h-[calc(50vh-20px)] w-full object-cover duration-300"
            src="/videos/signature.mp4"
            autoPlay
            loop
            muted
            playsInline
          ></video>
        </div>
        <div className="h-full w-[calc(100%-8px)] bg-[#151515] rounded-2xl overflow-hidden flex justify-center items-center">
          <video
            className="h-[calc(50vh-20px)] w-full object-contain duration-300"
            src="/videos/modals.mp4"
            autoPlay
            loop
            muted
            playsInline
          ></video>
        </div>
      </div>
    </div>
  );
};

export default Codepen;
