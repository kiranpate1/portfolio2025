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

    const applications = screen.current.querySelectorAll(
      ":scope > *"
    ) as NodeListOf<Element>;

    if (sectionProgress > 1.5 && !showLinks.current) {
      showLinks.current = true;

      applications.forEach((a, i) => {
        setTimeout(() => {
          (a as HTMLElement).style.pointerEvents = "none";
          (a as HTMLElement).style.opacity = "0";
        }, (applications.length - i) * 25);
      });
    } else if (sectionProgress <= 1.5 && showLinks.current) {
      showLinks.current = false;

      applications.forEach((a, i) => {
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
  const notes = useRef<HTMLDivElement>(null);
  const myMusic = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !screen.current ||
      !aboutMe.current ||
      !shoutOuts.current ||
      !notes.current ||
      !myMusic.current
    )
      return;

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

        const href = a.querySelector(":scope > *")?.getAttribute("href");
        console.log("sdfd");
        if (href) {
          setTimeout(() => {
            console.log("opening");
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
      createModal(title, content);
    });

    shoutOuts.current.addEventListener("click", () => {
      const title = "Shout Outs";
      const people = [
        { name: "Ali R", website: "aliasgers.space" },
        { name: "Alvin L", website: "alvinn.design" },
        { name: "Ben G", website: "bengiannis.com" },
        { name: "Benya S", website: "sutyanyong.com" },
        { name: "Bernie S", website: "berniesanders.com" },
        { name: "Beyoncé K", website: "beyonce.com" },
        { name: "Ethan M", website: "ethanma.com" },
        { name: "Grace W", website: "gracewalker.ca" },
        { name: "Jazmine S", website: "jazminesullivanmusic.com" },
        { name: "Jenny R", website: "jenrudz.art" },
        { name: "Jessica L", website: "jessicalai.me" },
        { name: "Kelly C", website: "kellychong.com" },
        { name: "Kelly R", website: "kellyrowland.com" },
        { name: "Kendrick L", website: "oklama.com" },
        { name: "Lucy L", website: "lucyliu.net" },
        { name: "Mariah C", website: "mariahcarey.com" },
        { name: "Mitul S", website: "typicalmitul.com" },
        { name: "Nashid C", website: "nashidchroma.com" },
        { name: "Natalie A", website: "nataliealmosa.ca" },
        { name: "Paco L", website: "pacolui.com" },
        { name: "Sam Y", website: "instagram.com/samdoesarts" },
        { name: "Shen G", website: "shen.land" },
        { name: "Thano S", website: "thanosipsis.com" },
        { name: "Tyler O", website: "golfwang.com" },
        { name: "Vanessa B", website: "otherkind.design" },
        { name: "Virgil A", website: "virgilabloh.com" },
        { name: "Yu H", website: "luyuhang.net" },
        { name: "Zohran M", website: "zohranfornyc.com" },
      ];
      let content = "";
      people.forEach((person) => {
        content += `
        <p class='paragraph text-[var(--shade-300)] text-pretty'>
          ${person.name} - <a href="https://${person.website}" target="_blank" class="caption-small cursor-pointer text-[var(--shade-50)] hover:underline">${person.website}</a>
        </p>`;
      });
      createModal(title, content);
    });

    notes.current.addEventListener("click", () => {
      const title = "Notes";
      const content = `Nothing here yet, but stay tuned for when I jot down some thoughts!`;
      createModal(title, content);
    });

    myMusic.current.addEventListener("click", () => {
      const title = "My Music";
      const songs = [
        { title: "Peachy", artist: "Kiran Patel" },
        { title: "Lemonade", artist: "Kiran Patel" },
        { title: "Cherry", artist: "Kiran Patel" },
      ];
      let content = "";
      songs.forEach((song) => {
        content += `
        <div class='relative inset-[0_-12px_0_-12px] w-[calc(100%+24px)] h-5 text-[var(--shade-300)] hover:text-[var(--shade-900)] hover:bg-[var(--shade-300)] flex items-center px-3 gap-2'>
          <svg height="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="currentColor"/>
            <path d="M7.40332 11.498C7.67429 11.9667 8.06703 12.3549 8.54004 12.6191L5.52734 18.0312L2.03906 14.5967L7.40332 11.498Z" fill="currentColor"/>
            <path d="M17.9609 5.4043L12.5957 8.50098C12.3245 8.03243 11.9321 7.64391 11.459 7.37988L14.4727 1.96973L17.9609 5.4043Z" fill="currentColor"/>
            <circle cx="10" cy="10" r="3" stroke="currentColor"/>
          </svg>
          <p class='caption-small text-pretty'>${song.title} - ${song.artist}</p>
        </div>`;
      });
      createModal(title, content);
    });

    const createModal = (title: string, content: string) => {
      const modal = document.createElement("div");
      modal.className =
        "absolute top-[50%] left-[50%] w-[40%] max-w-[600px] min-w-[300px] h-[80%] min-h-[300px] bg-[var(--shade-900)] overflow-scroll border border-[var(--shade-300)] rounded-2xl p-6 translate-x-[-50%] translate-y-[-50%] z-50";
      modal.style.transition =
        "width 0.3s ease, min-width 0.3s ease, max-width 0.3s ease, min-height 0.3s ease, height 0.3s ease";
      modal.innerHTML =
        `
      <div class='reposition absolute top-0 left-0 w-full h-6 border-b border-[var(--shade-300)] bg-[var(--shade-900)] flex items-center justify-between pl-3 caption-small cursor-all-scroll'>
        <div class='flex items-center gap-4'>` +
        title +
        `</div>
        <div class='flex items-center h-full cursor-default'>
          <div class='resize w-8 h-full flex items-center justify-center border-l border-[var(--shade-300)] text-[var(--shade-300)] hover:text-[var(--shade-900)] hover:bg-[var(--shade-300)]'>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.28571 3.28571V2.14286C3.28571 1.51167 3.79739 1 4.42857 1H7.85714C8.48833 1 9 1.51167 9 2.14286V5.57143C9 6.20261 8.48833 6.71429 7.85714 6.71429H6.71429M3.28571 3.28571H2.14286C1.51167 3.28571 1 3.79739 1 4.42857V7.85714C1 8.48833 1.51167 9 2.14286 9H5.57143C6.20261 9 6.71429 8.48833 6.71429 7.85714V6.71429M3.28571 3.28571H5.57143C6.20261 3.28571 6.71429 3.79739 6.71429 4.42857V6.71429" stroke="currentColor"/>
            </svg>
          </div>
          <div class='close-modal w-8 h-full flex items-center justify-center border-l border-[var(--shade-300)] text-[var(--shade-300)] hover:text-[var(--shade-900)] hover:bg-[var(--shade-300)]'>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 8.5L8.5 1.5M8.5 8.5L1.5 1.5" stroke="currentColor" stroke-width="1.25"/>
            </svg>
          </div>
        </div>
      </div>` +
        "<div class='absolute w-full left-0 top-6 py-2 px-3 overflow-scroll'>" +
        content +
        "</div>";

      const reposition = modal.querySelector(".reposition") as HTMLElement;
      const resizeButton = modal.querySelector(".resize") as HTMLElement;
      const closeButton = modal.querySelector(".close-modal") as HTMLElement;
      let isDragging = false;
      let dragStart = { x: 0, y: 0 };
      let dragOffset = { x: 0, y: 0 };

      reposition.addEventListener("mousedown", (e) => {
        // Ignore if clicking on resize or close buttons
        if (
          e.target === resizeButton ||
          e.target === closeButton ||
          resizeButton?.contains(e.target as Node) ||
          closeButton?.contains(e.target as Node)
        ) {
          return;
        }
        isDragging = true;
        dragStart = { x: e.clientX, y: e.clientY };

        e.preventDefault();
      });

      document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - dragStart.x + dragOffset.x;
        const deltaY = e.clientY - dragStart.y + dragOffset.y;
        modal.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      });

      document.addEventListener("mouseup", (e) => {
        if (!isDragging) return;
        isDragging = false;
        dragOffset = {
          x: dragOffset.x + (e.clientX - dragStart.x),
          y: dragOffset.y + (e.clientY - dragStart.y),
        };
      });

      let isResized = false;
      if (resizeButton) {
        resizeButton.addEventListener("click", () => {
          if (!isResized) {
            modal.classList.remove(
              "w-[40%]",
              "max-w-[600px]",
              "min-w-[300px]",
              "h-[80%]",
              "min-h-[300px]"
            );
            modal.style.width = "90%";
            modal.style.maxWidth = "90%";
            modal.style.minWidth = "90%";
            modal.style.height = "90%";
            modal.style.minHeight = "90%";
          } else {
            modal.classList.add(
              "w-[40%]",
              "max-w-[600px]",
              "min-w-[300px]",
              "h-[80%]",
              "min-h-[300px]"
            );
            modal.style.width = "";
            modal.style.maxWidth = "";
            modal.style.minWidth = "";
            modal.style.height = "";
            modal.style.minHeight = "";
          }
          isResized = !isResized;
        });
      }

      if (closeButton) {
        closeButton.addEventListener("click", () => {
          modal.remove();
        });
      }
      setTimeout(() => {
        if (!screen.current) return;
        screen.current.appendChild(modal);
      }, 600);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="window absolute flex flex-col items-stretch w-full border border-[var(--shade-300)] text-[var(--shade-300)] rounded-[16px] overflow-hidden z-1 bg-[var(--shade-900)]"
    >
      <div
        className="socials absolute w-full h-[calc(100vh-252px)] max-h-[800px] left-0 top-6 p-[5vh] flex flex-col flex-wrap gap-4 items-start content-start"
        ref={screen}
      >
        <div
          className="relative min-w-[110px] min-h-[110px] flex items-center justify-center"
          ref={aboutMe}
        >
          <div className="w-18 h-22 cursor-default hover:bg-[var(--shade-850)] text-[var(--shade-300)] hover:text-[var(--shade-200)] flex flex-col items-center rounded-sm">
            <svg
              className="w-full flex-shrink-0 p-2"
              viewBox="0 0 60 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 6V2H52V40M12 6H8V40M12 6C26.0589 6 33.9411 6 48 6V40M3 40H53M3 40V49H53M3 40L8 35M53 40C53 43.5147 53 45.4853 53 49M53 40L59 34M53 49L59 43V34M59 34C58.2 34 54 34 52 34M12 10H24M34 10H35M36 10L44 10M12 13H24M12 22H24M12 28H44M12 31H44M12 34H44"
                stroke="currentColor"
              />
            </svg>
            <div className="caption-small text-center">About me</div>
          </div>
        </div>
        <div className="relative min-w-[110px] min-h-[110px] flex items-center justify-center">
          <a
            target="blank_"
            href="https://www.instagram.com/artsbykiran/"
            className="w-18 h-22 cursor-default hover:bg-[var(--shade-850)] text-[var(--shade-300)] hover:text-[var(--shade-200)] flex flex-col items-center rounded-sm"
          >
            <svg
              className="w-full flex-shrink-0 p-2"
              viewBox="0 0 60 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 12V9H55V41H52M11 12H8V34M11 12H52V41M52 41V44H26M13 27.9938C18.2619 21.3354 24.3333 21.3354 29.9999 27.9938C35.6666 34.6523 40.5238 39.2628 47 33.1163M13 27.5V17H47C47 25.5915 47 30.4085 47 39H26M26 39V34H2V50H26V39ZM40 23C40 24.6569 38.6569 26 37 26C35.3431 26 34 24.6569 34 23C34 21.3431 35.3431 20 37 20C38.6569 20 40 21.3431 40 23ZM16 34H12V30.667H11V28H17V30.667H16V34ZM24 37.5C24 38.3284 23.3284 39 22.5 39C21.6716 39 21 38.3284 21 37.5C21 36.6716 21.6716 36 22.5 36C23.3284 36 24 36.6716 24 37.5ZM19 42C19 44.7614 16.7614 47 14 47C11.2386 47 9 44.7614 9 42C9 39.2386 11.2386 37 14 37C16.7614 37 19 39.2386 19 42ZM17 42C17 43.6569 15.6569 45 14 45C12.3431 45 11 43.6569 11 42C11 40.3431 12.3431 39 14 39C15.6569 39 17 40.3431 17 42Z"
                stroke="currentColor"
              />
            </svg>
            <div className="caption-small text-center">Instagram</div>
          </a>
        </div>
        <div className="relative min-w-[110px] min-h-[110px] flex items-center justify-center">
          <a
            target="blank_"
            href="mailto:kp8568@gmail.com"
            className="w-18 h-22 cursor-default hover:bg-[var(--shade-850)] text-[var(--shade-300)] hover:text-[var(--shade-200)] flex flex-col items-center rounded-sm"
          >
            <svg
              className="w-full flex-shrink-0 p-2"
              viewBox="0 0 60 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 14H51M7 14C7 24.5442 7 30.4558 7 41M7 14L24.1111 28M51 14V41M51 14L33.8889 28M54 39V11H10V14M2 41V50H52M2 41L7 36M2 41H8.22222M52 41C52 44.5147 52 46.4853 52 50M52 41L58 35M52 41H49.7778M52 50L58 44V35M58 35C57.2 35 56 35 54 35M49.7778 41H8.22222M49.7778 41L33.8889 28M8.22222 41L24.1111 28M33.8889 28L29 32L24.1111 28"
                stroke="currentColor"
              />
            </svg>
            <div className="caption-small text-center">Email</div>
          </a>
        </div>
        <div className="relative min-w-[110px] min-h-[110px] flex items-center justify-center">
          <a
            target="blank_"
            href="https://www.x.com/pate1kiran"
            className="w-18 h-22 cursor-default hover:bg-[var(--shade-850)] text-[var(--shade-300)] hover:text-[var(--shade-200)] flex flex-col items-center rounded-sm"
          >
            <svg
              className="w-full flex-shrink-0 p-2"
              viewBox="0 0 60 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 12H49M11 15H49M11 18H35M11 21H49M11 27H17M11 30H49M11 33H38M11 36H23M11 24H49M9 6C25.402 6 34.598 6 51 6C53.2091 6 55 7.79086 55 10V38C55 40.2091 53.2091 42 51 42H22L15 49V42H9C6.79086 42 5 40.2091 5 38V10C5 7.79086 6.79086 6 9 6Z"
                stroke="currentColor"
              />
            </svg>
            <div className="caption-small text-center">Twitter</div>
          </a>
        </div>
        <div
          className="relative min-w-[110px] min-h-[110px] flex items-center justify-center"
          ref={shoutOuts}
        >
          <div className="w-18 h-22 cursor-default hover:bg-[var(--shade-850)] text-[var(--shade-300)] hover:text-[var(--shade-200)] flex flex-col items-center rounded-sm">
            <svg
              className="w-full flex-shrink-0 p-2"
              viewBox="0 0 60 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.0824 24.9287C19.2227 29.2144 19.2229 35.6429 21.7022 47.9641M40.9176 24.9287C41.3143 25.8428 41.6263 26.8545 41.8478 28M27.6056 15.7049C28.6132 16.2573 29.7699 16.5714 31 16.5714C32.2301 16.5714 33.3869 16.2573 34.3944 15.705M27.6056 15.7049C25.4143 14.5036 23.9287 12.1753 23.9287 9.50004C23.9287 5.59465 27.0947 2.42871 31 2.42871C34.9054 2.42871 38.0714 5.59465 38.0714 9.50004C38.0714 12.1753 36.5857 14.5037 34.3944 15.705M27.6056 15.7049C20.4996 17.0586 16 22.6531 16 29.3489C16 36.3078 21.4245 43.8549 21.4544 47.2646M34.3944 15.705C41.0174 16.9667 45.3762 21.9123 45.9381 28M8.37418 26.3644C6.77372 30.0527 6.77388 35.5851 8.90759 46.1888M13.9873 18.4253C14.8545 18.9009 15.8502 19.1713 16.909 19.1713C17.9678 19.1713 18.9635 18.9009 19.8307 18.4253M13.9873 18.4253C12.1017 17.3914 10.8234 15.3878 10.8234 13.0856C10.8234 9.72463 13.548 7 16.909 7C20.27 7 22.9946 9.72463 22.9946 13.0856C22.9946 15.3878 21.7163 17.3914 19.8307 18.4253M13.9873 18.4253C7.87212 19.5905 4 24.405 4 30.1673C4 36.1727 8.69418 42.6872 8.69418 45.6099C8.69418 47.4521 16.6119 47.9769 21.4544 47.2646M19.8307 18.4253C20.2302 18.5014 20.6201 18.5931 21 18.6996M21.4544 47.2646C21.4545 47.274 21.4545 47.2834 21.4545 47.2927C21.4545 50.1111 37.4021 50.2758 40.1458 48M41.8478 28H31C30.4477 28 30 28.4477 30 29V47C30 47.5523 30.4477 48 31 48H40.1458M41.8478 28H45.9381M45.9381 28H56C56.5523 28 57 28.4477 57 29V47C57 47.5523 56.5523 48 56 48H40.1458M34 32H53M34 35H53M34 38H53M34 41H53M34 44H47"
                stroke="currentColor"
              />
            </svg>
            <div className="caption-small text-center">Shout outs</div>
          </div>
        </div>
        <div className="relative min-w-[110px] min-h-[110px] flex items-center justify-center">
          <a
            target="blank_"
            href="https://www.codepen.io/kiranpate1"
            className="w-18 h-22 cursor-default hover:bg-[var(--shade-850)] text-[var(--shade-300)] hover:text-[var(--shade-200)] flex flex-col items-center rounded-sm"
          >
            <svg
              className="w-full flex-shrink-0 p-2"
              viewBox="0 0 60 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.10135 12.1013C8.50915 10.3249 10.0998 9 12 9H51C53.2091 9 55 10.7909 55 13V40C55 41.9002 53.6751 43.4909 51.8987 43.8987M8.10135 12.1013C8.39021 12.035 8.69101 12 9 12C24.2304 12 32.7696 12 48 12C50.2091 12 52 13.7909 52 16V43C52 43.309 51.965 43.6098 51.8987 43.8987M8.10135 12.1013C6.32493 12.5091 5 14.0998 5 16V43C5 45.2091 6.79086 47 9 47H48C49.9002 47 51.4909 45.6751 51.8987 43.8987M13 19V25M13 19C13 17 15 17 15 17H16M13 19C13 17 11 17 11 17H10M13 25C13 27 15 27 15 27H16M13 25C13 27 11 27 11 27H10M36 35L31 38L36 41M37 43L41 33M42 35L47 38L42 41"
                stroke="currentColor"
                strokeLinejoin="round"
              />
            </svg>
            <div className="caption-small text-center">Codepen</div>
          </a>
        </div>

        <div
          className="relative min-w-[110px] min-h-[110px] flex items-center justify-center"
          ref={notes}
        >
          <div className="w-18 h-22 cursor-default hover:bg-[var(--shade-850)] text-[var(--shade-300)] hover:text-[var(--shade-200)] flex flex-col items-center rounded-sm">
            <svg
              className="w-full flex-shrink-0 p-2"
              viewBox="0 0 60 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1013 6.10135C12.5091 4.32493 14.0998 3 16 3H48C50.2091 3 52 4.79086 52 7V44C52 45.9002 50.6751 47.4909 48.8987 47.8987M12.1013 6.10135C12.3902 6.03503 12.691 6 13 6H45C47.2091 6 49 7.79086 49 10V47C49 47.309 48.965 47.6098 48.8987 47.8987M12.1013 6.10135C10.3249 6.50915 9 8.09985 9 10V47C9 49.2091 10.7909 51 13 51H45C46.9002 51 48.4909 49.6751 48.8987 47.8987M14 10C12.8954 10 12 7.98528 12 5.5C12 3.01472 12.8954 1 14 1C14.6934 1 15.3044 1.79401 15.6632 3M19 10C17.8954 10 17 7.98528 17 5.5C17 3.01472 17.8954 1 19 1C19.6934 1 20.3044 1.79401 20.6632 3M24 10C22.8954 10 22 7.98528 22 5.5C22 3.01472 22.8954 1 24 1C24.6934 1 25.3044 1.79401 25.6632 3M29 10C27.8954 10 27 7.98528 27 5.5C27 3.01472 27.8954 1 29 1C29.6934 1 30.3044 1.79401 30.6632 3M34 10C32.8954 10 32 7.98528 32 5.5C32 3.01472 32.8954 1 34 1C34.6934 1 35.3044 1.79401 35.6632 3M39 10C37.8954 10 37 7.98528 37 5.5C37 3.01472 37.8954 1 39 1C39.6934 1 40.3044 1.79401 40.6632 3M44 10C42.8954 10 42 7.98528 42 5.5C42 3.01472 42.8954 1 44 1C44.6934 1 45.3044 1.79401 45.6632 3M13 17H25M13 20H45M13 23H45M13 26H45M13 32H45M13 35H45M13 38H45M13 41H37"
                stroke="currentColor"
              />
              <circle cx="14" cy="10" r="1" fill="currentColor" />
              <circle cx="44" cy="10" r="1" fill="currentColor" />
              <circle cx="39" cy="10" r="1" fill="currentColor" />
              <circle cx="34" cy="10" r="1" fill="currentColor" />
              <circle cx="29" cy="10" r="1" fill="currentColor" />
              <circle cx="24" cy="10" r="1" fill="currentColor" />
              <circle cx="19" cy="10" r="1" fill="currentColor" />
            </svg>
            <div className="caption-small text-center">Notes</div>
          </div>
        </div>
        <div
          className="absolute right-[5vh] top-[5vh] min-w-[110px] min-h-[110px] flex items-center justify-center"
          ref={myMusic}
        >
          <div className="w-18 h-22 cursor-default hover:bg-[var(--shade-850)] text-[var(--shade-300)] hover:text-[var(--shade-200)] flex flex-col items-center rounded-sm">
            <svg
              className="w-full flex-shrink-0 p-2"
              viewBox="0 0 60 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M53 46H10C7.79086 46 6 44.2091 6 42V17C6 14.7909 7.79086 13 10 13M53 46C51.8954 46 51 45.1046 51 44V17C51 14.7909 49.2091 13 47 13C32.5506 13 24.4494 13 10 13M53 46C54.1046 46 55 45.1046 55 44V14C55 11.7909 53.2091 10 51 10H32.9225C31.7074 10 30.5581 9.44764 29.799 8.49878L28.201 6.50122C27.4419 5.55236 26.2926 5 25.0775 5H14C11.7909 5 10 6.79086 10 9V13"
                stroke="currentColor"
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
