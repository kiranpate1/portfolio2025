import React, { useEffect, useRef } from "react";

type props = {
  sectionProgress?: number;
};

const Computer = ({ sectionProgress }: props) => {
  const computerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const easeIn = (t: number) => t * t * (3 - 2 * t);

  useEffect(() => {
    if (
      sectionProgress === undefined ||
      !computerRef.current ||
      !imageRef.current
    )
      return;

    // Calculate progress values
    const progressAdj =
      sectionProgress > 1 ? (sectionProgress < 2 ? sectionProgress - 1 : 1) : 0;
    const easedProgress = progressAdj;

    // Apply transforms directly to DOM for smooth animation
    computerRef.current.style.transform = `rotateX(${easedProgress * 100}deg)`;
    imageRef.current.style.filter = `brightness(${
      1 + easedProgress * 0.5
    }) contrast(${1 - easedProgress * 0.5}) saturate(${
      1 - easedProgress * 0.5
    })`;
  }, [sectionProgress]);

  return (
    <div className="window absolute flex flex-col items-stretch w-full border-[var(--shade-750)] border rounded-[16px] overflow-hidden z-1 bg-[var(--shade-900)]">
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="absolute transform-3d perspective-distant">
          <div
            ref={computerRef}
            className="computer w-[517px] relative flex justify-center items-center transform-3d"
          >
            <svg
              className="relative w-full"
              viewBox="0 0 517 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.73017 11.3857C7.88474 9.43005 9.36335 7.88931 11.3192 7.73716C135.348 -1.91138 381.654 -1.9114 505.682 7.73716C507.638 7.88931 509.116 9.43004 509.271 11.3857C518.91 133.344 518.91 266.657 509.271 388.614C509.116 390.57 507.638 392.111 505.682 392.263C381.654 401.912 135.348 401.912 11.3191 392.263C9.36332 392.111 7.88474 390.57 7.73017 388.614C-1.90938 266.658 -1.9094 133.344 7.73017 11.3857ZM445.28 52.5791C360.792 37.1448 156.324 37.1415 71.7798 52.5684C62.1629 54.3233 55.1552 62.3308 54.1597 72.0557C46.6507 145.41 46.6136 255.014 54.0483 327.24C55.0864 337.323 62.5417 345.467 72.5415 347.123C167.473 362.849 361.741 362.959 445.277 347.454C454.86 345.675 461.863 337.706 462.87 328.012C470.377 255.681 470.377 144.319 462.87 71.9893C461.863 62.2946 454.868 54.3308 445.28 52.5791Z"
                fill="var(--shade-850)"
              />
              <path
                d="M445.28 52.5791L445.37 52.0872L445.37 52.0872L445.28 52.5791ZM71.7798 52.5684L71.69 52.0765L71.69 52.0765L71.7798 52.5684ZM54.1597 72.0557L53.6623 72.0047L53.6623 72.0047L54.1597 72.0557ZM54.0483 327.24L53.551 327.291L53.551 327.291L54.0483 327.24ZM72.5415 347.123L72.4598 347.616L72.4598 347.616L72.5415 347.123ZM445.277 347.454L445.368 347.946L445.368 347.946L445.277 347.454ZM462.87 328.012L463.367 328.063L463.367 328.063L462.87 328.012ZM462.87 71.9893L463.367 71.9376L463.367 71.9376L462.87 71.9893ZM11.3191 392.263L11.2804 392.761L11.3191 392.263ZM7.73017 388.614L7.23172 388.654L7.73017 388.614ZM509.271 388.614L508.772 388.575L509.271 388.614ZM509.271 11.3857L509.769 11.3463L509.271 11.3857ZM11.3192 7.73716L11.358 8.23565C135.361 -1.41088 381.641 -1.4109 505.643 8.23565L505.682 7.73716L505.721 7.23867C381.667 -2.4119 135.335 -2.41188 11.2804 7.23867L11.3192 7.73716ZM509.271 11.3857L508.772 11.4251C518.41 133.357 518.41 266.644 508.772 388.575L509.271 388.614L509.769 388.654C519.411 266.67 519.411 133.331 509.769 11.3463L509.271 11.3857ZM505.682 392.263L505.643 391.764C381.641 401.412 135.36 401.412 11.3579 391.764L11.3191 392.263L11.2804 392.761C135.335 402.413 381.667 402.413 505.721 392.761L505.682 392.263ZM7.73017 388.614L8.22862 388.575C-1.40886 266.645 -1.40888 133.357 8.22862 11.4251L7.73017 11.3857L7.23173 11.3463C-2.40992 133.331 -2.4099 266.671 7.23172 388.654L7.73017 388.614ZM445.28 52.5791L445.37 52.0872C403.079 44.3616 330.803 40.5025 258.551 40.5008C186.299 40.499 114.009 44.3546 71.69 52.0765L71.7798 52.5684L71.8695 53.0602C114.095 45.3553 186.311 41.499 258.551 41.5008C330.791 41.5025 402.992 45.3623 445.19 53.071L445.28 52.5791ZM71.7798 52.5684L71.69 52.0765C61.8416 53.8737 54.6791 62.0717 53.6623 72.0047L54.1597 72.0557L54.6571 72.1066C55.6313 62.5899 62.4843 54.7729 71.8695 53.0602L71.7798 52.5684ZM54.1597 72.0557L53.6623 72.0047C46.1499 145.393 46.1127 255.031 53.551 327.291L54.0483 327.24L54.5457 327.189C47.1146 254.998 47.1516 145.428 54.6571 72.1066L54.1597 72.0557ZM54.0483 327.24L53.551 327.291C54.6114 337.592 62.2313 345.922 72.4598 347.616L72.5415 347.123L72.6232 346.63C62.8521 345.011 55.5614 337.054 54.5457 327.189L54.0483 327.24ZM72.5415 347.123L72.4598 347.616C119.965 355.486 192.296 359.445 263.182 359.5C334.065 359.555 403.553 355.707 445.368 347.946L445.277 347.454L445.186 346.962C403.464 354.706 334.051 358.555 263.183 358.5C192.318 358.445 120.049 354.486 72.6232 346.63L72.5415 347.123ZM445.277 347.454L445.368 347.946C455.18 346.124 462.339 337.967 463.367 328.063L462.87 328.012L462.372 327.96C461.388 337.446 454.539 345.226 445.186 346.962L445.277 347.454ZM462.87 328.012L463.367 328.063C470.878 255.699 470.878 144.302 463.367 71.9376L462.87 71.9893L462.372 72.0409C469.876 144.337 469.876 255.664 462.372 327.96L462.87 328.012ZM462.87 71.9893L463.367 71.9376C462.339 62.0345 455.188 53.881 445.37 52.0872L445.28 52.5791L445.19 53.071C454.547 54.7805 461.388 62.5546 462.372 72.0409L462.87 71.9893ZM11.3191 392.263L11.3579 391.764C9.65825 391.632 8.36467 390.296 8.22862 388.575L7.73017 388.614L7.23172 388.654C7.40482 390.844 9.0684 392.589 11.2804 392.761L11.3191 392.263ZM509.271 388.614L508.772 388.575C508.636 390.296 507.343 391.632 505.643 391.764L505.682 392.263L505.721 392.761C507.933 392.589 509.596 390.844 509.769 388.654L509.271 388.614ZM505.682 7.73716L505.643 8.23565C507.343 8.36788 508.636 9.70374 508.772 11.4251L509.271 11.3857L509.769 11.3463C509.596 9.15635 507.933 7.41074 505.721 7.23867L505.682 7.73716ZM11.3192 7.73716L11.2804 7.23867C9.06842 7.41074 7.40482 9.15635 7.23173 11.3463L7.73017 11.3857L8.22862 11.4251C8.36467 9.70374 9.65827 8.36788 11.358 8.23565L11.3192 7.73716Z"
                fill="var(--shade-300)"
              />
            </svg>
            <div
              className="absolute w-[79%] aspect-[405/304] translate-z-[-15px]"
              style={{
                clipPath:
                  "path('M6.02468 26.3161C6.78034 19.3829 11.679 13.7121 18.5195 12.3521C99.2139 -3.69155 308.961 -3.68907 389.613 12.3601C396.433 13.7172 401.325 19.3585 402.091 26.2697C409.97 97.3632 409.97 208.095 402.091 279.189C401.325 286.1 396.424 291.744 389.607 293.119C309.727 309.228 111.196 309.143 19.1337 292.865C12.0128 291.605 6.72967 285.817 5.93783 278.629C-1.88572 207.611 -1.85678 98.6291 6.02468 26.3161Z')",
              }}
            >
              <img
                ref={imageRef}
                className="w-full h-full object-cover"
                // src="https://blog.sciencemuseum.org.uk/wp-content/uploads/2017/10/Pacman.gif"
                src="https://i.pinimg.com/originals/6d/46/f9/6d46f977733e6f9a9fa8f356e2b3e0fa.gif"
                // src="https://i.pinimg.com/originals/5b/8a/5a/5b8a5aaa765a0b6096a5175588a2caef.gif"
                // src="https://i.imgflip.com/7xbpel.gif"
              />
              <div className="gradient-blur absolute inset-0">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className="absolute inset-0 flex flex-col justify-stretch gap-1 blur-[2px] mix-blend-color-dodge z-10">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} className="w-full h-1 bg-[#1daef1]" />
                ))}
              </div>
            </div>
            <div className="absolute w-[112%] translate-z-[-30px] transform-3d">
              <svg
                className="relative w-full"
                viewBox="0 0 557 442"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5664 8.91016C145.423 -1.51886 411.577 -1.51886 545.434 8.91016C547.179 9.04615 548.505 10.4124 548.645 12.1797C559.065 144.072 559.065 297.929 548.645 429.82C548.505 431.588 547.179 432.954 545.434 433.09C411.577 443.52 145.423 443.52 11.5664 433.09C9.821 432.954 8.4951 431.588 8.35547 429.82C-2.06507 297.93 -2.06508 144.072 8.35547 12.1797C8.4951 10.4124 9.82098 9.04615 11.5664 8.91016Z"
                  stroke="var(--shade-300)"
                />
              </svg>
              <div className="absolute w-[96.8%] aspect-[2/1] bottom-[2.1%] left-[1.6%] bg-[var(--shade-900)] transform-3d rounded-[3px]">
                <svg
                  className="absolute w-[90%] bottom-[0%] left-[5%] origin-bottom"
                  style={{ transform: "rotateX(75deg) translateY(-10%)" }}
                  viewBox="0 0 449 165"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1 164L65 1H384L448 164" stroke="var(--shade-300)" />
                </svg>

                <svg
                  className="absolute w-full bottom-0 left-0 rotate-x-[90deg] origin-bottom"
                  viewBox="0 0 569 75"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 74L32.7181 1H536.282L568 74"
                    fill="var(--shade-900)"
                    stroke="var(--shade-300)"
                  />
                </svg>
              </div>
            </div>
            <div className="absolute w-[96.5%] h-[95.5%] transform-3d">
              <div className="absolute w-full bottom-0 left-0 aspect-[4/1] bg-[var(--shade-900)] origin-bottom rotate-x-[90deg]"></div>
              <div
                className="absolute top-0 left-0 w-0.25 h-12.75 bg-[var(--shade-300)] origin-top-left transform-3d"
                style={{ transform: "rotateX(47deg) rotateZ(144deg)" }}
              >
                <div className="rotate-y-[90deg] origin-left h-full aspect-square bg-[var(--shade-900)] border-l-[1px] border-[var(--shade-300)]"></div>
              </div>
              <div
                className="absolute top-0 right-0 w-0.25 h-12.75 bg-[var(--shade-300)] origin-top-right transform-3d"
                style={{ transform: "rotateX(47deg) rotateZ(-144deg)" }}
              >
                <div className="rotate-y-[90deg] origin-left h-full aspect-square bg-[var(--shade-900)] border-l-[1px] border-[var(--shade-300)]"></div>
              </div>
              <div
                className="absolute bottom-0 right-0 w-0.25 h-12.75 bg-[var(--shade-300)] origin-bottom-right transform-3d"
                style={{ transform: "rotateX(-47deg) rotateZ(144deg)" }}
              >
                <div className="rotate-y-[90deg] origin-left h-full aspect-square bg-[var(--shade-900)] border-l-[1px] border-[var(--shade-300)]"></div>
              </div>
              <div
                className="absolute bottom-0 left-0 w-0.25 h-12.75 bg-[var(--shade-300)] origin-bottom-left transform-3d"
                style={{ transform: "rotateX(-47deg) rotateZ(-144deg)" }}
              >
                <div className="rotate-y-[90deg] origin-left h-full aspect-square bg-[var(--shade-900)] border-l-[1px] border-[var(--shade-300)]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Computer;
