import Image from "next/image";

interface IconChevronDownProps {
  className?: string;
}

export const IconChevronDown = ({ className }: IconChevronDownProps) => {
  return (
    <Image
      src="/assets/icon-chevron-down.svg"
      className={`w-2 h-1 ml-2 ${className || ""}`}
      width={0}
      height={0}
      alt="Icon Chevron Down"
    />
  );
};
