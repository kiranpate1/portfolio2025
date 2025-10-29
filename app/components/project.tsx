import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Projects from "./projects";
import Dropbox from "./dropbox";
import Superpower from "./superpower";
import TorontoTechWeek from "./ttw";
import Art from "./art";

type props = {
  index: number;
  title: string;
  padding: number;
  src: string;
  sectionProgress?: number;
};

const Project = ({ index, title, padding, src, sectionProgress }: props) => {
  const desktopRef = useRef<HTMLDivElement | null>(null);
  const typingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionProgress || !desktopRef.current || !typingRef.current) return;

    if (sectionProgress > Projects.length + 1.5) {
      const normalizedProgress =
        (sectionProgress - (Projects.length + 1.5)) * 2.04;
      console.log(normalizedProgress);
      const easeOutQuad = (t: number) => t * (2 - t);
      const easedProgress = easeOutQuad(normalizedProgress);

      typingRef.current.querySelectorAll("path").forEach((path) => {
        path.style.strokeWidth = `${Math.max(0, 1500 - easedProgress * 1500)}`;
      });

      // typingRef.current.style.transform = `scaleX(${
      //   100 - normalizedProgress * 99
      // })`;
      desktopRef.current.style.opacity = "1";
    } else {
      // typingRef.current.style.transform = `scaleX(100)`;
      desktopRef.current.style.opacity = "0";
    }
  }, [sectionProgress]);
  return (
    <div className="window absolute flex flex-col items-stretch w-full rounded-2xl overflow-hidden z-1">
      <div
        className="stick absolute min-w-full md:h-[calc(100vh-32px)] h-[calc(100dvh-48px-84px)]"
        style={
          {
            // minHeight: `calc(100vh - ${padding * 2}px)`,
            // maxHeight: `calc(100vh - ${padding * 2}px)`,
          }
        }
      >
        {index === 0 ? (
          <Dropbox sectionProgress={sectionProgress} />
        ) : index === 1 ? (
          <TorontoTechWeek sectionProgress={sectionProgress} />
        ) : index === 2 ? (
          <Superpower sectionProgress={sectionProgress} />
        ) : index === Projects.length - 1 ? (
          <Art sectionProgress={sectionProgress} />
        ) : (
          <Image
            className="stick absolute w-full md:h-[calc(100vh-32px)] h-[calc(100dvh-48px-84px)] object-cover"
            style={
              {
                // minHeight: `calc(100vh - ${padding * 2}px)`,
                // maxHeight: `calc(100vh - ${padding * 2}px)`,
              }
            }
            width={1000}
            height={1000}
            src={src}
            alt={`${title} Image`}
          />
        )}
        {/* <div className="gradient-blur top inset-[0_0_auto_0] absolute min-h-20 max-h-20 min-w-full">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        </div>
        <div className="gradient-blur bottom inset-[auto_0_0_0] absolute min-h-20 max-h-20 min-w-full">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        </div> */}
      </div>
      {index === Projects.length - 1 ? (
        <div
          ref={desktopRef}
          className="absolute inset-0 z-2 opacity-0 border border-[var(--shade-250)] duration-300 overflow-hidden rounded-2xl text-[var(--shade-250)]"
        >
          <div className="absolute top-0 left-0 w-full h-6 border-b border-[var(--shade-250)] flex items-center justify-between px-2 caption-small">
            <div className="flex items-center gap-2">
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
          <div
            ref={typingRef}
            className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full flex flex-col gap-4 justify-center"
          >
            <div className="relative h-[73px] w-full">
              <svg
                className="h-full left-[50%] translate-x-[-50%] absolute"
                viewBox="0 0 4802 97"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2043.96 94H2021.82L2037.94 2.60799H2060.09L2053.56 39.472L2091.58 2.60799H2118.07L2076.47 41.776L2101.18 94H2076.6L2060.09 56.752L2048.7 66.864L2043.96 94ZM2122.7 2.60799H2144.84L2128.71 94H2106.57L2122.7 2.60799ZM2137.24 93.872L2153.37 2.60799H2189.98C2210.97 2.60799 2220.95 14.384 2220.95 27.568C2220.95 43.824 2207.26 51.376 2196.63 53.552C2207.51 55.984 2209.05 63.408 2210.46 72.752C2211.48 79.92 2213.27 88.112 2215.19 93.616V94H2193.17C2191.26 89.392 2189.98 82.352 2188.44 73.392C2187.03 64.688 2183.19 61.104 2171.8 61.104H2165.14L2159.38 93.872H2137.24ZM2167.96 44.208H2177.81C2189.85 44.208 2199.19 41.136 2199.19 30.64C2199.19 24.24 2195.22 19.888 2183.32 19.888H2172.06L2167.96 44.208ZM2237.74 94H2214.19L2262.7 2.60799H2290.35L2306.48 94H2283.18L2280.24 73.008H2248.37L2237.74 94ZM2256.94 55.728H2277.81L2273.07 23.088H2272.82L2256.94 55.728ZM2327.5 2.60799H2357.32L2370.25 46.768C2372.94 56.496 2374.6 64.304 2375.75 67.76C2377.16 59.184 2378.83 49.712 2380.75 38.96L2387.15 2.60799H2408.52L2392.39 94H2362.57L2352.2 58.672C2348.62 44.72 2345.29 32.432 2344.27 27.44C2342.86 35.76 2340.43 50.736 2338.63 60.72L2332.87 94H2311.37L2327.5 2.60799ZM2441.75 45.36C2449.81 45.36 2461.59 43.184 2461.59 31.408C2461.59 23.216 2454.42 20.784 2446.48 20.784H2435.86L2431.51 45.36H2441.75ZM2400.79 94L2416.91 2.60799H2451.86C2475.03 2.60799 2483.47 18.608 2483.47 30C2483.47 52.784 2462.99 63.664 2442.77 63.664H2428.31L2422.93 94H2400.79ZM2488.29 94H2464.74L2513.25 2.60799H2540.9L2557.03 94H2533.73L2530.79 73.008H2498.92L2488.29 94ZM2507.49 55.728H2528.36L2523.62 23.088H2523.37L2507.49 55.728ZM2566.56 75.44H2586.78L2583.46 94H2563.23L2566.56 75.44Z"
                  fill="var(--shade-250)"
                  stroke="var(--shade-250)"
                />
                <path
                  d="M2577.87 21.424L2581.2 2.60799H2654.03L2650.7 21.424H2625.23L2612.56 94H2590.42L2603.09 21.424H2577.87ZM2720.58 2.60799L2717.25 21.424H2677.69L2674.62 39.088H2711.49L2708.42 57.136H2671.42L2668.22 75.184H2708.16L2704.83 94H2642.75L2658.88 2.60799H2720.58ZM2727.39 2.60799H2749.53L2736.86 75.184H2777.05L2773.73 94H2711.26L2727.39 2.60799Z"
                  fill="#4B8FED"
                  stroke="#4B8FED"
                />
              </svg>

              {/* <svg
                className="h-full left-[50%] translate-x-[-50%] absolute"
                viewBox="0 0 756 92"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.1441 91.3926H8.22544e-05L16.1281 0.000572205H38.2721L31.7441 36.8646L69.7601 0.000572205H96.2561L54.6561 39.1686L79.3601 91.3926H54.7841L38.2721 54.1446L26.8801 64.2566L22.1441 91.3926ZM100.883 0.000572205H123.027L106.899 91.3926H84.7551L100.883 0.000572205ZM115.423 91.2646L131.551 0.000572205H168.159C189.151 0.000572205 199.135 11.7766 199.135 24.9606C199.135 41.2166 185.439 48.7686 174.815 50.9446C185.695 53.3766 187.231 60.8006 188.639 70.1446C189.663 77.3126 191.455 85.5046 193.375 91.0086V91.3926H171.359C169.439 86.7846 168.159 79.7446 166.623 70.7846C165.215 62.0806 161.375 58.4966 149.983 58.4966H143.327L137.567 91.2646H115.423ZM146.143 41.6006H155.999C168.031 41.6006 177.375 38.5286 177.375 28.0326C177.375 21.6326 173.407 17.2806 161.503 17.2806H150.239L146.143 41.6006ZM215.928 91.3926H192.376L240.888 0.000572205H268.536L284.664 91.3926H261.368L258.424 70.4006H226.552L215.928 91.3926ZM235.128 53.1206H255.992L251.256 20.4806H251L235.128 53.1206ZM305.683 0.000572205H335.507L348.435 44.1606C351.123 53.8886 352.787 61.6966 353.939 65.1526C355.347 56.5766 357.011 47.1046 358.931 36.3526L365.331 0.000572205H386.707L370.579 91.3926H340.755L330.387 56.0646C326.803 42.1126 323.475 29.8246 322.451 24.8326C321.043 33.1526 318.611 48.1286 316.819 58.1126L311.059 91.3926H289.555L305.683 0.000572205ZM419.93 42.7526C427.994 42.7526 439.77 40.5766 439.77 28.8006C439.77 20.6086 432.602 18.1766 424.666 18.1766H414.042L409.69 42.7526H419.93ZM378.97 91.3926L395.098 0.000572205H430.042C453.21 0.000572205 461.658 16.0006 461.658 27.3926C461.658 50.1766 441.178 61.0566 420.954 61.0566H406.49L401.114 91.3926H378.97ZM466.478 91.3926H442.926L491.438 0.000572205H519.086L535.214 91.3926H511.918L508.974 70.4006H477.102L466.478 91.3926ZM485.678 53.1206H506.542L501.806 20.4806H501.55L485.678 53.1206ZM544.745 72.8326H564.969L561.641 91.3926H541.417L544.745 72.8326Z"
                  fill="var(--shade-250)"
                  stroke="var(--shade-250)"
                />
                <path
                  d="M556.056 18.8166L559.384 0.000572205H632.216L628.888 18.8166H603.416L590.744 91.3926H568.6L581.272 18.8166H556.056ZM698.759 0.000572205L695.431 18.8166H655.879L652.807 36.4806H689.671L686.599 54.5286H649.607L646.407 72.5766H686.343L683.015 91.3926H620.935L637.063 0.000572205H698.759ZM705.573 0.000572205H727.717L715.045 72.5766H755.237L751.909 91.3926H689.445L705.573 0.000572205Z"
                  fill="#4B8FED"
                  stroke="#4B8FED"
                />
              </svg> */}
              <div className="absolute inset-0 flex flex-col gap-2">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div
                    key={index}
                    className="relative h-0 w-full flex items-center"
                  >
                    <div className="h-1.75 w-full bg-[var(--shade-950)]"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-8 w-full caption-small">
              <a>Instagram</a>
              <a>Twitter</a>
              <a>Linkedin</a>
              <a>Email</a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Project;
