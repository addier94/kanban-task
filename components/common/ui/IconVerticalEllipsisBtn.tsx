import Image from "next/image";

export const IconVerticalEllipsisBtn = () => {
  return (
    <Image
      src="/assets/icon-vertical-ellipsis.svg"
      className="
        cursor-pointer 
        w-[3.69px] 
        h-4
        xs-custom:w-[4.62px]
        xs-custom:h-[20px]
        "
      width={0}
      height={0}
      alt="Icon vertical ellipsis"
    />
  );
};
