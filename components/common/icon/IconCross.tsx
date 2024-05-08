import clsx from "clsx";

export const IconCross = (props: React.ComponentProps<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("", props.className)}
      {...props}
    >
      <g className="fill-current" fillRule="evenodd">
        <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
        <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
      </g>
    </svg>
  );
};
