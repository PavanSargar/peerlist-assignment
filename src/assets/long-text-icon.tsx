import React from "react";

type Props = { height?: string; width?: string };

const LongTextIcon = ({ height = "20", width = "20" }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.13965 5H11.473"
        stroke="#0D0D0D"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.13965 10H18.1396"
        stroke="#0D0D0D"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.13965 15H18.1396"
        stroke="#0D0D0D"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default LongTextIcon;
