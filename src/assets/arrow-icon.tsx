import React from "react";

type Props = {
  height?: string;
  width?: string;
};

const ArrowIcon = ({ height = "16", width = "16" }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.563 11.6318L11.4376 4.75711M11.4376 4.75711V11.3568M11.4376 4.75711H4.83799"
        stroke="#959DA5"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ArrowIcon;
