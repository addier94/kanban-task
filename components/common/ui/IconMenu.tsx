"use client";

import { useSidebarContext } from "@/hook/SidebarContext";
import Image from "next/image";

export const IconMenu = () => {
  const { openSidebar } = useSidebarContext();

  return (
    <Image
      onClick={openSidebar}
      src="/assets/logo-mobile.svg"
      className="cursor-pointer w-6 h-[25px]"
      width={0}
      height={0}
      alt="light mode"
    />
  );
};
