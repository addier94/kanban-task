"use client";

import { useState } from "react";
import { Logo } from "./Logo";
import Modal from "../modals/Modal";
import { NavItem } from "./NavItem";
import { CreateBoard } from "@/app/(boards)/_components/CreateBoard";
import { SwitchTheme } from "../theme/SwitchTheme";
import { IconBoard } from "../common/icon";
import { useSidebarContext } from "@/hook/SidebarContext";
import { Board } from "@prisma/client";

interface MobileLogoProps {
  boards: Board[];
}

export const MobileLogo: React.FC<MobileLogoProps> = ({ boards }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCreateBoard, setIsOpenCreateBoard] = useState(false);
  const { sidebarState } = useSidebarContext();
  const { isMobile } = sidebarState;

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);
  const handleOpenCreateBoard = () => setIsOpenCreateBoard(true);
  const handleCloseCreateBoard = () => setIsOpenCreateBoard(false);

  return (
    <>
      {isMobile && (
        <>
          <MobileMenu
            boards={boards}
            isOpen={isOpen}
            onClose={handleCloseModal}
            onOpenCreateBoard={handleOpenCreateBoard}
          />
          <CreateBoard
            isOpen={isOpenCreateBoard}
            onClose={handleCloseCreateBoard}
          />
        </>
      )}

      <li
        onClick={handleOpenModal}
        className="hidden xs-custom:flex items-center"
      >
        <Logo className="mr-8" />
      </li>
    </>
  );
};

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCreateBoard: () => void;
  boards: Board[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onOpenCreateBoard,
  boards,
}) => {
  const handleModal = () => {
    onOpenCreateBoard();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} customDialog="py-5">
      <article className="w-[264px] bg-primary-white dark:bg-primary-dark-grey rounded-lg text-primary-medium-grey">
        <h2 className="mx-6 text-xs tracking-[2.4px] font-plus-jakarta-sans-normal font-bold">
          ALL BOARDS ({boards.length})
        </h2>
        <nav className="mt-4 list-none">
          {boards.map((board) => (
            <NavItem key={board.id} board={board} />
          ))}
        </nav>
        <button
          onClick={handleModal}
          className="flex items-center gap-3 px-6 mt-3 cursor-pointer"
        >
          <IconBoard
            width={16}
            height={16}
            className="text-primary-main-purple"
          />
          <p className="text-primary-main-purple">+ Create New Board</p>
        </button>
        <SwitchTheme />
      </article>
    </Modal>
  );
};
