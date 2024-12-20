import React from "react";

type Props = {height?: string; width?: string;};

const LinkIcon = ({height="20", width="20"}: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.91675 12.0833L12.0834 7.91663"
        stroke="#0D0D0D"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M14.0386 12.1746L16.2132 10C17.9289 8.28427 17.9289 5.50252 16.2132 3.78679C14.4975 2.07107 11.7157 2.07107 10 3.78679L7.82537 5.96142M12.1746 14.0386L10 16.2132C8.28427 17.929 5.50253 17.929 3.7868 16.2132C2.07107 14.4975 2.07107 11.7157 3.7868 10L5.96142 7.82538"
        stroke="#0D0D0D"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default LinkIcon;
