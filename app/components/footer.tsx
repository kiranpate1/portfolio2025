import React from "react";

type props = {
  height: number;
};

const Footer = ({ height }: props) => {
  return (
    <footer
      className="window absolute w-full rounded-2xl bg-[#0a0e15] overflow-hidden"
      style={{ height: height }}
    >
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} My Portfolio. All rights reserved.
        </p>
      </div>
      <div className="filter"></div>
    </footer>
  );
};

export default Footer;
