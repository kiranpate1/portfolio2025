import React, { useEffect, useRef } from "react";

type props = {
  sectionProgress?: number;
};

const Computer = ({ sectionProgress }: props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const socials = useRef<HTMLDivElement>(null);
  const easeIn = (t: number) => t * t * (3 - 2 * t);

  let showLinks = useRef(false);

  useEffect(() => {
    if (
      sectionProgress === undefined ||
      !containerRef.current ||
      !socials.current
    )
      return;

    if (sectionProgress > 1.5 && !showLinks.current) {
      showLinks.current = true;

      socials.current.querySelectorAll(":scope > *").forEach((a, i) => {
        setTimeout(() => {
          (a as HTMLElement).style.pointerEvents = "none";
          (a as HTMLElement).style.opacity = "0";
        }, 50 * i);
      });
    } else if (sectionProgress <= 1.5 && showLinks.current) {
      showLinks.current = false;

      socials.current.querySelectorAll(":scope > *").forEach((a, i) => {
        setTimeout(() => {
          (a as HTMLElement).style.pointerEvents = "auto";
          (a as HTMLElement).style.opacity = "1";
        }, 100 * i + 50);
      });
    }

    socials.current.querySelectorAll(":scope > *").forEach((a, i) => {
      (a as HTMLElement).onclick = (event) => {
        event.preventDefault();

        const clone = a.cloneNode(true) as HTMLElement;
        clone.style.position = "absolute";
        clone.style.inset = "0";
        clone.style.width = "100%";
        clone.style.height = "100%";
        a.appendChild(clone);
        // Force a reflow to ensure the DOM updates
        void clone.offsetHeight;
        clone.style.transition =
          "transform 0.2s ease-in 0.1s, opacity 0.4s ease-out";
        clone.style.transform = "scale(3)";
        clone.style.opacity = "0";

        setTimeout(() => {
          a.removeChild(clone);
        }, 300);

        const href = a.getAttribute("href");
        if (href) {
          setTimeout(() => {
            window.open(href, "_blank");
          }, 600);
        }
      };
    });

    // Set container opacity based on sectionProgress
    containerRef.current.style.opacity = sectionProgress > 1.99 ? "0" : "1";
  }, [sectionProgress]);

  return (
    <div
      ref={containerRef}
      className="window absolute flex flex-col items-stretch w-full border border-[var(--shade-300)] text-[var(--shade-300)] rounded-[16px] overflow-hidden z-1 bg-[var(--shade-900)]"
    >
      <div
        className="socials absolute w-full max-w-[900px] h-full max-h-[325px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
        ref={socials}
      >
        <div className="absolute left-[5%] bottom-[25%] w-18 p-2 cursor-pointer hover:bg-[var(--shade-850)] flex flex-col items-center gap-2 rounded-sm">
          <svg
            className="w-full"
            viewBox="0 0 60 59"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="12"
              y="3"
              width="40"
              height="47"
              fill="var(--shade-900)"
              stroke="var(--shade-300)"
            />
            <rect
              x="8"
              y="7"
              width="40"
              height="47"
              fill="var(--shade-900)"
              stroke="var(--shade-300)"
            />
            <path
              d="M12 11C12.64 11 20.2667 11 24 11"
              stroke="var(--shade-300)"
              strokeLinejoin="round"
            />
            <path
              d="M36 11C36.4267 11 41.5111 11 44 11"
              stroke="var(--shade-300)"
              strokeLinejoin="round"
            />
            <path
              d="M12 14C12.64 14 20.2667 14 24 14"
              stroke="var(--shade-300)"
              strokeLinejoin="round"
            />
            <path
              d="M12 23C12.64 23 20.2667 23 24 23"
              stroke="var(--shade-300)"
              strokeLinejoin="round"
            />
            <path
              d="M12 29C13.7067 29 34.0444 29 44 29"
              stroke="var(--shade-300)"
              strokeLinejoin="round"
            />
            <path
              d="M12 32C13.7067 32 34.0444 32 44 32"
              stroke="var(--shade-300)"
              strokeLinejoin="round"
            />
            <path
              d="M12 35C13.7067 35 34.0444 35 44 35"
              stroke="var(--shade-300)"
              strokeLinejoin="round"
            />
            <path
              d="M12 38C13.7067 38 34.0444 38 44 38"
              stroke="var(--shade-300)"
              strokeLinejoin="round"
            />
            <path
              d="M34 11H35"
              stroke="var(--shade-300)"
              strokeLinejoin="round"
            />
            <path
              d="M3 47H53C53 50.5147 53 52.4853 53 56H3V47Z"
              fill="var(--shade-900)"
            />
            <path
              d="M3 47H53M3 47V56H53M3 47L8 42M53 47C53 50.5147 53 52.4853 53 56M53 47L59 41M53 56L59 50V41M59 41C58.2 41 54 41 52 41"
              stroke="var(--shade-300)"
            />
          </svg>
          <div className="caption-small text-center">Send Me A Message</div>
        </div>
        <a
          target="blank_"
          href="https://www.instagram.com/artsbykiran/"
          className="absolute left-[35%] bottom-[2%] w-18 p-2 cursor-pointer hover:bg-[var(--shade-850)] flex flex-col items-center gap-2 rounded-sm"
        >
          <svg
            className="w-full"
            viewBox="0 0 60 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="11"
              y="2"
              width="44"
              height="32"
              fill="var(--shade-900)"
              stroke="var(--shade-300)"
            />
            <rect
              x="8"
              y="5"
              width="44"
              height="32"
              fill="var(--shade-900)"
              stroke="var(--shade-300)"
            />
            <rect
              x="13"
              y="10"
              width="34"
              height="22"
              fill="var(--shade-900)"
              stroke="var(--shade-300)"
            />
            <path
              d="M13 20.9938C18.2619 14.3353 24.3333 14.3353 29.9999 20.9938C35.6666 27.6524 40.5238 32.2629 47 26.1163"
              stroke="var(--shade-300)"
              strokeLinejoin="round"
            />
            <circle cx="37" cy="16" r="3" stroke="var(--shade-300)" />
            <rect
              x="2"
              y="27"
              width="24"
              height="16"
              fill="var(--shade-900)"
              stroke="var(--shade-300)"
            />
            <path
              d="M16 27H12V23.667H11V21H17V23.667H16V27Z"
              fill="var(--shade-900)"
            />
            <path
              d="M16 27V27.5H16.5V27H16ZM12 27H11.5V27.5H12V27ZM12 23.667H12.5V23.167H12V23.667ZM11 23.667H10.5V24.167H11V23.667ZM11 21V20.5H10.5V21H11ZM17 21H17.5V20.5H17V21ZM17 23.667V24.167H17.5V23.667H17ZM16 23.667V23.167H15.5V23.667H16ZM16 27V26.5H12V27V27.5H16V27ZM12 27H12.5V23.667H12H11.5V27H12ZM12 23.667V23.167H11V23.667V24.167H12V23.667ZM11 23.667H11.5V21H11H10.5V23.667H11ZM11 21V21.5H17V21V20.5H11V21ZM17 21H16.5V23.667H17H17.5V21H17ZM17 23.667V23.167H16V23.667V24.167H17V23.667ZM16 23.667H15.5V27H16H16.5V23.667H16Z"
              fill="var(--shade-250)"
            />
            <circle cx="14" cy="35" r="5" stroke="var(--shade-300)" />
            <circle cx="14" cy="35" r="3" stroke="var(--shade-300)" />
            <circle cx="22.5" cy="30.5" r="1.5" stroke="var(--shade-300)" />
          </svg>
          <div className="caption-small text-center">Instagram</div>
        </a>
        <a
          target="blank_"
          href="mailto:kp8568@gmail.com"
          className="absolute left-[45%] top-[3%] w-18 p-2 cursor-pointer hover:bg-[var(--shade-850)] flex flex-col items-center gap-2 rounded-sm"
        >
          <svg
            className="w-full"
            viewBox="0 0 60 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M54 29V2H10V5" stroke="var(--shade-300)" />
            <rect
              x="7"
              y="5"
              width="44"
              height="28"
              fill="var(--shade-900)"
              stroke="var(--shade-300)"
            />
            <path
              d="M7 33L29 15L51 33"
              stroke="var(--shade-300)"
              strokeLinejoin="round"
            />
            <path
              d="M29 23L7 5H51L29 23Z"
              fill="var(--shade-900)"
              stroke="var(--shade-300)"
              strokeLinejoin="round"
            />
            <path
              d="M2 31H52C52 34.5147 52 36.4853 52 40H2V31Z"
              fill="var(--shade-900)"
            />
            <path
              d="M2 31H52M2 31V40H52M2 31L7 26M52 31C52 34.5147 52 36.4853 52 40M52 31L58 25M52 40L58 34V25M58 25C57.2 25 56 25 54 25"
              stroke="var(--shade-300)"
            />
          </svg>
          <div className="caption-small text-center">Email</div>
        </a>
        <a
          target="blank_"
          href="https://www.x.com/pate1kiran"
          className="absolute right-[5%] top-[25%] w-18 p-2 cursor-pointer hover:bg-[var(--shade-850)] flex flex-col items-center gap-2 rounded-sm"
        >
          <svg
            className="w-full"
            viewBox="0 0 60 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M51 2H9C6.79086 2 5 3.79086 5 6V34C5 36.2091 6.79086 38 9 38H15V45L22 38H51C53.2091 38 55 36.2091 55 34V6C55 3.79086 53.2091 2 51 2Z"
              fill="var(--shade-900)"
              stroke="var(--shade-300)"
            />
            <path
              d="M11 8C13.0267 8 37.1778 8 49 8"
              stroke="var(--shade-300)"
              strokeLinejoin="round"
            />
            <path
              d="M11 11C13.0267 11 37.1778 11 49 11"
              stroke="var(--shade-300)"
              strokeLinejoin="round"
            />
            <path
              d="M11 14C12.28 14 27.5333 14 35 14"
              stroke="var(--shade-300)"
              strokeLinejoin="round"
            />
            <path
              d="M11 17C13.0267 17 37.1778 17 49 17"
              stroke="var(--shade-300)"
              strokeLinejoin="round"
            />
            <path
              d="M11 20C13.0267 20 37.1778 20 49 20"
              stroke="var(--shade-300)"
              strokeLinejoin="round"
            />
            <path
              d="M11 23C11.32 23 15.1333 23 17 23"
              stroke="var(--shade-300)"
              strokeLinejoin="round"
            />
            <path
              d="M11 26C13.0267 26 37.1778 26 49 26"
              stroke="var(--shade-300)"
              strokeLinejoin="round"
            />
            <path
              d="M11 29C12.44 29 29.6 29 38 29"
              stroke="var(--shade-300)"
              strokeLinejoin="round"
            />
            <path
              d="M11 32C11.64 32 19.2667 32 23 32"
              stroke="var(--shade-300)"
              strokeLinejoin="round"
            />
          </svg>
          <div className="caption-small text-center">Twitter</div>
        </a>
      </div>
      <div className="absolute top-0 left-0 w-full h-6 border-b border-[var(--shade-300)] bg-[var(--shade-900)] flex items-center justify-between pl-3 pr-2 caption-small">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-amber-300"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
          </div>
          <div>File</div>
          <div>Edit</div>
        </div>
        <div className="flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 6H6V10H2V6Z" fill="var(--shade-250)" />
            <path
              d="M2 4C1.46957 4 0.960859 4.21071 0.585786 4.58579C0.210714 4.96086 0 5.46957 0 6L0 10C0 10.5304 0.210714 11.0391 0.585786 11.4142C0.960859 11.7893 1.46957 12 2 12H12C12.5304 12 13.0391 11.7893 13.4142 11.4142C13.7893 11.0391 14 10.5304 14 10V6C14 5.46957 13.7893 4.96086 13.4142 4.58579C13.0391 4.21071 12.5304 4 12 4H2ZM12 5C12.2652 5 12.5196 5.10536 12.7071 5.29289C12.8946 5.48043 13 5.73478 13 6V10C13 10.2652 12.8946 10.5196 12.7071 10.7071C12.5196 10.8946 12.2652 11 12 11H2C1.73478 11 1.48043 10.8946 1.29289 10.7071C1.10536 10.5196 1 10.2652 1 10V6C1 5.73478 1.10536 5.48043 1.29289 5.29289C1.48043 5.10536 1.73478 5 2 5H12ZM16 8C16 8.39782 15.842 8.77936 15.5607 9.06066C15.2794 9.34196 14.8978 9.5 14.5 9.5V6.5C14.8978 6.5 15.2794 6.65804 15.5607 6.93934C15.842 7.22064 16 7.60218 16 8Z"
              fill="var(--shade-250)"
            />
          </svg>
          9:21 AM
        </div>
      </div>
    </div>
  );
};

export default Computer;
