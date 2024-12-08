import React from "react";

type Props = { height?: string; width?: string };

const DragDrop = ({ height="24", width="24" }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.5">
        <path
          d="M9.51465 7H9.51994M9.51465 12H9.51994M9.51465 17H9.51994M16.1761 7H16.1813M16.1761 12H16.1813M16.1761 17H16.1813"
          stroke="#0D0D0D"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  );
};

export default DragDrop;