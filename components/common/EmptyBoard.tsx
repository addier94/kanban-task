"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import toast from "react-hot-toast";
import axios from "axios";

import { AddTaskBtn } from "./AddTaskBtn";
import { CreateBoard } from "@/app/(boards)/_components/CreateBoard";

export const EmptyBoard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const path = usePathname();
  const boardId = path.split("/")[2];

  if (boardId) {
    // create column
    return <CreateColumn boardId={boardId} />;
  }

  return (
    <>
      <CreateBoard isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Skeleton
        description="Please Create a new Board to get started."
        create={() => setIsOpen(true)}
        btn="+ Create New Board"
      />
    </>
  );
};

const CreateColumn = ({ boardId }: { boardId: string }) => {
  const router = useRouter();
  const addNewColumn = async () => {
    try {
      await axios.post(`/api/columns`, { boardId });
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something wen wrong!");
    }
  };
  return (
    <Skeleton
      description="This board is empty. Create a new column to get started."
      create={addNewColumn}
      btn="+Add New Column"
    />
  );
};

interface SkeletonProps {
  description: string;
  create: () => void;
  btn: string;
}

const Skeleton = ({ description, create, btn }: SkeletonProps) => {
  return (
    <div
      className="
      mx-auto
      w-full
      p-3
      flex 
      items-center
      justify-center
      "
    >
      <article
        className="
        h-[118px]
        flex
        flex-col
        justify-between
        items-center
      "
      >
        <h3
          className="
        text-lg
        font-bold
        text-primary-medium-grey
        text-center
        leading-[23px]
        "
        >
          {description}
        </h3>
        <AddTaskBtn onClick={create}>{btn}</AddTaskBtn>
      </article>
    </div>
  );
};
