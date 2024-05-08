"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const AddColumnButton = ({ boardId }: { boardId: string }) => {
  const router = useRouter();

  const addNewColumn = async () => {
    try {
      await axios.post(`/api/columns`, { boardId });
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <section
      className="
        w-[280px]
        mt-9
        flex-shrink-0
        bg-primary-lines-light
        dark:bg-primary-dark-grey
        flex
        items-center
        justify-center
        rounded-md
      "
    >
      <button onClick={addNewColumn} className="text-primary-medium-grey">
        + New Column
      </button>
    </section>
  );
};
