import React from "react";

type Props = {height?: string, width?: string};

const HashtagIcon = ({height="20", width="20"}: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.97298 2.5L5.63965 17.5"
        stroke="#0D0D0D"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M17.7229 13.3334H2.7229"
        stroke="#0D0D0D"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M18.9729 5.83337H3.9729"
        stroke="#0D0D0D"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M15.6397 2.5L12.3064 17.5"
        stroke="#0D0D0D"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default HashtagIcon;
