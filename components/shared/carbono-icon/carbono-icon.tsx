import { HTMLAttributes } from "react";

export default function CarbonoIcon({
  fill = "currentColor",
  innerFill = "var(--background-base)",
  ...attrs
}: HTMLAttributes<HTMLOrSVGElement> & {
  innerFill?: string;
  fill?: string;
}) {
  return (
    <svg
      {...attrs}
      height="600"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 600 600"
      width="600"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        d="M300 24 L536 162 L536 438 L300 576 L64 438 L64 162 Z"
        fill={fill}
      />
      <path
        d="M300 172 L414 239 L414 373 L300 440 L186 373 L186 239 Z"
        fill={innerFill}
      />
    </svg>
  );
}
