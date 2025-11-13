import React, { useEffect } from "react";
import Image from "next/image";
import Projects from "./projects";
const src = Projects[1].src; // Toronto Tech Week image

type props = {
  sectionProgress?: number;
};

const TorontoTechWeek = ({ sectionProgress }: props) => {
  const skyColor = "#070F0F";

  useEffect(() => {
    const svg = document.querySelector(".toronto svg") as SVGSVGElement;
    const objects = document.querySelectorAll(
      ".toronto svg g"
    ) as NodeListOf<SVGElement>;
    objects.forEach((obj, index) => {
      const svgRect = svg.getBoundingClientRect();
      const objRect = obj.getBoundingClientRect();
      // align each group's transform-origin with the horizontal center of the SVG
      const svgCenterX = svgRect.left + svgRect.width / 2;
      const objWidth = objRect.width || 1;
      const centerRelativeToObj =
        ((svgCenterX - objRect.left) / objWidth) * 100;
      obj.style.transformOrigin = `${centerRelativeToObj * 1.2}% 100%`;
      obj.style.transformBox = "fill-box";
    });

    const ttwLines = document.querySelector(".ttw-lines") as HTMLDivElement;
    for (let i = 0; i < 150; i++) {
      const newLine = document.createElement("div");
      newLine.className = `absolute w-0.5 bg-[var(--shade-300)]`;
      newLine.style.top = `${-25 + Math.random() * 40}%`;
      if (Math.random() > 0.5) {
        newLine.style.left = `${0 + Math.random() * 50}%`;
      } else {
        newLine.style.right = `${0 + Math.random() * 50}%`;
      }
      newLine.style.height = `${5 + Math.random() * 15}%`;
      const leftValue = parseFloat(newLine.style.left || "0");
      const rightValue = parseFloat(newLine.style.right || "0");
      const rotationY = leftValue
        ? -Math.atan((leftValue - 25) / 50) * (180 / Math.PI)
        : Math.atan((rightValue - 25) / 50) * (180 / Math.PI);
      newLine.style.transform = `translateZ(${
        -4500 + Math.random() * 5000
      }px) rotateX(90deg) rotateY(${rotationY}deg)`;
      ttwLines.appendChild(newLine);
    }
  }, []);

  useEffect(() => {
    const objects = document.querySelectorAll(
      ".toronto svg g"
    ) as NodeListOf<SVGElement>;
    const raw = typeof sectionProgress === "number" ? sectionProgress - 2 : 1;
    const scale = Math.min(1, Math.max(0, raw));
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const easedScale = easeOut(scale);
    objects.forEach((obj, index) => {
      const minStart = 2;
      const maxStart = 1 + (7 * index) / (objects.length - 1); // 1 for first, 4 for last
      const t = objects.length > 1 ? index / (objects.length - 1) : 0; // 0 for first, 1 for last
      const start = minStart + t * (maxStart - minStart); // higher index => closer to 4, lower => closer to 1
      const adjScale = start + (1 - start) * easedScale; // at scale=0 => start, at scale=1 => 1
      obj.style.transform = `scale(${adjScale})`;
    });

    const ttwLines = document.querySelectorAll(
      ".ttw-lines div"
    ) as NodeListOf<HTMLDivElement>;
    const translateZ = 10000 - easedScale * 10000;
    ttwLines.forEach((line) => {
      line.style.translate = `0 0 ${translateZ}px`;
    });
  }, [sectionProgress]);

  return (
    <div
      className="stick toronto absolute inset-0 flex justify-center"
      style={{
        backgroundImage: "linear-gradient(to bottom, #E7E1C6, #C8C3AC)",
      }}
    >
      <div className="absolute inset-0 bg-[url('/images/ttw-bg.png')] bg-repeat bg-size-[1000px] opacity-30"></div>
      <div className="absolute top-0 bottom-0 w-full max-w-[1180px] h-full flex flex-col justify-center gap-8 p-8">
        <div className="relative flex-1 bg-[url('/images/ttw-grill.svg')] bg-repeat bg-size-[20px]"></div>
        <div
          className="relative w-full h-[50%] min-h-[550px] flex justify-center items-center rounded-2xl border-16 border-[#272628] overflow-hidden"
          style={{ backgroundColor: skyColor }}
        >
          <div className="relative min-w-[1085px] w-[82.4%] transform-3d perspective-distant">
            <div className="ttw-lines absolute inset-[0_-50%-200%-50%] transform-3d perspective-distant z-0">
              {/* <div
            className="absolute top-[-20%] left-[7%] w-0.25 h-100 bg-[var(--shade-300)]"
            style={{ transform: "rotateX(90deg) translateZ(-20px)" }}
          ></div> */}
            </div>
            <svg
              className="relative w-full"
              viewBox="0 0 1580 732"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <rect x="1054" y="662" width="55" height="69" />
              </g>
              <g>
                <path
                  d="M732.011 613.54V635.893H770.046V628.686H786.414V731.5H711.983V613.54H732.011Z"
                  fill={skyColor}
                />
              </g>
              <g>
                <path
                  d="M676.398 646.622C694.28 646.622 704.652 648.947 711.983 664.325V731.5H676.398V646.622Z"
                  fill={skyColor}
                />
                <path d="M681 660H688.758" />
                <path d="M681 655H688.758" />
                <path d="M681 665H688.758" />
                <path d="M681 670H688.758" />
                <path d="M681 675H688.758" />
                <path d="M681 680H688.758" />
                <path d="M681 685H688.758" />
                <path d="M681 690H688.758" />
                <path d="M681 695H688.758" />
                <path d="M681 700H688.758" />
                <path d="M681 705H688.758" />
                <path d="M681 710H688.758" />
                <path d="M681 715H688.758" />
              </g>
              <g>
                <rect
                  x="1456.24"
                  y="679.375"
                  width="117.138"
                  height="51.8281"
                />
                <rect
                  x="1456.24"
                  y="679.375"
                  width="117.138"
                  height="51.8281"
                  fill={skyColor}
                />
                <rect
                  x="1462.02"
                  y="664.317"
                  width="107.333"
                  height="15.0582"
                  fill={skyColor}
                />
                <path d="M1470.08 658.014C1470.08 658.784 1470.08 672.692 1470.08 679.55" />
                <path d="M1478.48 658.014C1478.48 658.784 1478.48 672.692 1478.48 679.55" />
                <path d="M1486.89 658.014C1486.89 658.784 1486.89 672.692 1486.89 679.55" />
                <path d="M1495.29 658.014C1495.29 658.784 1495.29 672.692 1495.29 679.55" />
                <path d="M1503.69 658.014C1503.69 658.784 1503.69 672.692 1503.69 679.55" />
                <path d="M1512.1 658.014C1512.1 658.784 1512.1 672.692 1512.1 679.55" />
                <path d="M1520.5 658.014C1520.5 658.784 1520.5 672.692 1520.5 679.55" />
                <path d="M1528.91 658.014C1528.91 658.784 1528.91 672.692 1528.91 679.55" />
                <path d="M1537.31 658.014C1537.31 658.784 1537.31 672.692 1537.31 679.55" />
                <path d="M1545.72 658.014C1545.72 658.784 1545.72 672.692 1545.72 679.55" />
                <path d="M1554.12 658.014C1554.12 658.784 1554.12 672.692 1554.12 679.55" />
                <path d="M1562.53 658.014C1562.53 658.784 1562.53 672.692 1562.53 679.55" />
                <rect
                  x="1464.47"
                  y="686.905"
                  width="4.20227"
                  height="23.2876"
                />
                <rect
                  x="1464.47"
                  y="720.347"
                  width="4.20227"
                  height="10.8559"
                />
                <rect
                  x="1476.38"
                  y="686.905"
                  width="4.20227"
                  height="23.2876"
                />
                <rect
                  x="1476.38"
                  y="720.347"
                  width="4.20227"
                  height="10.8559"
                />
                <rect
                  x="1488.29"
                  y="686.905"
                  width="4.20227"
                  height="23.2876"
                />
                <rect
                  x="1488.29"
                  y="720.347"
                  width="4.20227"
                  height="10.8559"
                />
                <rect
                  x="1500.19"
                  y="686.905"
                  width="4.20227"
                  height="23.2876"
                />
                <rect
                  x="1500.19"
                  y="720.347"
                  width="4.20227"
                  height="10.8559"
                />
                <rect x="1512.1" y="686.905" width="4.20227" height="23.2876" />
                <rect x="1512.1" y="720.347" width="4.20227" height="10.8559" />
                <rect
                  x="1524.01"
                  y="686.905"
                  width="4.20227"
                  height="23.2876"
                />
                <rect
                  x="1524.01"
                  y="720.347"
                  width="4.20227"
                  height="10.8559"
                />
                <rect
                  x="1535.91"
                  y="686.905"
                  width="4.20227"
                  height="23.2876"
                />
                <rect
                  x="1535.91"
                  y="720.347"
                  width="4.20227"
                  height="10.8559"
                />
                <rect
                  x="1547.82"
                  y="686.905"
                  width="4.20227"
                  height="23.2876"
                />
                <rect
                  x="1547.82"
                  y="720.347"
                  width="4.20227"
                  height="10.8559"
                />
                <rect
                  x="1559.72"
                  y="686.905"
                  width="4.20227"
                  height="23.2876"
                />
                <rect
                  x="1559.72"
                  y="720.347"
                  width="4.20227"
                  height="10.8559"
                />
              </g>
              <g>
                <path
                  d="M1275.4 645.935H1298.31V638.406H1320.04V731.382H1275.4V645.935Z"
                  fill={skyColor}
                />
                <path d="M1298.31 645.41V688.921" />
              </g>
              <g>
                <path
                  d="M1195.2 693.383H1154.1V731.5H1195.2V693.383Z"
                  fill={skyColor}
                />
              </g>
              <g>
                <path
                  d="M1096.77 648.123H1119.81V731.293H1096.77V648.123Z"
                  fill={skyColor}
                />
              </g>
              <g>
                <path
                  d="M1102.81 575.195H1129.21V731.292H1102.81V648.122V575.195Z"
                  fill={skyColor}
                />
              </g>
              <g>
                <path
                  d="M1123.83 556.461C1117.61 556.461 1109.21 556.461 1109.21 556.461V575.196C1109.21 577.367 1109.21 680.165 1109.21 731.293H1123.83M1123.83 556.461C1142.74 556.461 1147.2 570.731 1147.2 570.731V731.293H1123.83M1123.83 556.461V731.293"
                  fill={skyColor}
                />
              </g>
              <g>
                <path
                  d="M1142.39 629.826L1163.66 639.807V731.206H1142.39M1142.39 629.826H1131.27V731.206H1142.39M1142.39 629.826V731.206"
                  fill={skyColor}
                />
              </g>
              <g>
                <rect
                  x="1185.9"
                  y="590.779"
                  width="92.8002"
                  height="140.426"
                  fill={skyColor}
                />
                <rect x="1185.9" y="600.583" width="92.8002" height="130.621" />
                <rect x="1185.9" y="600.583" width="9.28002" height="130.621" />
                <rect
                  x="1195.18"
                  y="600.583"
                  width="9.28002"
                  height="130.621"
                />
                <rect
                  x="1204.46"
                  y="600.583"
                  width="9.28002"
                  height="130.621"
                />
                <rect
                  x="1213.74"
                  y="600.583"
                  width="9.28002"
                  height="130.621"
                />
                <rect
                  x="1223.02"
                  y="600.583"
                  width="9.28002"
                  height="130.621"
                />
                <rect x="1232.3" y="600.583" width="9.28002" height="130.621" />
                <rect
                  x="1241.58"
                  y="600.583"
                  width="9.28002"
                  height="130.621"
                />
                <rect
                  x="1250.86"
                  y="600.583"
                  width="9.28002"
                  height="130.621"
                />
                <rect
                  x="1260.14"
                  y="600.583"
                  width="9.28002"
                  height="130.621"
                />
              </g>
              <g>
                <ellipse
                  cx="237.144"
                  cy="698.811"
                  rx="6.39096"
                  ry="6.47851"
                  fill={skyColor}
                />
                <ellipse
                  cx="216.483"
                  cy="685.593"
                  rx="11.994"
                  ry="12.1691"
                  fill={skyColor}
                />
                <path d="M226.619 731.38L226.619 710.887M226.619 710.887L233.845 701.828M226.619 710.887L216.987 691.394M236.586 698.392L233.845 701.828M233.845 701.828L237.583 701.141M233.845 701.828L233.347 698.392M213.413 685.646L216.987 691.394M216.987 691.394L211.669 690.145" />
              </g>
              <g>
                <ellipse
                  cx="1422.19"
                  cy="698.811"
                  rx="6.39096"
                  ry="6.47851"
                  fill={skyColor}
                />
                <ellipse
                  cx="1401.53"
                  cy="685.593"
                  rx="11.994"
                  ry="12.1691"
                  fill={skyColor}
                />
                <path d="M1411.66 731.38L1411.66 710.887M1411.66 710.887L1418.89 701.828M1411.66 710.887L1402.03 691.394M1421.63 698.392L1418.89 701.828M1418.89 701.828L1422.62 701.141M1418.89 701.828L1418.39 698.392M1398.45 685.646L1402.03 691.394M1402.03 691.394L1396.71 690.145" />
              </g>
              <g>
                <circle
                  cx="7.26643"
                  cy="7.26643"
                  r="7.26643"
                  transform="matrix(-1 0 0 1 209.919 707.215)"
                  fill={skyColor}
                />
                <path d="M204.451 731.378L204.451 720.238M204.451 715.488L204.451 716.488L204.451 720.237L200.464 715.489" />
              </g>
              <g>
                <circle cx="247.126" cy="714.481" r="7.26643" fill={skyColor} />
                <path d="M245.328 731.378L245.328 720.238M245.328 715.488L245.328 716.488L245.328 720.237L249.315 715.489" />
              </g>
              <g>
                <circle cx="1439.7" cy="714.307" r="7.26643" fill={skyColor} />
                <path d="M1437.9 731.204L1437.9 720.064M1437.9 715.314L1437.9 716.315L1437.9 720.063L1441.89 715.315" />
              </g>
              <g>
                <circle cx="1389.45" cy="714.307" r="7.26643" fill={skyColor} />
                <path d="M1387.65 731.204L1387.65 720.064M1387.65 715.314L1387.65 716.315L1387.65 720.063L1391.63 715.315" />
              </g>
              <g>
                <ellipse
                  cx="10.5932"
                  cy="10.6808"
                  rx="10.5932"
                  ry="10.6808"
                  transform="matrix(-1 0 0 1 1378.33 700.564)"
                  fill={skyColor}
                />
                <path d="M1369.53 731.555L1369.53 720.415M1369.53 709.668L1369.53 716.665M1365.54 715.666L1369.53 720.414L1369.53 716.665M1369.53 716.665L1373.52 711.917" />
              </g>
              <g>
                <rect
                  x="265.073"
                  y="712.469"
                  width="27.4899"
                  height="18.9102"
                  fill={skyColor}
                />
                <path d="M269.451 725.426V731.379H288.361V725.426M269.451 725.426V719.473H288.361V725.426M269.451 725.426H288.361" />
              </g>
              <g>
                <path
                  d="M1364.84 609.164H1317.04V731.73H1364.84V609.164Z"
                  fill={skyColor}
                />
                <path d="M1317.04 629.652H1352.94" />
                <path d="M1328.95 650.138H1364.84" />
                <path d="M1317.04 670.621H1352.94" />
                <path d="M1328.95 691.109H1364.84" />
                <path d="M1317.04 711.595H1352.94" />
              </g>
              <g>
                <path d="M556.256 730.801V667.823M580.419 730.877V655.916L569.038 644.535H556.256V667.823M556.256 667.823H548.289" />
                <path d="M548.376 731.07V667.471H531.392V731.38" />
              </g>
              <g>
                <path
                  d="M387 691.283H451.513V731.38H387V691.283Z"
                  fill={skyColor}
                />
                <rect
                  x="451.514"
                  y="664.492"
                  width="14.0076"
                  height="66.8862"
                  fill={skyColor}
                />
              </g>
              <g>
                <path
                  d="M316.901 731.379H351.984V701.753V689.626V681.31C351.984 683.606 350.123 685.468 347.826 685.468H319.586C317.29 685.468 316.901 687.329 316.901 689.626V731.379Z"
                  fill={skyColor}
                />
                <path d="M359.955 667.353C359.955 666.354 360.764 665.545 361.762 665.545H421.037C422.036 665.545 422.845 666.354 422.845 667.353V674.727H359.955V667.353Z" />
                <path d="M351.985 684.949V692.151C351.985 693.149 351.176 693.958 350.178 693.958H318.796C317.798 693.958 316.988 694.768 316.988 695.766V703.141" />
                <path d="M351.985 697.25V704.452C351.985 705.45 351.176 706.259 350.178 706.259H318.796C317.798 706.259 316.988 707.068 316.988 708.067V715.441" />
                <path
                  d="M351.984 676.62C351.984 675.622 352.794 674.812 353.792 674.812H425.888C426.886 674.812 427.695 675.622 427.695 676.62V689.626V701.753V731.379H351.984V701.753V689.626V676.62Z"
                  fill={skyColor}
                />
                <path d="M351.984 731.379H427.695V701.753M351.984 731.379H316.901V689.626C316.901 687.329 317.29 685.467 319.586 685.467H347.826C350.123 685.467 351.984 683.606 351.984 681.309V678.624M351.984 731.379V701.753M351.984 689.626V676.62C351.984 675.622 352.794 674.812 353.792 674.812H425.888C426.886 674.812 427.695 675.622 427.695 676.62V689.626M351.984 689.626H427.695M351.984 689.626V701.753M427.695 689.626V701.753M351.984 701.753H427.695" />
              </g>
              <g>
                <rect
                  x="292.563"
                  y="646.809"
                  width="23.8129"
                  height="84.5708"
                  fill={skyColor}
                />
                <path d="M298.691 657.05H309.635" />
                <path d="M298.691 672.987H309.635" />
                <path d="M298.691 688.92H309.635" />
                <path d="M298.691 704.853H309.635" />
                <path d="M298.691 720.786H309.635" />
              </g>
              <g>
                <path d="M517.296 731.469L524.213 664.67L528.678 731.469M515.108 731.469L511.693 664.67L495.322 731.469M481.577 731.469L475.536 664.67L473.698 731.469" />
                <rect
                  x="470.284"
                  y="642.783"
                  width="54.2794"
                  height="21.8868"
                  fill={skyColor}
                />
                <rect
                  x="476.236"
                  y="649.435"
                  width="6.30341"
                  height="5.77813"
                />
                <rect
                  x="503.553"
                  y="646.809"
                  width="4.37737"
                  height="4.20227"
                />
                <rect x="515.633" y="649.435" width="4.55246" height="9.9804" />
                <rect
                  x="491.821"
                  y="649.609"
                  width="5.60303"
                  height="9.80531"
                />
              </g>
              <g>
                <rect
                  x="-68.3081"
                  y="670.306"
                  width="137.274"
                  height="61.2832"
                />
                <rect
                  x="-69.0078"
                  y="705.325"
                  width="137.975"
                  height="26.2642"
                />
                <path d="M30.0957 723.356L32.7221 723.356" />
                <path d="M64.5894 723.356L67.2158 723.356" />
                <path d="M114.141 723.356L116.768 723.356" />
                <rect
                  x="-34.5151"
                  y="670.306"
                  width="34.4937"
                  height="61.4583"
                />
                <rect
                  x="-0.0214844"
                  y="670.306"
                  width="68.9874"
                  height="61.4583"
                />
                <path d="M58.6353 710.751L58.6353 731.237" />
                <path d="M24.1416 710.751L24.1416 731.237" />
                <path d="M108.188 710.751L108.188 731.237" />
                <path d="M68.9659 710.399H-34.5151" />
                <rect
                  x="58.6353"
                  y="715.129"
                  width="10.3306"
                  height="16.4589"
                />
                <path d="M118.519 710.399L75.4453 710.399" />
                <rect
                  x="-10.3506"
                  y="715.129"
                  width="10.3306"
                  height="16.4589"
                />
                <rect
                  x="24.1416"
                  y="715.129"
                  width="10.3306"
                  height="16.4589"
                />
                <rect
                  x="108.188"
                  y="715.129"
                  width="10.3306"
                  height="16.4589"
                />
                <rect x="68.9673" y="664" width="5.77813" height="67.5866" />
                <rect
                  x="75.4458"
                  y="675.907"
                  width="43.0733"
                  height="55.6801"
                />
                <rect x="80.873" y="684.488" width="7.17889" height="19.4355" />
                <rect
                  x="93.3047"
                  y="684.488"
                  width="7.35398"
                  height="19.4355"
                />
                <rect x="7.3335" y="678.007" width="7.17889" height="19.4355" />
                <rect
                  x="41.3027"
                  y="678.007"
                  width="7.17889"
                  height="19.4355"
                />
                <rect
                  x="19.7646"
                  y="678.007"
                  width="7.35398"
                  height="19.4355"
                />
                <rect
                  x="53.7334"
                  y="678.007"
                  width="7.35398"
                  height="19.4355"
                />
                <path d="M34.4736 670.128V731.761" />
                <rect
                  x="105.911"
                  y="684.488"
                  width="7.17889"
                  height="19.4355"
                />
              </g>
              <g>
                <path
                  d="M183.654 672.462H126.311V666.421H118.432V731.556H189.958V666.421H183.654V672.462Z"
                  fill={skyColor}
                />
                <path d="M140.93 715.536V704.942H133.488M140.93 715.536V726.129H133.488M140.93 715.536H126.047M126.047 715.536V726.129H133.488M126.047 715.536V704.942H133.488M133.488 704.942V726.129" />
                <path d="M161.242 715.536V704.942H153.8M161.242 715.536V726.129H153.8M161.242 715.536H146.359M146.359 715.536V726.129H153.8M146.359 715.536V704.942H153.8M153.8 704.942V726.129" />
                <path d="M181.552 715.536V704.942H174.11M181.552 715.536V726.129H174.11M181.552 715.536H166.669M166.669 715.536V726.129H174.11M166.669 715.536V704.942H174.11M174.11 704.942V726.129" />
                <path d="M140.93 688.395V677.802H133.488M140.93 688.395V698.988H133.488M140.93 688.395H126.047M126.047 688.395V698.988H133.488M126.047 688.395V677.802H133.488M133.488 677.802V698.988" />
                <path d="M161.242 688.395V677.802H153.8M161.242 688.395V698.988H153.8M161.242 688.395H146.359M146.359 688.395V698.988H153.8M146.359 688.395V677.802H153.8M153.8 677.802V698.988" />
                <path d="M181.552 688.395V677.802H174.11M181.552 688.395V698.988H174.11M181.552 688.395H166.669M166.669 688.395V698.988H174.11M166.669 688.395V677.802H174.11M174.11 677.802V698.988" />
                <path d="M154.149 672.199V664.582" />
                <rect
                  x="137.078"
                  y="645.41"
                  width="34.3186"
                  height="19.2604"
                  fill={skyColor}
                />
                <path d="M142 650C147 650 149.314 660 154 660C158.882 660 161.5 650 166.5 650" />
              </g>
              <g>
                <path
                  d="M654.087 731.701H561.793H540.519V723.126V710.357L553.334 701.383C555.985 697.784 558.813 694.442 561.793 691.35C610.795 640.514 701.131 657.063 729.422 701.383L741.465 705.671V731.701H654.087Z"
                  fill={skyColor}
                />
                <path d="M561.793 731.701H654.087V721.289H680.73V715.164H706.454V705.671H741.465M741.465 705.671L729.422 701.383C701.131 657.063 610.795 640.514 561.793 691.35C558.813 694.442 555.985 697.784 553.334 701.383L540.519 710.357M741.465 705.671V731.701H540.519V723.126M630.145 723.126H540.519M540.519 710.357V723.126M540.519 710.357H706.454M711.983 699.852H642.611H573.24C573.24 699.852 592.953 671.065 642.611 671.065C692.27 671.065 711.983 699.852 711.983 699.852Z" />
              </g>
              <g>
                <path
                  d="M736.465 646.622C758.515 646.622 765.63 653.988 765.63 672.523V731.5H736.465V705.291V646.622Z"
                  fill={skyColor}
                />
              </g>
              <g>
                <rect x="959" y="681" width="48" height="50" fill={skyColor} />
                <path d="M1005 713.267V692H983M1005 713.267V720H983M1005 713.267H961M961 713.267V720H983M961 713.267V692H983M983 692V720M1005 706.3H961M1005 699.332H961" />
              </g>
              <g>
                <path
                  d="M1002.75 550.857H1035.14V731.38H1002.75V550.857Z"
                  fill={skyColor}
                />
                <path d="M1009.93 557.509H1017.68" />
                <path d="M1009.93 560.509H1017.68" />
                <path d="M1009.93 563.509H1017.68" />
                <path d="M1009.93 566.509H1017.68" />
                <path d="M1009.93 569.509H1017.68" />
                <path d="M1009.93 572.509H1017.68" />
                <path d="M1009.93 575.509H1017.68" />
                <path d="M1009.93 578.509H1017.68" />
                <path d="M1009.93 581.509H1017.68" />
                <path d="M1009.93 584.509H1017.68" />
                <path d="M1009.93 587.509H1017.68" />
                <path d="M1009.93 590.509H1017.68" />
                <path d="M1009.93 593.509H1017.68" />
                <path d="M1009.93 596.509H1017.68" />
                <path d="M1009.93 599.509H1017.68" />
                <path d="M1009.93 602.509H1017.68" />
                <path d="M1009.93 605.509H1017.68" />
                <path d="M1009.93 608.509H1017.68" />
                <path d="M1009.93 611.509H1017.68" />
                <path d="M1009.93 614.509H1017.68" />
                <path d="M1009.93 617.509H1017.68" />
                <path d="M1009.93 620.509H1017.68" />
                <path d="M1009.93 623.509H1017.68" />
                <path d="M1009.93 626.509H1017.68" />
                <path d="M1009.93 629.509H1017.68" />
                <path d="M1009.93 632.509H1017.68" />
                <path d="M1009.93 635.509H1017.68" />
                <path d="M1009.93 638.509H1017.68" />
                <path d="M1009.93 641.509H1017.68" />
                <path d="M1009.93 644.509H1017.68" />
                <path d="M1009.93 647.509H1017.68" />
                <path d="M1029.71 530.543L1029.71 550.854" />
              </g>
              <g>
                <path
                  d="M824.602 653.987L801.476 649.96L801 672.5H759.5V731.256H849.627V696.473H824.602V653.987Z"
                  fill={skyColor}
                />
              </g>
              <g>
                <path
                  d="M860.704 618.092C860.704 631.892 883.115 641.496 903.117 641.496V731.378H850.238V618.092H860.704Z"
                  fill={skyColor}
                />
                <path d="M860.395 618.444L860.395 731.38" />
                <path d="M903.117 654.514C894.592 654.506 872.725 653.933 860.394 637.705" />
                <path d="M903.117 667.296C894.592 667.288 872.725 666.89 860.394 654.164" />
                <path d="M903.117 680.218C894.592 680.211 872.725 681.385 860.394 670.446" />
                <path d="M903.117 693.496C894.592 693.488 872.725 694.654 860.394 687.255" />
                <path d="M903.117 706.466C894.592 706.458 872.725 707.275 860.394 702.665" />
                <path d="M903.117 719.107C892.681 719.107 876.221 720.148 860.394 717.372" />
              </g>
              <g>
                <path
                  d="M967.593 600.76C967.593 616.672 936.427 627.745 916.425 627.745V731.38H978.059V600.76H967.593Z"
                  fill={skyColor}
                />
                <path d="M967.902 601.108V731.379" />
                <path d="M916.774 641.731C926.976 641.723 953.144 640.8 967.902 622.647" />
                <path d="M916.774 654.512C926.976 654.505 953.144 653.932 967.902 637.705" />
                <path d="M916.774 667.294C926.976 667.287 953.144 666.889 967.902 654.164" />
                <path d="M916.774 680.25C926.976 680.242 953.144 681.42 967.902 670.446" />
                <path d="M916.774 693.557C926.976 693.549 953.144 694.727 967.902 687.255" />
                <path d="M916.774 706.515C926.976 706.508 953.144 707.335 967.902 702.665" />
                <path d="M916.774 719.123C929.262 719.123 948.961 720.174 967.902 717.372" />
              </g>
              <g>
                <rect
                  x="1041.73"
                  y="573.269"
                  width="15.7585"
                  height="11.9064"
                  fill={skyColor}
                />
                <rect
                  x="1038.58"
                  y="585.176"
                  width="22.0619"
                  height="12.0815"
                  fill={skyColor}
                />
                <rect
                  x="1034.2"
                  y="597.259"
                  width="30.8167"
                  height="24.3382"
                  fill={skyColor}
                />
                <rect
                  x="1030"
                  y="622.008"
                  width="39.2932"
                  height="109.37"
                  fill={skyColor}
                />
                <path d="M1041.73 579.048H1057.49" />
                <path d="M1038.93 591.305H1060.64" />
                <path d="M1034.51 613.249H1065.04" />
                <path d="M1034.51 605.992H1065.04" />
                <path d="M1030.25 633.272H1069.29" />
                <path d="M1030.25 645.785H1069.29" />
                <path d="M1030.25 658.299H1069.29" />
                <path d="M1030.25 670.812H1069.29" />
                <path d="M1030.25 683.325H1069.29" />
                <path d="M1030.25 695.843H1069.29" />
                <path d="M1030.25 708.354H1069.29" />
                <path d="M1030.25 720.867H1069.29" />
                <path d="M1049.79 552.432L1049.79 573.268" />
              </g>
              <g>
                <path
                  d="M784.403 475.566L776.523 731.292H789.918V475.566H784.403Z"
                  fill={skyColor}
                />
                <path
                  d="M795.523 475.566L803.402 731.292H790.007V475.566H795.523Z"
                  fill={skyColor}
                />
                <path
                  d="M772.789 463.923C772.686 463.83 772.752 463.66 772.89 463.66H806.423C806.561 463.66 806.626 463.83 806.524 463.923L799.812 469.964H779.501L772.789 463.923Z"
                  fill={skyColor}
                />
                <rect
                  x="777.225"
                  y="444.927"
                  width="24.8635"
                  height="8.40455"
                  fill={skyColor}
                />
                <rect
                  x="774.249"
                  y="469.963"
                  width="31.342"
                  height="5.42794"
                  rx="2.71397"
                  fill={skyColor}
                />
                <rect
                  x="773.022"
                  y="453.329"
                  width="33.268"
                  height="10.3306"
                  fill={skyColor}
                />
                <path
                  d="M786.878 389.419H793.138L794.56 444.924H785.456L786.878 389.419Z"
                  fill={skyColor}
                />
                <rect
                  x="788.256"
                  y="340.043"
                  width="3.5019"
                  height="49.3767"
                  fill={skyColor}
                />
                <rect x="789.833" y="308" width="0.175095" height="32.0423" />
              </g>
              <path d="M0 731.5L1580 731.5" />
            </svg>
          </div>
        </div>
        <div className="relative flex-1 bg-[url('/images/ttw-grill.svg')] bg-repeat bg-size-[20px]"></div>
      </div>
    </div>
  );
};

export default TorontoTechWeek;
