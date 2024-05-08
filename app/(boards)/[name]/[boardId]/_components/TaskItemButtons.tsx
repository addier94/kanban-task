"use client";

import IconClose from "@/components/common/icon/IconClose";
import IconEdit from "@/components/common/icon/IconEdit";
import IconView from "@/components/common/icon/IconView";
import { Column, Subtask, Task } from "@prisma/client";
import { useState } from "react";
import { EditTask } from "../(task)/_component/EditTask";
import { DeleteTask } from "../(task)/_component/DeleteTask";

interface TaskItemButtonsProps {
  columns: Column[];
  task: Task & { subtasks: Subtask[] };
}

export const TaskItemButtons = ({ task, columns }: TaskItemButtonsProps) => {
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const column = columns.find((column) => column.id === task.columnId)!;

  return (
    <>
      <EditTask
        columns={columns}
        column={column}
        task={task}
        isOpen={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
      />
      <DeleteTask
        isOpen={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        task={task}
      />
      <header className="flex justify-end gap-4">
        <button>
          <IconView className="w-6 h-6" viewBox="0 -960 960 960" />
        </button>
        <button onClick={() => setIsOpenEdit(true)}>
          <IconEdit className="w-6 h-6" viewBox="0 -960 960 960" />
        </button>
        <button onClick={() => setIsOpenDelete(true)}>
          <IconClose className="w-6 h-6" viewBox="0 -960 960 960" />
        </button>
      </header>
    </>
  );
};
