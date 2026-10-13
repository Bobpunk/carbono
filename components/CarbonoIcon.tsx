export default function CarbonoIcon({
  className = "w-5 h-5",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 0.8 L18.2 5.4 L18.2 14.6 L10 19.2 L1.8 14.6 L1.8 5.4 Z M10 6.2 L14 8.5 L14 13.5 L10 15.8 L6 13.5 L6 8.5 Z"
        fill="currentColor"
      />
    </svg>
  );
}
