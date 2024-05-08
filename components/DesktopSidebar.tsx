"use client";

import { useSidebarContext } from "@/hook/SidebarContext";
import React, { useState } from "react";
import { SwitchTheme } from "./theme/SwitchTheme";
import { IconBoard, IconHideSidebar } from "./common/icon";
import { NavItem } from "./navbar/NavItem";
import { CreateBoard } from "@/app/(boards)/_components/CreateBoard";

interface DesktopSidebarProps {
  boards: { id: string; name: string }[];
}

const DesktopSidebar = ({ boards }: DesktopSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { sidebarState, closeSidebar } = useSidebarContext();

  const { isMobile, isShow } = sidebarState;

  const showDesktopSidebar = !isMobile && isShow;
  return (
    <>
      {showDesktopSidebar && (
        <aside
          className="
            bg-primary-white
            dark:bg-primary-dark-grey
            w-[258px]
            transition-opacity
            border-r-[1px]
            border-primary-lines-light
            dark:sm-custom:border-primary-lines-dark
            flex
            flex-shrink-0
            flex-col
            justify-between
          "
        >
          <div
            className="
              py-5
              text-primary-medium-grey
            "
          >
            <h2
              className="
              mx-6
              text-xs
              tracking-[2.4px]
              font-plus-jakarta-sans-normal
              font-bold
              "
            >
              ALL BOARDS ({boards.length})
            </h2>
            <nav
              className="
                mt-5
                list-none
              "
            >
              {boards.length > 0 &&
                boards.map((board) => <NavItem key={board.id} board={board} />)}
            </nav>
            <CreateBoard isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <button
              onClick={() => setIsOpen(true)}
              className="
                  flex
                  items-center
                  gap-3
                  px-6
                  mt-3
                  cursor-pointer
                "
            >
              <IconBoard
                width={16}
                height={16}
                className="text-primary-main-purple"
              />
              <p className="text-primary-main-purple">+ Create New Board</p>
            </button>
          </div>
          <section>
            <SwitchTheme />
            <button
              onClick={closeSidebar}
              className="
                    flex
                    items-center
                    gap-3
                    py-3
                    px-6
                    mt-5
                    mb-6
                    cursor-pointer
                    text-primary-medium-grey
                  "
            >
              <IconHideSidebar width="16" height="16" />
              <p>Hide Sidebar</p>
            </button>
          </section>
        </aside>
      )}
    </>
  );
};

export default DesktopSidebar;
