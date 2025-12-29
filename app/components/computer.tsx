import React, { useRef, useEffect } from "react";
import Projects from "./projects";

type props = {
  sectionProgress?: number;
};

const Computer = ({ sectionProgress }: props) => {
  const desktopRef = useRef<HTMLDivElement | null>(null);
  const computerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const typingRef = useRef<HTMLDivElement | null>(null);
  let showLinks = useRef(false);
  const primaryDeviceColor = "#1D1E20";
  const secondaryDeviceColor = "var(--surface)";

  useEffect(() => {
    if (
      sectionProgress === undefined ||
      desktopRef.current === null ||
      !computerRef.current
      // !imageRef.current
    )
      return;

    // Calculate progress values
    const progressAdj =
      (Math.min(Math.max(sectionProgress - (Projects.length + 1), 0), 0.75) *
        4) /
      3;
    const easedProgress = progressAdj;
    console.log(easedProgress);

    // Apply transforms directly to DOM for smooth animation
    computerRef.current.style.transform = `rotateX(${
      -100 + easedProgress * 100
    }deg)`;
    // imageRef.current.style.filter = `brightness(${
    //   1 + easedProgress * 0.5
    // }) contrast(${1 - easedProgress * 0.5}) saturate(${
    //   1 - easedProgress * 0.5
    // })`;

    desktopRef.current.style.opacity = `${easedProgress * 2}`;
  }, [sectionProgress]);

  useEffect(() => {
    if (
      !sectionProgress ||
      !desktopRef.current ||
      !computerRef.current ||
      // !imageRef.current ||
      !typingRef.current
    )
      return;

    const svgElement = typingRef.current.querySelector("svg");
    if (svgElement) {
      svgElement.querySelectorAll("path").forEach((path) => {
        path.style.strokeWidth = `500`;
      });
    }

    if (sectionProgress > Projects.length + 1.5) {
      const normalizedProgress =
        (sectionProgress - (Projects.length + 1.5)) * 2.04;
      const easeOutQuad = (t: number) => t * (2 - t);
      const easedProgress = easeOutQuad(normalizedProgress);
      if (svgElement) {
        svgElement.querySelectorAll("path").forEach((path) => {
          path.style.strokeWidth = `${Math.max(0, 500 - easedProgress * 500)}`;
        });
        svgElement.style.transform = `skewX(${
          -40 + normalizedProgress * 40
        }deg)`;
      }
      // desktopRef.current.style.opacity = "1";
    } else {
      // desktopRef.current.style.opacity = "0";
    }

    if (sectionProgress > Projects.length + 1.9 && !showLinks.current) {
      showLinks.current = true;
      typingRef.current.querySelectorAll("a").forEach((a, i) => {
        setTimeout(() => {
          (a as HTMLElement).style.pointerEvents = "auto";
          (a as HTMLElement).style.opacity = "1";
        }, 100 * i + 150);
      });
    } else if (sectionProgress <= Projects.length + 1.9 && showLinks.current) {
      showLinks.current = false;
      typingRef.current.querySelectorAll("a").forEach((a, i) => {
        setTimeout(() => {
          (a as HTMLElement).style.pointerEvents = "none";
          (a as HTMLElement).style.opacity = "0";
        }, 50 * i);
      });
    }
  }, [sectionProgress]);
  return (
    <div
      ref={desktopRef}
      className="absolute inset-0 z-2 overflow-hidden rounded-2xl text-[var(--shade-300)] bg-[var(--shade-900)]"
    >
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="absolute transform-3d perspective-distant">
          <div
            ref={computerRef}
            className="computer w-[calc((50vh-48px)*1.253)] max-w-[calc(100vw-100px)] md:max-w-[calc(100vw-350px)] relative flex justify-center items-center transform-3d"
          >
            <div
              className="absolute w-[82%] aspect-[405/304] bg-[var(--screen)] overflow-hidden"
              // style={{
              //   clipPath:
              //     "path('M6.02468 26.3161C6.78034 19.3829 11.679 13.7121 18.5195 12.3521C99.2139 -3.69155 308.961 -3.68907 389.613 12.3601C396.433 13.7172 401.325 19.3585 402.091 26.2697C409.97 97.3632 409.97 208.095 402.091 279.189C401.325 286.1 396.424 291.744 389.607 293.119C309.727 309.228 111.196 309.143 19.1337 292.865C12.0128 291.605 6.72967 285.817 5.93783 278.629C-1.88572 207.611 -1.85678 98.6291 6.02468 26.3161Z')",
              // }}
            >
              <div
                ref={typingRef}
                className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full flex flex-col gap-4 justify-center"
              >
                <div className="relative h-[15%] w-full">
                  <svg
                    className="h-full left-[50%] translate-x-[-50%] absolute"
                    viewBox="-630 0 2000 92"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.144 91.392H0L16.128 0H38.272L31.744 36.864L69.76 0H96.256L54.656 39.168L79.36 91.392H54.784L38.272 54.144L26.88 64.256L22.144 91.392Z"
                      fill="var(--shade-400)"
                      stroke="var(--shade-400)"
                    />
                    <path
                      d="M100.883 0H123.027L106.899 91.392H84.7551L100.883 0Z"
                      fill="var(--shade-350)"
                      stroke="var(--shade-350)"
                    />
                    <path
                      d="M115.423 91.264L131.551 0H168.159C189.151 0 199.135 11.776 199.135 24.96C199.135 41.216 185.439 48.768 174.815 50.944C185.695 53.376 187.231 60.8 188.639 70.144C189.663 77.312 191.455 85.504 193.375 91.008V91.392H171.359C169.439 86.784 168.159 79.744 166.623 70.784C165.215 62.08 161.375 58.496 149.983 58.496H143.327L137.567 91.264H115.423ZM146.143 41.6H155.999C168.031 41.6 177.375 38.528 177.375 28.032C177.375 21.632 173.407 17.28 161.503 17.28H150.239L146.143 41.6Z"
                      fill="var(--shade-300)"
                      stroke="var(--shade-300)"
                    />
                    <path
                      d="M215.928 91.392H192.376L240.888 0H268.536L284.664 91.392H261.368L258.424 70.4H226.552L215.928 91.392ZM235.128 53.12H255.992L251.256 20.48H251L235.128 53.12Z"
                      fill="var(--shade-250)"
                      stroke="var(--shade-250)"
                    />
                    <path
                      d="M305.683 0H335.507L348.435 44.16C351.123 53.888 352.787 61.696 353.939 65.152C355.347 56.576 357.011 47.104 358.931 36.352L365.331 0H386.707L370.579 91.392H340.755L330.387 56.064C326.803 42.112 323.475 29.824 322.451 24.832C321.043 33.152 318.611 48.128 316.819 58.112L311.059 91.392H289.555L305.683 0Z"
                      fill="var(--shade-200)"
                      stroke="var(--shade-200)"
                    />
                    <path
                      d="M419.93 42.752C427.994 42.752 439.77 40.576 439.77 28.8C439.77 20.608 432.602 18.176 424.666 18.176H414.042L409.69 42.752H419.93ZM378.97 91.392L395.098 0H430.042C453.21 0 461.658 16 461.658 27.392C461.658 50.176 441.178 61.056 420.954 61.056H406.49L401.114 91.392H378.97Z"
                      fill="var(--shade-150)"
                      stroke="var(--shade-150)"
                    />
                    <path
                      d="M544.745 72.832H564.969L561.641 91.392H541.417L544.745 72.832Z"
                      fill="var(--shade-50)"
                      stroke="var(--shade-50)"
                    />
                    <path
                      d="M705.573 0H727.717L715.045 72.576H755.237L751.909 91.392H689.445L705.573 0Z"
                      fill="var(--accent)"
                      stroke="var(--accent)"
                    />
                    <path
                      d="M698.759 0L695.431 18.816H655.879L652.807 36.48H689.671L686.599 54.528H649.607L646.407 72.576H686.343L683.015 91.392H620.935L637.063 0H698.759Z"
                      fill="var(--accent)"
                      stroke="var(--accent)"
                    />
                    <path
                      d="M556.056 18.816L559.384 0H632.216L628.888 18.816H603.416L590.744 91.392H568.6L581.272 18.816H556.056Z"
                      fill="var(--accent)"
                      stroke="var(--accent)"
                    />
                    <path
                      d="M466.478 91.392H442.926L491.438 0H519.086L535.214 91.392H511.918L508.974 70.4H477.102L466.478 91.392ZM485.678 53.12H506.542L501.806 20.48H501.55L485.678 53.12Z"
                      fill="var(--shade-100)"
                      stroke="var(--shade-100)"
                    />
                  </svg>
                  <div className="absolute h-full inset-0 flex flex-col gap-[1px] py-[1px]">
                    {Array.from({ length: 9 }).map((_, index) => (
                      <div
                        key={index}
                        className="relative min-h-[10%] w-full flex items-center"
                      >
                        <div className="h-full w-full bg-[var(--screen)]"></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center gap-8 w-full caption-small text-[var(--shade-400)]">
                  <a
                    href="#"
                    target="_blank"
                    className="opacity-0 hover:text-[var(--shade-50)]"
                  >
                    Instagram
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    className="opacity-0 hover:text-[var(--shade-50)]"
                  >
                    Twitter
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    className="opacity-0 hover:text-[var(--shade-50)]"
                  >
                    Linkedin
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    className="opacity-0 hover:text-[var(--shade-50)]"
                  >
                    Email
                  </a>
                </div>
              </div>
              {/* <img
                ref={imageRef}
                className="w-full h-full object-cover"
                // src="https://blog.sciencemuseum.org.uk/wp-content/uploads/2017/10/Pacman.gif"
                src="https://i.pinimg.com/originals/6d/46/f9/6d46f977733e6f9a9fa8f356e2b3e0fa.gif"
                // src="https://i.pinimg.com/originals/5b/8a/5a/5b8a5aaa765a0b6096a5175588a2caef.gif"
                // src="https://i.imgflip.com/7xbpel.gif"
              /> */}

              {/* <div className="gradient-blur absolute inset-0 z-2">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div> */}

              {/* <div className="absolute inset-0 flex flex-col justify-stretch gap-1 blur-[2px] mix-blend-color-dodge z-10">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} className="w-full h-1 bg-[#1daef1]" />
                ))}
              </div> */}
            </div>
            <svg
              className="relative w-full pointer-events-none"
              viewBox="0 0 517 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.73017 11.3857C7.88474 9.43005 9.36335 7.88931 11.3192 7.73716C135.348 -1.91138 381.654 -1.9114 505.682 7.73716C507.638 7.88931 509.116 9.43004 509.271 11.3857C518.91 133.344 518.91 266.657 509.271 388.614C509.116 390.57 507.638 392.111 505.682 392.263C381.654 401.912 135.348 401.912 11.3191 392.263C9.36332 392.111 7.88474 390.57 7.73017 388.614C-1.90938 266.658 -1.9094 133.344 7.73017 11.3857ZM445.28 52.5791C360.792 37.1448 156.324 37.1415 71.7798 52.5684C62.1629 54.3233 55.1552 62.3308 54.1597 72.0557C46.6507 145.41 46.6136 255.014 54.0483 327.24C55.0864 337.323 62.5417 345.467 72.5415 347.123C167.473 362.849 361.741 362.959 445.277 347.454C454.86 345.675 461.863 337.706 462.87 328.012C470.377 255.681 470.377 144.319 462.87 71.9893C461.863 62.2946 454.868 54.3308 445.28 52.5791Z"
                fill={secondaryDeviceColor}
              />
              <path
                d="M445.28 52.5791L445.37 52.0872L445.37 52.0872L445.28 52.5791ZM71.7798 52.5684L71.69 52.0765L71.69 52.0765L71.7798 52.5684ZM54.1597 72.0557L53.6623 72.0047L53.6623 72.0047L54.1597 72.0557ZM54.0483 327.24L53.551 327.291L53.551 327.291L54.0483 327.24ZM72.5415 347.123L72.4598 347.616L72.4598 347.616L72.5415 347.123ZM445.277 347.454L445.368 347.946L445.368 347.946L445.277 347.454ZM462.87 328.012L463.367 328.063L463.367 328.063L462.87 328.012ZM462.87 71.9893L463.367 71.9376L463.367 71.9376L462.87 71.9893ZM11.3191 392.263L11.2804 392.761L11.3191 392.263ZM7.73017 388.614L7.23172 388.654L7.73017 388.614ZM509.271 388.614L508.772 388.575L509.271 388.614ZM509.271 11.3857L509.769 11.3463L509.271 11.3857ZM11.3192 7.73716L11.358 8.23565C135.361 -1.41088 381.641 -1.4109 505.643 8.23565L505.682 7.73716L505.721 7.23867C381.667 -2.4119 135.335 -2.41188 11.2804 7.23867L11.3192 7.73716ZM509.271 11.3857L508.772 11.4251C518.41 133.357 518.41 266.644 508.772 388.575L509.271 388.614L509.769 388.654C519.411 266.67 519.411 133.331 509.769 11.3463L509.271 11.3857ZM505.682 392.263L505.643 391.764C381.641 401.412 135.36 401.412 11.3579 391.764L11.3191 392.263L11.2804 392.761C135.335 402.413 381.667 402.413 505.721 392.761L505.682 392.263ZM7.73017 388.614L8.22862 388.575C-1.40886 266.645 -1.40888 133.357 8.22862 11.4251L7.73017 11.3857L7.23173 11.3463C-2.40992 133.331 -2.4099 266.671 7.23172 388.654L7.73017 388.614ZM445.28 52.5791L445.37 52.0872C403.079 44.3616 330.803 40.5025 258.551 40.5008C186.299 40.499 114.009 44.3546 71.69 52.0765L71.7798 52.5684L71.8695 53.0602C114.095 45.3553 186.311 41.499 258.551 41.5008C330.791 41.5025 402.992 45.3623 445.19 53.071L445.28 52.5791ZM71.7798 52.5684L71.69 52.0765C61.8416 53.8737 54.6791 62.0717 53.6623 72.0047L54.1597 72.0557L54.6571 72.1066C55.6313 62.5899 62.4843 54.7729 71.8695 53.0602L71.7798 52.5684ZM54.1597 72.0557L53.6623 72.0047C46.1499 145.393 46.1127 255.031 53.551 327.291L54.0483 327.24L54.5457 327.189C47.1146 254.998 47.1516 145.428 54.6571 72.1066L54.1597 72.0557ZM54.0483 327.24L53.551 327.291C54.6114 337.592 62.2313 345.922 72.4598 347.616L72.5415 347.123L72.6232 346.63C62.8521 345.011 55.5614 337.054 54.5457 327.189L54.0483 327.24ZM72.5415 347.123L72.4598 347.616C119.965 355.486 192.296 359.445 263.182 359.5C334.065 359.555 403.553 355.707 445.368 347.946L445.277 347.454L445.186 346.962C403.464 354.706 334.051 358.555 263.183 358.5C192.318 358.445 120.049 354.486 72.6232 346.63L72.5415 347.123ZM445.277 347.454L445.368 347.946C455.18 346.124 462.339 337.967 463.367 328.063L462.87 328.012L462.372 327.96C461.388 337.446 454.539 345.226 445.186 346.962L445.277 347.454ZM462.87 328.012L463.367 328.063C470.878 255.699 470.878 144.302 463.367 71.9376L462.87 71.9893L462.372 72.0409C469.876 144.337 469.876 255.664 462.372 327.96L462.87 328.012ZM462.87 71.9893L463.367 71.9376C462.339 62.0345 455.188 53.881 445.37 52.0872L445.28 52.5791L445.19 53.071C454.547 54.7805 461.388 62.5546 462.372 72.0409L462.87 71.9893ZM11.3191 392.263L11.3579 391.764C9.65825 391.632 8.36467 390.296 8.22862 388.575L7.73017 388.614L7.23172 388.654C7.40482 390.844 9.0684 392.589 11.2804 392.761L11.3191 392.263ZM509.271 388.614L508.772 388.575C508.636 390.296 507.343 391.632 505.643 391.764L505.682 392.263L505.721 392.761C507.933 392.589 509.596 390.844 509.769 388.654L509.271 388.614ZM505.682 7.73716L505.643 8.23565C507.343 8.36788 508.636 9.70374 508.772 11.4251L509.271 11.3857L509.769 11.3463C509.596 9.15635 507.933 7.41074 505.721 7.23867L505.682 7.73716ZM11.3192 7.73716L11.2804 7.23867C9.06842 7.41074 7.40482 9.15635 7.23173 11.3463L7.73017 11.3857L8.22862 11.4251C8.36467 9.70374 9.65827 8.36788 11.358 8.23565L11.3192 7.73716Z"
                fill="var(--shade-300)"
              />
            </svg>
            <div
              className="absolute top-[50%] translate-y-[-50%] w-[112%] h-[7.35%] origin-bottom rotate-x-90 transform-3d pointer-events-none"
              style={{ transform: "translateY(-50%) rotateX(90deg)" }}
            >
              <div
                className="absolute w-full transform-3d"
                style={{ transform: "translateY(-50%) rotateX(-90deg)" }}
              >
                <svg
                  className="relative w-full"
                  viewBox="0 0 557 442"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5664 8.91016C145.423 -1.51886 411.577 -1.51886 545.434 8.91016C547.179 9.04615 548.505 10.4124 548.645 12.1797C559.065 144.072 559.065 297.929 548.645 429.82C548.505 431.588 547.179 432.954 545.434 433.09C411.577 443.52 145.423 443.52 11.5664 433.09C9.821 432.954 8.4951 431.588 8.35547 429.82C-2.06507 297.93 -2.06508 144.072 8.35547 12.1797C8.4951 10.4124 9.82098 9.04615 11.5664 8.91016Z"
                    fill={primaryDeviceColor}
                    stroke="var(--shade-300)"
                  />
                </svg>
                <div
                  className="absolute w-[96.8%] aspect-[2/1] top-[2.1%] left-[1.6%] transform-3d rounded-[3px]"
                  style={{ backgroundColor: primaryDeviceColor }}
                >
                  <svg
                    className="absolute w-[90%] top-[-60%] left-[5%] origin-bottom"
                    style={{ transform: "rotateX(105deg) translateY(-10%)" }}
                    viewBox="0 0 449 165"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 164L65 1H384L448 164"
                      fill={primaryDeviceColor}
                      stroke="var(--shade-300)"
                    />
                  </svg>

                  <svg
                    className="absolute w-full top-[-26%] left-0 rotate-x-[90deg] origin-bottom"
                    viewBox="0 0 569 75"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 74L32.7181 1H536.282L568 74"
                      fill={primaryDeviceColor}
                      stroke="var(--shade-300)"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="absolute w-[96.5%] h-[95.5%] transform-3d pointer-events-none">
              <div
                className="absolute w-full bottom-0 left-0 aspect-[4/1] origin-bottom rotate-x-[90deg]"
                style={{ backgroundColor: primaryDeviceColor }}
              ></div>
              <div
                className="absolute top-0 left-0 w-0.25 h-[13.5%] bg-[var(--shade-300)] origin-top-left transform-3d"
                style={{ transform: "rotateX(47deg) rotateZ(144deg)" }}
              >
                <div
                  className="rotate-y-[90deg] origin-left h-full aspect-square border-l-[1px] border-[var(--shade-300)]"
                  style={{ backgroundColor: primaryDeviceColor }}
                ></div>
              </div>
              <div
                className="absolute top-0 right-0 w-0.25 h-[13.5%] bg-[var(--shade-300)] origin-top-right transform-3d"
                style={{ transform: "rotateX(47deg) rotateZ(-144deg)" }}
              >
                <div
                  className="rotate-y-[90deg] origin-left h-full aspect-square border-l-[1px] border-[var(--shade-300)]"
                  style={{ backgroundColor: primaryDeviceColor }}
                ></div>
              </div>
              <div
                className="absolute bottom-0 right-0 w-0.25 h-[13.5%] bg-[var(--shade-300)] origin-bottom-right transform-3d"
                style={{ transform: "rotateX(-47deg) rotateZ(144deg)" }}
              >
                <div
                  className="rotate-y-[90deg] origin-left h-full aspect-square border-l-[1px] border-[var(--shade-300)]"
                  style={{ backgroundColor: primaryDeviceColor }}
                ></div>
              </div>
              <div
                className="absolute bottom-0 left-0 w-0.25 h-[13.5%] bg-[var(--shade-300)] origin-bottom-left transform-3d"
                style={{ transform: "rotateX(-47deg) rotateZ(-144deg)" }}
              >
                <div
                  className="rotate-y-[90deg] origin-left h-full aspect-square border-l-[1px] border-[var(--shade-300)]"
                  style={{ backgroundColor: primaryDeviceColor }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Computer;
