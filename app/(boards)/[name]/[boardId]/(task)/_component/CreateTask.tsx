import { useState, ChangeEvent, FormEvent } from "react";
import Modal from "@/components/modals/Modal";
import { BtnMain } from "@/components/common/BtnMain";
import { Input } from "@/components/common/Input";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Subtasks } from "./Subtasks";
import { Column, Task } from "@prisma/client";
import axios from "axios";
import { ErrorHandle } from "@/utils/errorHandle";
import { StatusSelection } from "./StatusSelection";

interface CreateTaskProps {
  isOpen: boolean;
  onClose: () => void;
  columns: Column[];
}

interface TTaskState extends Task {
  subtasks: { title: string; isCompleted: boolean }[];
}

interface NewTaskState {
  task: TTaskState;
}

const initialTaskState: NewTaskState = {
  task: {
    title: "",
    description: "",
    subtasks: [{ title: "", isCompleted: false }],
    status: "",
    columnId: "",
    id: "",
  },
};

export const CreateTask: React.FC<CreateTaskProps> = ({
  isOpen,
  onClose,
  columns,
}) => {
  const [newTask, setNewTask] = useState<NewTaskState>(initialTaskState);
  const pathName = usePathname();
  const router = useRouter();

  const boardId = pathName.split("/")[2];

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewTask((prevState) => ({
      task: {
        ...prevState.task,
        [name]: value,
      },
    }));
  };

  const handleSubtaskChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setNewTask(({ task }) => ({
      task: {
        ...task,
        subtasks: task.subtasks.map((subtask, i) =>
          i === index ? { ...subtask, title: value } : subtask
        ),
      },
    }));
  };

  const handleRemoveSubtask = (index: number) => {
    setNewTask((prevTask) => ({
      task: {
        ...prevTask.task,
        subtasks: prevTask.task.subtasks.filter((_, i) => i !== index),
      },
    }));
  };

  const addEmptyNewSubtaskInput = () => {
    setNewTask((prevTask) => ({
      task: {
        ...prevTask.task,
        subtasks: [
          ...prevTask.task.subtasks,
          { title: "", isCompleted: false },
        ],
      },
    }));
  };

  const handleUpdateStatus = (columnId: string, value: string) => {
    setNewTask((prevTask) => ({
      task: { ...prevTask.task, status: value, columnId },
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!newTask.task.columnId) throw new Error("Choose an column");
      await axios.post(`/api/tasks`, newTask);
      setNewTask(initialTaskState);
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
            Add New Task
          </h5>
          <div className="flex flex-col gap-2 mb-5">
            <label htmlFor="title">Title</label>
            <Input
              id="title"
              name="title"
              value={newTask.task.title}
              onChange={handleChange}
              placeholder="e.g Web design"
            />
          </div>
          <div className="flex flex-col gap-2 mb-5">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={newTask.task.description ?? ""}
              onChange={handleChange}
              className="py-2 px-4 bg-transparent border-primary-medium-grey rounded-sm border-opacity-25 border-[1px] resize-none h-28 focus:outline-none focus:border-primary-main-purple"
              placeholder="e.g It's always good to take a break. This 15 minute break will recharge the batteries a little."
            />
          </div>
          <h4 className="mb-2">Subtasks</h4>
          <Subtasks
            subtasks={newTask.task.subtasks}
            onChange={handleSubtaskChange}
            removeSubtask={handleRemoveSubtask}
          />
        </div>
        <div className="flex flex-col gap-7 mt-4">
          <BtnMain onClick={addEmptyNewSubtaskInput} type="button" secondary>
            + Add New Subtask
          </BtnMain>
          <StatusSelection
            columns={columns}
            onUpdateStatus={handleUpdateStatus}
          />
          <BtnMain type="submit">Create New Task</BtnMain>
        </div>
      </form>
    </Modal>
  );
};
