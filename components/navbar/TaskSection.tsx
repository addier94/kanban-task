"use client";

import { AddTaskBtn } from "../common/AddTaskBtn";
import { BurgerMenu } from "./BurgerMenu";
import { useState } from "react";
import { Board, Column } from "@prisma/client";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { CreateTask } from "@/app/(boards)/[name]/[boardId]/(task)/_component/CreateTask";

interface TaskSectionProps extends Board {
  columns: Column[];
}

export const TaskSection: React.FC<{ boards: TaskSectionProps[] }> = ({
  boards,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();

  const boardId = path.split("/")[2];
  const currentBoard = boards.find((board) => board.id === boardId);
  const isWithoutColumn = !currentBoard?.columns.length;

  const addTask = () => {
    if (isWithoutColumn) {
      toast.error("You should create column first!");
    } else {
      setIsOpen(true);
    }
  };

  return (
    <section className="flex items-center gap-5">
      {!isWithoutColumn && (
        <CreateTask
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          columns={currentBoard?.columns}
        />
      )}
      <AddTaskBtn onClick={() => addTask()} className="hidden xs-custom:block">
        +Add New Task
      </AddTaskBtn>
      <BurgerMenu boards={boards} />
    </section>
  );
};
