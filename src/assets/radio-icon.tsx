import React from "react";

type Props = {height?: string; width?: string;};

const RadioIcon = (props: Props) => {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.6397 18.3333C15.2421 18.3333 18.9731 14.6023 18.9731 9.99996C18.9731 5.39759 15.2421 1.66663 10.6397 1.66663C6.03736 1.66663 2.3064 5.39759 2.3064 9.99996C2.3064 14.6023 6.03736 18.3333 10.6397 18.3333Z"
        stroke="#0D0D0D"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <path
        d="M10.6397 13.3333C12.4807 13.3333 13.9731 11.8409 13.9731 9.99996C13.9731 8.15901 12.4807 6.66663 10.6397 6.66663C8.79878 6.66663 7.3064 8.15901 7.3064 9.99996C7.3064 11.8409 8.79878 13.3333 10.6397 13.3333Z"
        fill="#0D0D0D"
        stroke="#0D0D0D"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default RadioIcon;
