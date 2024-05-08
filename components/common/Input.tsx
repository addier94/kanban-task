import clsx from "clsx";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: { name: string; onInput: string };
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, name, ...props }, ref) => {
    const existError = (error?.name || "").length > 0;
    const onCurrentError = name === error?.onInput;
    const onError = existError && onCurrentError;

    return (
      <div
        className={`
        w-full
        h-10
        rounded-sm
        border-[1px]
        border-primary-medium-grey
        border-opacity-25
        relative
        text-[13px]
        font-semibold
        font-plus-jakarta-sans-normal
        flex
        items-center
        justify-end
        px-2
        ${onError && "border-primary-red border-opacity-80 text-primary-red"}
      `}
      >
        {onError && error?.name}
        <input
          name={name}
          type={type} // Set the input type
          className={clsx(
            `
            text-primary-black
            dark:text-primary-white
              absolute
              inset-0
              px-5
              bg-transparent
              focus:ring-1
              focus:outline-none
            `,
            className
          )}
          ref={ref} // Set the ref for the input element
          {...props} // Spread other input props
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
