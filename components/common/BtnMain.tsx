interface BtnMain {
  type?: "button" | "submit" | "reset" | undefined;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  primary?: boolean;
  danger?: boolean;
  info?: boolean;
}
export const BtnMain = ({
  type,
  children,
  onClick,
  secondary,
  primary,
  danger,
  info,
}: BtnMain) => {
  const defaultPrimary = !primary && !secondary && !danger && !info;

  return (
    <button
      onClick={onClick}
      type={type}
      className={`
        w-full
        h-[40px]
        rounded-full
        font-plus-jakarta-sans-normal
        font-bold
        transition-all
        duration-150
        text-[13px]
        ${
          defaultPrimary &&
          "text-primary-white bg-primary-main-purple hover:bg-primary-main-purple-hover"
        }
        ${
          secondary &&
          "bg-primary-main-purple/10 dark:bg-primary-white text-primary-main-purple hover:opacity-80"
        }
        ${danger && "bg-primary-red text-primary-white hover:opacity-80"}
        ${
          info &&
          "bg-primary-main-purple bg-opacity-25 hover:opacity-80 text-primary-main-purple"
        }
        `}
    >
      {children}
    </button>
  );
};
