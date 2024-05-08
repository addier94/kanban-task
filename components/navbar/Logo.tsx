"use client";

import { useTheme } from "next-themes";
import logoDark from "../../public/assets/logo-dark.svg";
import logoLight from "../../public/assets/logo-light.svg";
import dynamic from "next/dynamic";
import { useSidebarContext } from "@/hook/SidebarContext";

interface LogoProps {
  className?: string;
}

const DynamicImage = dynamic(() => import("next/image"), { ssr: false });

export const Logo = ({ className }: LogoProps) => {
  const { theme } = useTheme();
  const { openSidebar, sidebarState } = useSidebarContext();

  const imagePath = theme === "dark" ? logoLight : logoDark;

  const onShowNavDesktop = !sidebarState.isMobile && sidebarState.isShow;

  return (
    <DynamicImage
      onClick={openSidebar}
      src={imagePath.src}
      className={`
            cursor-pointer
            w-[152.53px] 
            h-[25.22px]
            ${onShowNavDesktop && "mr-[88px]"}
            ${className || ""}
          `}
      width={0}
      height={0}
      alt="Icon Chevron Down"
    />
  );
};
