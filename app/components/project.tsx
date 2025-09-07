import React from "react";
import Image from "next/image";

type props = {
  title: string;
  padding: number;
};

const Project = ({ title, padding }: props) => {
  return (
    <div className="window absolute flex flex-col items-stretch w-full rounded-2xl overflow-hidden">
      <Image
        className="absolute w-full object-cover"
        style={{
          minHeight: `calc(100vh - ${padding * 2}px)`,
          maxHeight: `calc(100vh - ${padding * 2}px)`,
        }}
        width={100}
        height={100}
        src="/images/test.webp"
        alt={`${title} Image`}
      />
      <Image
        className="filter absolute w-full rounded-2xl overflow-hidden object-cover mix-blend-plus-lighter blur-xl"
        style={{
          minHeight: `calc(100vh - ${padding * 2}px)`,
          maxHeight: `calc(100vh - ${padding * 2}px)`,
        }}
        width={100}
        height={100}
        src="/images/test.webp"
        alt="Filter Image"
      />
      <div className="gradient-blur top inset-[0_0_auto_0] absolute min-h-12 max-h-12 min-w-full">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="gradient-blur bottom inset-[auto_0_0_0] absolute min-h-12 max-h-12 min-w-full">
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

export default Project;
