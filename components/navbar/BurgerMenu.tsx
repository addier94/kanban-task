import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import axios from "axios";

import { IconVerticalEllipsisBtn } from "../common/ui/IconVerticalEllipsisBtn";
import Modal from "../modals/Modal";
import { BtnMain } from "../common/BtnMain";
import { EditBoard } from "@/app/(boards)/_components/EditBoard";
import { Board, Column } from "@prisma/client";

interface BurgerMenuProps extends Board {
  columns: Column[];
}

export const BurgerMenu = ({ boards }: { boards: BurgerMenuProps[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (boards.length === 0) {
      router.push("/");
      return;
    }
  }, [boards, router]);

  const deleteBoard = async (id: string) => {
    const confirmation = window.confirm("This action cannot be undone");
    if (confirmation) {
      try {
        await axios.delete(`/api/boards/${id}`);
        setIsOpen(false);
        router.push("/");
        router.refresh();
      } catch (error) {
        console.log("Smething weng wrong!", error);
      }
    }
  };
  const boardId = pathName.split("/")[2];
  const currentBoard: BurgerMenuProps | undefined = boards.find(
    (board) => board.id === boardId
  );

  return (
    <>
      {currentBoard && (
        <>
          <EditOrDeleteBoard
            board={currentBoard}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            deleteBoard={deleteBoard}
          />
          <button className="p-2" onClick={() => setIsOpen(true)}>
            <IconVerticalEllipsisBtn />
          </button>
        </>
      )}
    </>
  );
};

interface EditOrDeleteBoardProps {
  isOpen?: boolean;
  onClose: () => void;
  board: BurgerMenuProps;
  deleteBoard: (id: string) => void;
}

const EditOrDeleteBoard = ({
  board,
  isOpen,
  onClose,
  deleteBoard,
}: EditOrDeleteBoardProps) => {
  const [onEdit, setOnEdit] = useState(false);

  const router = useRouter();

  const closeModals = () => {
    setOnEdit(false);
    onClose();
    router.refresh();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <article className="text-sm flex flex-col gap-6">
          <div
            className="border-l-4 border-orange-500 font-bold text-orange-700 p-4"
            role="alert"
          >
            <p>Do you wanna delete or edit the current Board?</p>
          </div>
          <p className="font-bold">{board.name ? board.name : board.id}</p>

          <footer className="flex gap-8">
            <BtnMain type="button" danger onClick={() => deleteBoard(board.id)}>
              Delete
            </BtnMain>
            <EditBoard board={board} isOpen={onEdit} onClose={closeModals} />
            <BtnMain onClick={() => setOnEdit(true)} type="button" secondary>
              Edit
            </BtnMain>
          </footer>
        </article>
      </Modal>
    </>
  );
};
