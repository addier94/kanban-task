import { BtnMain } from "@/components/common/BtnMain";
import Modal from "@/components/modals/Modal";
import { ErrorHandle } from "@/utils/errorHandle";
import { Subtask, Task } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface DeleteTaskProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task & { subtasks: Subtask[] };
}
export const DeleteTask = ({ isOpen, onClose, task }: DeleteTaskProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/tasks/${task.id}`);
      router.refresh();
      onClose();
    } catch (error: any) {
      const errorMsg = ErrorHandle.errorMessage(error);
      toast.error(errorMsg);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h5
        className="
          font-bold
          text-black
          dark:text-primary-white
          text-xl
          text-center
          mb-2
        "
      >
        <span className="text-primary-main-purple">Delete </span>
        <span>{task.title}</span>
      </h5>
      <p className="dark:text-primary-lines-light text-center text-primary-lines-dark">
        Are you Sure you would like to do this?
      </p>
      <div className="flex gap-6 mt-6">
        <BtnMain onClick={() => onClose()} info>
          Cancel
        </BtnMain>
        <BtnMain onClick={handleDelete} danger>
          Confirm
        </BtnMain>
      </div>
    </Modal>
  );
};
