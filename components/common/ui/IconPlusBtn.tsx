import Image from "next/image";

interface AddButtonProps {
  className?: string;
}

export const IconPlusBtn = ({ className }: AddButtonProps) => {
  return (
    <button
      className={`
            h-8
            w-12
            bg-primary-main-purple
            duration-150
            hover:bg-primary-main-purple-hover
            flex
            justify-center
            items-center
            rounded-full
            ${className || ""}
          `}
    >
      <Image
        src="/assets/icon-add-task-mobile.svg"
        className="
              w-3
              h-3
              "
        width={0}
        height={0}
        alt="Icon add task mobile"
      />
    </button>
  );
};
