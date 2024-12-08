import React from "react";

type Props = {
    height?: string;
    width?: string;
};

const Chevdown = ({width="16", height="16"}: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.63965 6L8.63965 10L12.6396 6"
        stroke="#0D0D0D"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Chevdown;
