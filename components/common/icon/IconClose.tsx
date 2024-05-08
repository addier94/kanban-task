import clsx from "clsx";

const IconClose = (props: React.ComponentProps<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // viewBox="0 -960 960 960"
      className={clsx("", props.className)}
      {...props}
    >
      <path
        d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
        className="fill-current"
      />
    </svg>
  );
};

export default IconClose;
