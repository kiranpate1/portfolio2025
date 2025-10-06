import React, { useEffect } from "react";

type props = {
  rawProgress?: number;
};

const DropboxTiles = ({ rawProgress }: props) => {
  useEffect(() => {
    if (rawProgress === undefined) return;
  }, [rawProgress]);

  return (
    <div className="absolute inset-0 bg-white">
      <svg
        width="2442"
        height="1628"
        viewBox="0 0 2442 1628"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="1012.8"
          y1="1.02136"
          x2="1012.8"
          y2="1626.98"
          stroke="#C5DBFF"
          strokeWidth="2.04272"
          strokeLinecap="round"
        />
        <line
          x1="1419.8"
          y1="1.02136"
          x2="1419.8"
          y2="1626.98"
          stroke="#C5DBFF"
          strokeWidth="2.04272"
          strokeLinecap="round"
        />
        <path d="M0 607H2442" stroke="#C5DBFF" strokeWidth="2.04272" />
        <path d="M0 1015H2442" stroke="#C5DBFF" strokeWidth="2.04272" />
        <rect
          width="408.543"
          height="408.543"
          transform="translate(1011.98 606.885)"
          fill="#0061FE"
        />
        <path
          d="M1151.16 708.322L1085.52 749.552L1151.16 790.783L1216.81 749.552L1282.44 790.783L1348.08 749.552L1282.44 708.322L1216.81 749.552L1151.16 708.322Z"
          fill="white"
        />
        <path
          d="M1151.16 873.244L1085.52 832.014L1151.16 790.783L1216.81 832.014L1151.16 873.244Z"
          fill="white"
        />
        <path
          d="M1216.81 832.014L1282.44 790.783L1348.08 832.014L1282.44 873.244L1216.81 832.014Z"
          fill="white"
        />
        <path
          d="M1216.81 928.216L1151.16 886.986L1216.81 845.756L1282.44 886.986L1216.81 928.216Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

export default DropboxTiles;
