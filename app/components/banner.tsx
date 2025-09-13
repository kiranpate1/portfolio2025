import React, { useEffect, useState } from "react";

type props = {
  height: number;
};

const Banner = ({ height }: props) => {
  const [content, setContent] = useState("");

  // Build the dynamic text only on the client after mount to avoid
  // server/client mismatch (hydration failure).
  useEffect(() => {
    const date = new Date();
    const dayofWeek = date.toLocaleDateString("en-US", { weekday: "short" });
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const day = date.getDate();
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const fullDate = `${dayofWeek} ${month} ${day} ${time}`;

    const template = `Last login: ${fullDate} on ttys013
> kiran@kiranpa.tel

$ cat about.me
Name:     Kiran Patel
Roles:    Designer / Developer / Artist
Status:   Freelancing · Remote-friendly
Focus:    UX, frontend (React + TypeScript), generative/motion visuals

$ skills
- Product & interface design
- Component-driven frontend (React / Next.js / TypeScript)
- Interactive visuals & generative art
- Prototyping, motion, illustration

$ projects --recent
• portfolio2025 — a fast, polished personal site (this site)
• experimental-visuals — WebGL + creative coding experiments
• client-work — design systems, prototypes, brand identities

$ ethos
"Design with code. Ship with craft."

$ connect --method=contact
> email: hello@kiranpa.tel     github: github.com/kiranpatel
> dribbble / behance / linkedin — available on profile links`;

    setContent(template);
  }, []);

  // Typing effect: start only after content is set to ensure server rendered
  // HTML (empty) matches client initial HTML.
  useEffect(() => {
    if (content) {
      let index = 0;
      const speed = 10; // milliseconds per character
      const pre = document.querySelector("pre");
      if (pre) {
        pre.innerText = "";
        const interval = setInterval(() => {
          if (index < content.length) {
            pre.innerText += content.charAt(index);
            index++;
          } else {
            clearInterval(interval);
          }
        }, speed);
        return () => clearInterval(interval);
      }
    }
  }, [content]);

  return (
    <div
      className="window window absolute flex flex-col items-stretch w-full rounded-2xl overflow-hidden bg-[#0a0e15]"
      style={{ height: `${height}px` }}
    >
      <div className="w-full h-full relative py-2 px-3">
        <pre className="caption-small w-full rounded-md overflow-x-auto">
          {content}
        </pre>
      </div>
      <div className="filter"></div>
    </div>
  );
};

export default Banner;
