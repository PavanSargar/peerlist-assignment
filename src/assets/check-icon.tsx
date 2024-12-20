import React from "react";

type Props = {
  width?: string;
  height?: string;
  color?: string;
};

const CheckIcon = ({ width = "16", height = "16", color = "white" }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 8.38091L6 11.1666L13 4.66663"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default CheckIcon;
