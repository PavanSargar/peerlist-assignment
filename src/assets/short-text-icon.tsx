import React from "react";

type Props = {
    height?: string;
    width?: string;
};

const ShortTextIcon = ({height="20", width="21"}: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.13965 7.5H11.473"
        stroke="#0D0D0D"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.13965 12.5H18.1396"
        stroke="#0D0D0D"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ShortTextIcon;
