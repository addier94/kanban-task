import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Modal from "@/components/modals/Modal";
import { BtnMain } from "@/components/common/BtnMain";
import { Input } from "@/components/common/Input";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Subtasks } from "./Subtasks";
import { StatusSelection } from "./StatusSelection";
import { Column, Subtask, Task } from "@prisma/client";
import axios from "axios";
import { ErrorHandle } from "@/utils/errorHandle";

interface EditTaskProps {
  isOpen: boolean;
  onClose: () => void;
  columns: Column[];
  task: Task & { subtasks: Subtask[] };
  column: Column;
}

interface TTaskState extends Task {
  subTasks: Subtask[];
}

const initialTaskState: TTaskState = {
  title: "",
  description: "",
  subTasks: [],
  status: "",
  columnId: "",
  id: "",
};

export const EditTask: React.FC<EditTaskProps> = ({
  isOpen,
  onClose,
  columns,
  column,
  task,
}) => {
  const [editTask, setEditTask] = useState<TTaskState>(initialTaskState);
  const pathName = usePathname();
  const router = useRouter();

  const boardId = pathName.split("/")[2];
  useEffect(() => {
    setEditTask(() => ({
      title: task.title,
      description: task.description,
      subTasks: task.subtasks,
      status: column.name,
      columnId: column.id,
      id: task.id,
    }));
  }, [column, task]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setEditTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubtaskChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setEditTask((task) => ({
      ...task,
      subtasks: task.subTasks.map((subtask, i) =>
        i === index ? { ...subtask, title: value } : subtask
      ),
    }));
  };

  const handleRemoveSubtask = (index: number) => {
    setEditTask((prevTask) => ({
      ...prevTask,
      subtasks: prevTask.subTasks.filter((_, i) => i !== index),
    }));
  };

  const addEmptyNewSubtaskInput = () => {
    setEditTask((prevTask) => ({
      ...prevTask,
      subtasks: [...prevTask.subTasks],
    }));
  };

  const handleUpdateStatus = (columnId: string, value: string) => {
    setEditTask((prevTask) => ({
      ...prevTask,
      status: value,
      columnId,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!editTask.columnId) throw new Error("Choose an column");
      await axios.put(`/api/tasks/${task.id}`, editTask);
      onClose();
      router.refresh();
    } catch (error: any) {
      const errorMsg = ErrorHandle.errorMessage(error);
      toast.error(errorMsg);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="border-b border-gray-900/10">
          <h5 className="text-lg mb-5 text-primary-black dark:text-primary-white">
            Edit Task
          </h5>
          <div className="flex flex-col gap-2 mb-5">
            <label htmlFor="title">Title</label>
            <Input
              id="title"
              name="title"
              value={editTask.title}
              onChange={handleChange}
              placeholder="e.g Web design"
            />
          </div>
          <div className="flex flex-col gap-2 mb-5">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={editTask.description ?? ""}
              onChange={handleChange}
              className="py-2 px-4 bg-transparent border-primary-medium-grey rounded-sm border-opacity-25 border-[1px] resize-none h-28 focus:outline-none focus:border-primary-main-purple"
              placeholder="e.g It's always good to take a break. This 15 minute break will recharge the batteries a little."
            />
          </div>
          <h4 className="mb-2">Subtasks</h4>
          <Subtasks
            subtasks={editTask.subTasks}
            onChange={handleSubtaskChange}
            removeSubtask={handleRemoveSubtask}
          />
        </div>
        <div className="flex flex-col gap-7 mt-4">
          <BtnMain onClick={addEmptyNewSubtaskInput} type="button" secondary>
            + Add New Subtask
          </BtnMain>
          <StatusSelection
            editColumn={column}
            onUpdateStatus={handleUpdateStatus}
            columns={columns}
          />
          <BtnMain type="submit">Create New Task</BtnMain>
        </div>
      </form>
    </Modal>
  );
};
