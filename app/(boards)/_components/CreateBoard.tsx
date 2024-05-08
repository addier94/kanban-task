"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Input } from "@/components/common/Input";
import { IconCross } from "@/components/common/icon/IconCross";
import Modal from "@/components/modals/Modal";
import { BtnMain } from "@/components/common/BtnMain";
import Helper from "@/utils/helper";
import { Board } from "@prisma/client";
import { ErrorHandle } from "@/utils/errorHandle";

// BoardInput.tsx
interface BoardInputProps {
  index: number;
  value: string;
  onChange: (index: number, value: string) => void;
  onRemoveColumn: (index: number) => void;
}

const ColumnItem = ({
  index,
  value,
  onChange,
  onRemoveColumn,
}: BoardInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(index, e.target.value);
  };

  return (
    <div className="flex gap-4 justify-between items-center">
      <Input
        onChange={handleChange}
        value={value}
        id={`column-${index}`}
        name={`column-${index}`}
      />
      <IconCross
        onClick={() => onRemoveColumn(index)}
        viewBox="0 0 18 18"
        width={18}
        height={18}
        className="cursor-pointer dark:text-primary-medium-grey"
      />
    </div>
  );
};

// CreateBoard.tsx
interface CreateBoardProps {
  isOpen?: boolean;
  onClose: () => void;
}

interface BoardState extends Board {
  columns: { id: string; name: string }[];
}

const boardState: BoardState = {
  id: "",
  name: "",
  columns: [{ name: "", id: "" }],
};

export const CreateBoard = ({ isOpen, onClose }: CreateBoardProps) => {
  const [errors, setErrors] = useState<any>({});
  const [newBoard, setNewBoard] = useState<BoardState>(boardState);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resp = await axios.post(`/api/boards`, newBoard);

      onClose();
      const name = Helper.slugify(resp.data.name);
      router.push(`/${name}/${resp.data.id}`);
      setNewBoard(boardState);
      router.refresh();
    } catch (error: any) {
      let errorObj: any = {};
      const err = ErrorHandle.errorMessage(error);
      typeof err === "string" ? (errorObj["name"] = err) : (errorObj = err);
      setErrors(errorObj);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "name") {
      setNewBoard((prev) => ({
        ...prev,
        name: value,
      }));
    } else {
      const index = parseInt(name.split("-")[1]);
      setNewBoard((prev) => {
        const updatedColumns = [...prev.columns];
        updatedColumns[index] = { id: updatedColumns[index].id, name: value };
        return {
          ...prev,
          columns: updatedColumns,
        };
      });
    }
    if (Object.keys(errors).length > 0) setErrors("");
  };

  const addNewColumn = () => {
    const updatedColumns = [...newBoard.columns, { name: "", id: "" }];
    const updatedBoard = { ...newBoard, columns: updatedColumns };
    setNewBoard(updatedBoard);
  };

  const removeColumn = (index: number) => {
    const updatedColumns = [...newBoard.columns];
    updatedColumns.splice(index, 1);
    const updatedBoard = { ...newBoard, columns: updatedColumns };
    setNewBoard(updatedBoard);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h1 className="text-lg mb-5 text-primary-black dark:text-primary-white">
              Add New Board
            </h1>
            <div className="flex flex-col gap-2 mb-5">
              <label htmlFor="name">Board Name</label>
              <Input
                id="name"
                name="name"
                error={{ name: errors?.name, onInput: "name" }}
                placeholder="e.g Web design"
                value={newBoard.name}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div>
          <h4>Board Columns</h4>
          <section className="mt-2 flex flex-col gap-4">
            {newBoard.columns.map((column, index) => (
              <ColumnItem
                key={index}
                index={index}
                value={column.name}
                onChange={(index, value) =>
                  handleChange({
                    target: { name: `column-${index}`, value },
                  } as ChangeEvent<HTMLInputElement>)
                }
                onRemoveColumn={removeColumn}
              />
            ))}
          </section>
        </div>

        <div className="flex flex-col gap-5 mt-4">
          <BtnMain onClick={addNewColumn} type="button" secondary>
            +Add New Column
          </BtnMain>
          <BtnMain> Create New Board</BtnMain>
        </div>
      </form>
    </Modal>
  );
};
