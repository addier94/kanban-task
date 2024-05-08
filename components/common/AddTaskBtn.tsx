interface AddTaskBtnProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
export const AddTaskBtn = ({
  children,
  className,
  onClick,
}: AddTaskBtnProps) => {
  return (
    <button
      className={`
          bg-primary-main-purple
          w-[174px]
          h-[48px]
          rounded-full
          text-[15px]
          font-semibold
          text-primary-white
          duration-150
          hover:bg-primary-main-purple-hover
          ${className || ""}
        `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
