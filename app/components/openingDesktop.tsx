import React, { use, useEffect, useRef } from "react";

type props = {
  sectionProgress?: number;
};

const Computer = ({ sectionProgress }: props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const easeIn = (t: number) => t * t * (3 - 2 * t);

  let showLinks = useRef(false);

  useEffect(() => {
    if (
      sectionProgress === undefined ||
      !containerRef.current ||
      !screen.current
    )
      return;

    if (sectionProgress > 1.5 && !showLinks.current) {
      showLinks.current = true;

      screen.current.querySelectorAll(":scope > *").forEach((a, i) => {
        setTimeout(() => {
          (a as HTMLElement).style.pointerEvents = "none";
          (a as HTMLElement).style.opacity = "0";
        }, 10 * i);
      });
    } else if (sectionProgress <= 1.5 && showLinks.current) {
      showLinks.current = false;

      screen.current.querySelectorAll(":scope > *").forEach((a, i) => {
        setTimeout(() => {
          (a as HTMLElement).style.pointerEvents = "auto";
          (a as HTMLElement).style.opacity = "1";
        }, 100 * i + 50);
      });
    }

    // Set container opacity based on sectionProgress
    containerRef.current.style.opacity = sectionProgress > 1.99 ? "0" : "1";
  }, [sectionProgress]);

  const aboutMe = useRef<HTMLDivElement>(null);
  const shoutOuts = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!screen.current || !aboutMe.current || !shoutOuts.current) return;

    screen.current.querySelectorAll(":scope > *").forEach((a, i) => {
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

    aboutMe.current.addEventListener("click", () => {
      const title = "About Me";
      const content = `
      <p class='paragraph text-[var(--shade-300)] text-pretty'>
        Hey! I'm Kiran, an artist who accidentally learned to code during the pandemic and now can't escape the matrix. I also dabble in product design and motion design. On a good day, I can juggle all four without dropping any... most of the time. 
      </p>
      <br />
      <p class='paragraph text-[var(--shade-300)] text-pretty'>
        I create digital experiences that hopefully don't make people rage-quit. My superpower? Turning caffeine into pixels and pretending I understand what I'm doing. Honestly, I'm just here for the vibes and the occasional "it works!" moment.
      </p>
      <br />
      <p class='paragraph text-[var(--shade-300)] text-pretty'>
        When I'm not coding or designing, you can find me lost in a good book (and when I say book I mean doomscrolling). Sometimes, I might attempt to cook (results may vary), or convincing my cat that I'm not just a giant, clumsy human.
      </p>`;
      setTimeout(() => {
        createModal(title, content);
      }, 600);
    });

    shoutOuts.current.addEventListener("click", () => {
      const title = "Shout Outs";
      const content = `
      <p class='paragraph text-[var(--shade-300)] text-pretty'>
        Ali R - <a class="caption-small cursor-pointer text-[var(--shade-50)] hover:underline">aliasgers.space</a><br/>
        Alvin L - <a class="caption-small cursor-pointer text-[var(--shade-50)] hover:underline">alvinn.design</a><br/>
        Ben G - <a class="caption-small cursor-pointer text-[var(--shade-50)] hover:underline">bengiannis.com</a><br/>
        Benya S - <a class="caption-small cursor-pointer text-[var(--shade-50)] hover:underline">benya.com</a><br/>
        Bernie S - <a class="caption-small cursor-pointer text-[var(--shade-50)] hover:underline">berniesanders.com</a><br/>
        Beyoncé K - <a class="caption-small cursor-pointer text-[var(--shade-50)] hover:underline">beyonce.com</a><br/>
        Jenny R - <a class="caption-small cursor-pointer text-[var(--shade-50)] hover:underline">jenrudz.art</a><br/>
        Jessica L - <a class="caption-small cursor-pointer text-[var(--shade-50)] hover:underline">jessicalai.me</a><br/>
        Mitul S - <a class="caption-small cursor-pointer text-[var(--shade-50)] hover:underline">typicalmitul.com</a><br/>
        Natalie A - <a class="caption-small cursor-pointer text-[var(--shade-50)] hover:underline">nataliealmosa.ca</a><br/>
        Paco L - <a class="caption-small cursor-pointer text-[var(--shade-50)] hover:underline">pacolui.com</a><br/>
        Sam Y - <a class="caption-small cursor-pointer text-[var(--shade-50)] hover:underline">instagram.com/samdoesarts</a><br/>
        Shen G - <a class="caption-small cursor-pointer text-[var(--shade-50)] hover:underline">shen.land</a><br/>
        Tyler O - <a class="caption-small cursor-pointer text-[var(--shade-50)] hover:underline">golfwang.com</a><br/>
        Zohran M - <a class="caption-small cursor-pointer text-[var(--shade-50)] hover:underline">zohranfornyc.com</a><br/>
      </p>`;
      setTimeout(() => {
        createModal(title, content);
      }, 600);
    });

    const createModal = (title: string, content: string) => {
      if (!screen.current) return;
      const modal = document.createElement("div");
      modal.className =
        "absolute top-[50%] left-[50%] w-[40%] max-w-[600px] min-w-[300px] h-[80%] min-h-[300px] bg-[var(--shade-900)] overflow-scroll border border-[var(--shade-300)] rounded-2xl p-6 translate-x-[-50%] translate-y-[-50%] z-50";
      modal.innerHTML =
        `
      <div class='absolute top-0 left-0 w-full h-6 border-b border-[var(--shade-300)] bg-[var(--shade-900)] flex items-center justify-between pl-3 pr-2 caption-small'>
        <div class='flex items-center gap-4'>` +
        title +
        `</div>
        <div class='flex items-center gap-1'>
          <div class='w-1.5 h-1.5 rounded-full bg-orange-500'></div>
          <div class='w-1.5 h-1.5 rounded-full bg-amber-300'></div>
          <div class='w-1.5 h-1.5 rounded-full bg-green-400'></div>
        </div>
      </div>` +
        "<div class='absolute w-full left-0 top-6 py-2 px-3'>" +
        content +
        "</div>";
      screen.current.appendChild(modal);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="window absolute flex flex-col items-stretch w-full border border-[var(--shade-300)] text-[var(--shade-300)] rounded-[16px] overflow-hidden z-1 bg-[var(--shade-900)]"
    >
      <div
        className="socials absolute w-full h-[calc(100%-24px)] max-h-[calc(100vh-252px)] left-0 top-6 p-[5vh] flex flex-col flex-wrap gap-4 items-start content-start"
        ref={screen}
      >
        <div
          className="relative min-w-[110px] min-h-[110px] flex items-center justify-center"
          ref={aboutMe}
        >
          <div className="w-18 h-22 cursor-default hover:bg-[var(--shade-850)] flex flex-col items-center rounded-sm">
            <svg
              className="w-full flex-shrink-0 p-2"
              viewBox="0 0 60 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="12"
                y="2"
                width="40"
                height="43"
                fill="var(--shade-900)"
                stroke="var(--shade-300)"
              />
              <rect
                x="8"
                y="6"
                width="40"
                height="43"
                fill="var(--shade-900)"
                stroke="var(--shade-300)"
              />
              <path
                d="M12 10C12.64 10 20.2667 10 24 10"
                stroke="var(--shade-300)"
                strokeLinejoin="round"
              />
              <path
                d="M36 10C36.4267 10 41.5111 10 44 10"
                stroke="var(--shade-300)"
                strokeLinejoin="round"
              />
              <path
                d="M12 13C12.64 13 20.2667 13 24 13"
                stroke="var(--shade-300)"
                strokeLinejoin="round"
              />
              <path
                d="M12 22C12.64 22 20.2667 22 24 22"
                stroke="var(--shade-300)"
                strokeLinejoin="round"
              />
              <path
                d="M12 28C13.7067 28 34.0444 28 44 28"
                stroke="var(--shade-300)"
                strokeLinejoin="round"
              />
              <path
                d="M12 31C13.7067 31 34.0444 31 44 31"
                stroke="var(--shade-300)"
                strokeLinejoin="round"
              />
              <path
                d="M12 34C13.7067 34 34.0444 34 44 34"
                stroke="var(--shade-300)"
                strokeLinejoin="round"
              />
              <path
                d="M34 10H35"
                stroke="var(--shade-300)"
                strokeLinejoin="round"
              />
              <path
                d="M3 40H53C53 43.5147 53 45.4853 53 49H3V40Z"
                fill="var(--shade-900)"
              />
              <path
                d="M3 40H53M3 40V49H53M3 40L8 35M53 40C53 43.5147 53 45.4853 53 49M53 40L59 34M53 49L59 43V34M59 34C58.2 34 54 34 52 34"
                stroke="var(--shade-300)"
              />
            </svg>
            <div className="caption-small text-center">About me</div>
          </div>
        </div>
        <div className="relative min-w-[110px] min-h-[110px] flex items-center justify-center">
          <a
            target="blank_"
            href="https://www.instagram.com/artsbykiran/"
            className="w-18 h-22 cursor-default hover:bg-[var(--shade-850)] flex flex-col items-center rounded-sm"
          >
            <svg
              className="w-full flex-shrink-0 p-2"
              viewBox="0 0 60 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="11"
                y="9"
                width="44"
                height="32"
                fill="var(--shade-900)"
                stroke="var(--shade-300)"
              />
              <rect
                x="8"
                y="12"
                width="44"
                height="32"
                fill="var(--shade-900)"
                stroke="var(--shade-300)"
              />
              <rect
                x="13"
                y="17"
                width="34"
                height="22"
                fill="var(--shade-900)"
                stroke="var(--shade-300)"
              />
              <path
                d="M13 27.9938C18.2619 21.3353 24.3333 21.3353 29.9999 27.9938C35.6666 34.6524 40.5238 39.2629 47 33.1163"
                stroke="var(--shade-300)"
                strokeLinejoin="round"
              />
              <circle cx="37" cy="23" r="3" stroke="var(--shade-300)" />
              <rect
                x="2"
                y="34"
                width="24"
                height="16"
                fill="var(--shade-900)"
                stroke="var(--shade-300)"
              />
              <path
                d="M16 34H12V30.667H11V28H17V30.667H16V34Z"
                fill="var(--shade-900)"
              />
              <path
                d="M16 34V34.5H16.5V34H16ZM12 34H11.5V34.5H12V34ZM12 30.667H12.5V30.167H12V30.667ZM11 30.667H10.5V31.167H11V30.667ZM11 28V27.5H10.5V28H11ZM17 28H17.5V27.5H17V28ZM17 30.667V31.167H17.5V30.667H17ZM16 30.667V30.167H15.5V30.667H16ZM16 34V33.5H12V34V34.5H16V34ZM12 34H12.5V30.667H12H11.5V34H12ZM12 30.667V30.167H11V30.667V31.167H12V30.667ZM11 30.667H11.5V28H11H10.5V30.667H11ZM11 28V28.5H17V28V27.5H11V28ZM17 28H16.5V30.667H17H17.5V28H17ZM17 30.667V30.167H16V30.667V31.167H17V30.667ZM16 30.667H15.5V34H16H16.5V30.667H16Z"
                fill="var(--shade-300)"
              />
              <circle cx="14" cy="42" r="5" stroke="var(--shade-300)" />
              <circle cx="14" cy="42" r="3" stroke="var(--shade-300)" />
              <circle cx="22.5" cy="37.5" r="1.5" stroke="var(--shade-300)" />
            </svg>
            <div className="caption-small text-center">Instagram</div>
          </a>
        </div>
        <div className="relative min-w-[110px] min-h-[110px] flex items-center justify-center">
          <a
            target="blank_"
            href="mailto:kp8568@gmail.com"
            className="w-18 h-22 cursor-default hover:bg-[var(--shade-850)] flex flex-col items-center rounded-sm"
          >
            <svg
              className="w-full flex-shrink-0 p-2"
              viewBox="0 0 60 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M54 38V11H10V14" stroke="var(--shade-300)" />
              <rect
                x="7"
                y="14"
                width="44"
                height="28"
                fill="var(--shade-900)"
                stroke="var(--shade-300)"
              />
              <path
                d="M7 42L29 24L51 42"
                stroke="var(--shade-300)"
                strokeLinejoin="round"
              />
              <path
                d="M29 32L7 14H51L29 32Z"
                fill="var(--shade-900)"
                stroke="var(--shade-300)"
                strokeLinejoin="round"
              />
              <path
                d="M2 41H52C52 44.5147 52 46.4853 52 50H2V41Z"
                fill="var(--shade-900)"
              />
              <path
                d="M2 41H52M2 41V50H52M2 41L7 36M52 41C52 44.5147 52 46.4853 52 50M52 41L58 35M52 50L58 44V35M58 35C57.2 35 56 35 54 35"
                stroke="var(--shade-300)"
              />
            </svg>
            <div className="caption-small text-center">Email</div>
          </a>
        </div>
        <div className="relative min-w-[110px] min-h-[110px] flex items-center justify-center">
          <a
            target="blank_"
            href="https://www.x.com/pate1kiran"
            className="w-18 h-22 cursor-default hover:bg-[var(--shade-850)] flex flex-col items-center rounded-sm"
          >
            <svg
              className="w-full flex-shrink-0 p-2"
              viewBox="0 0 60 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M51 6H9C6.79086 6 5 7.79086 5 10V38C5 40.2091 6.79086 42 9 42H15V49L22 42H51C53.2091 42 55 40.2091 55 38V10C55 7.79086 53.2091 6 51 6Z"
                stroke="var(--shade-300)"
              />
              <path
                d="M11 12C13.0267 12 37.1778 12 49 12"
                stroke="var(--shade-300)"
                strokeLinejoin="round"
              />
              <path
                d="M11 15C13.0267 15 37.1778 15 49 15"
                stroke="var(--shade-300)"
                strokeLinejoin="round"
              />
              <path
                d="M11 18C12.28 18 27.5333 18 35 18"
                stroke="var(--shade-300)"
                strokeLinejoin="round"
              />
              <path
                d="M11 21C13.0267 21 37.1778 21 49 21"
                stroke="var(--shade-300)"
                strokeLinejoin="round"
              />
              <path
                d="M11 24C13.0267 24 37.1778 24 49 24"
                stroke="var(--shade-300)"
                strokeLinejoin="round"
              />
              <path
                d="M11 27C11.32 27 15.1333 27 17 27"
                stroke="var(--shade-300)"
                strokeLinejoin="round"
              />
              <path
                d="M11 30C13.0267 30 37.1778 30 49 30"
                stroke="var(--shade-300)"
                strokeLinejoin="round"
              />
              <path
                d="M11 33C12.44 33 29.6 33 38 33"
                stroke="var(--shade-300)"
                strokeLinejoin="round"
              />
              <path
                d="M11 36C11.64 36 19.2667 36 23 36"
                stroke="var(--shade-300)"
                strokeLinejoin="round"
              />
            </svg>
            <div className="caption-small text-center">Twitter</div>
          </a>
        </div>
        <div
          className="relative min-w-[110px] min-h-[110px] flex items-center justify-center"
          ref={shoutOuts}
        >
          <div className="w-18 h-22 cursor-default hover:bg-[var(--shade-850)] flex flex-col items-center rounded-sm">
            <svg
              className="w-full flex-shrink-0 p-2"
              viewBox="0 0 60 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29.818 30.1671C29.818 36.1726 25.1238 42.607 25.1238 45.6097C25.1238 48.1835 8.69418 48.2635 8.69418 45.6097C8.69418 42.687 4 36.1726 4 30.1671C4 23.5337 9.13142 18.1562 16.909 18.1562C24.6866 18.1562 29.818 23.5337 29.818 30.1671Z"
                fill="var(--shade-900)"
                stroke="var(--shade-300)"
                strokeWidth="0.931146"
              />
              <path
                d="M8.37423 26.3643C6.77394 30.0525 6.77409 35.5849 8.90759 46.1887"
                stroke="var(--shade-300)"
                strokeWidth="0.931146"
                strokeLinejoin="round"
              />
              <path
                d="M25.4446 26.3643C27.0449 30.0525 27.0448 35.5849 24.9113 46.1887"
                stroke="var(--shade-300)"
                strokeWidth="0.931146"
                strokeLinejoin="round"
              />
              <circle
                cx="16.9094"
                cy="13.0856"
                r="6.08563"
                fill="var(--shade-900)"
                stroke="var(--shade-300)"
                strokeWidth="0.931146"
              />
              <path
                d="M45.9998 29.3489C45.9998 36.327 40.5453 43.8036 40.5453 47.2927C40.5453 50.2834 21.4545 50.3763 21.4545 47.2927C21.4545 43.8966 16 36.327 16 29.3489C16 21.641 21.9626 15.3926 30.9999 15.3926C40.0372 15.3926 45.9998 21.641 45.9998 29.3489Z"
                fill="var(--shade-900)"
                stroke="var(--shade-300)"
              />
              <path
                d="M21.0825 24.9287C19.223 29.2144 19.2231 35.6429 21.7022 47.9641"
                stroke="var(--shade-300)"
                strokeLinejoin="round"
              />
              <path
                d="M40.9175 24.9287C42.777 29.2144 42.7769 35.6429 40.2978 47.9641"
                stroke="var(--shade-300)"
                strokeLinejoin="round"
              />
              <circle
                cx="31"
                cy="9.50004"
                r="7.07133"
                fill="var(--shade-900)"
                stroke="var(--shade-300)"
              />
              <rect
                x="30"
                y="28"
                width="27"
                height="20"
                rx="1"
                fill="var(--shade-900)"
                stroke="var(--shade-300)"
              />
              <path
                d="M34 32C35.0133 32 47.0889 32 53 32"
                stroke="var(--shade-300)"
                strokeLinejoin="round"
              />
              <path
                d="M34 35C35.0133 35 47.0889 35 53 35"
                stroke="var(--shade-300)"
                strokeLinejoin="round"
              />
              <path
                d="M34 38C35.0133 38 47.0889 38 53 38"
                stroke="var(--shade-300)"
                strokeLinejoin="round"
              />
              <path
                d="M34 41C35.0133 41 47.0889 41 53 41"
                stroke="var(--shade-300)"
                strokeLinejoin="round"
              />
              <path
                d="M34 44C34.6933 44 42.9556 44 47 44"
                stroke="var(--shade-300)"
                strokeLinejoin="round"
              />
            </svg>
            <div className="caption-small text-center">Shout outs</div>
          </div>
        </div>
        <div className="relative min-w-[110px] min-h-[110px] flex items-center justify-center">
          <a
            target="blank_"
            href="https://www.codepen.io/kiranpate1"
            className="w-18 h-22 cursor-default hover:bg-[var(--shade-850)] flex flex-col items-center rounded-sm"
          >
            <svg
              className="w-full flex-shrink-0 p-2"
              viewBox="0 0 60 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="8"
                y="9"
                width="47"
                height="35"
                rx="4"
                fill="var(--shade-900)"
                stroke="var(--shade-300)"
              />
              <rect
                x="5"
                y="12"
                width="47"
                height="35"
                rx="4"
                fill="var(--shade-900)"
                stroke="var(--shade-300)"
              />
              <path
                d="M13 19C13 19 13 23 13 25M13 19C13 17 15 17 15 17H16M13 19V25M13 19C13 17 11 17 11 17H10M13 25C13 27 15 27 15 27H16M13 25C13 27 11 27 11 27H10"
                stroke="var(--shade-300)"
                strokeLinejoin="round"
              />
              <path
                d="M36 35L31 38L36 41"
                stroke="var(--shade-300)"
                strokeLinejoin="round"
              />
              <path
                d="M42 35L47 38L42 41"
                stroke="var(--shade-300)"
                strokeLinejoin="round"
              />
              <path
                d="M37 43L41 33"
                stroke="var(--shade-300)"
                strokeLinejoin="round"
              />
            </svg>
            <div className="caption-small text-center">Codepen</div>
          </a>
        </div>
        <div className="absolute right-[5vh] top-[5vh] min-w-[110px] min-h-[110px] flex items-center justify-center">
          <div className="w-18 h-22 cursor-default hover:bg-[var(--shade-850)] flex flex-col items-center rounded-sm">
            <svg
              className="w-full flex-shrink-0 p-2"
              viewBox="0 0 60 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 9V42C10 44.2091 11.7909 46 14 46H53C54.1046 46 55 45.1046 55 44V14C55 11.7909 53.2091 10 51 10H32.9225C31.7074 10 30.5581 9.44764 29.799 8.49878L28.201 6.50122C27.4419 5.55236 26.2926 5 25.0775 5H14C11.7909 5 10 6.79086 10 9Z"
                stroke="var(--shade-300)"
              />
              <path
                d="M6 17C6 14.7909 7.79086 13 10 13H47C49.2091 13 51 14.7909 51 17V44C51 45.1046 51.8954 46 53 46H10C7.79086 46 6 44.2091 6 42V17Z"
                fill="var(--shade-900)"
                stroke="var(--shade-300)"
              />
            </svg>
            <div className="caption-small text-center">My Music</div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-6 border-b border-[var(--shade-300)] bg-[var(--shade-900)] flex items-center justify-between pl-3 pr-2 caption-small">
        <div className="flex items-center gap-4">
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
