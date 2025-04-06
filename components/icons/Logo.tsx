const Logo = ({ ...props }) => (
  <svg
    width="120"
    height="32"
    viewBox="0 0 120 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="32" height="32" rx="8" fill="#4F46E5" />
    <path
      d="M8 10C8 8.89543 8.89543 8 10 8H22C23.1046 8 24 8.89543 24 10V22C24 23.1046 23.1046 24 22 24H10C8.89543 24 8 23.1046 8 22V10Z"
      fill="white"
    />
    <path
      d="M14 14H18V18H14V14Z"
      fill="#4F46E5"
    />
    <path
      d="M10 12H22"
      stroke="#4F46E5"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M10 20H22"
      stroke="#4F46E5"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <text
      x="36"
      y="22"
      fontFamily="Arial"
      fontSize="18"
      fontWeight="bold"
      fill="white"
    >
      StayLog
    </text>
  </svg>
);

export default Logo;
