"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

import Modal from "@/components/modals/Modal";
import Helper from "@/utils/helper";
import { BoardWithId } from "@/lib/types";
import { Input } from "@/components/common/Input";
import { BtnMain } from "@/components/common/BtnMain";
import { IconCross } from "@/components/common/icon/IconCross";

interface BoardNameInputProps {
  value: string;
  error: string;
  onChange: (value: string) => void;
}

// BoardNameInput.tsx
const BoardNameInput = ({ value, error, onChange }: BoardNameInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2 mb-5">
      <label htmlFor="name">Board Name</label>
      <Input
        id="name"
        name="name"
        error={{ name: error, onInput: "name" }}
        placeholder="e.g Web design"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

// ColumnInput.tsx
interface ColumnInputProps {
  id: string;
  value: string;
  onChange: (id: string, value: string) => void;
}

const ColumnInput = ({ id, value, onChange }: ColumnInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(id, e.target.value);
  };

  return (
    <Input
      onChange={handleChange}
      value={value}
      id={`column-${id}`}
      name={`column-${id}`}
    />
  );
};

// AddColumnButton.tsx
interface AddColumnButtonProps {
  onClick: () => void;
}

const AddColumnButton = ({ onClick }: AddColumnButtonProps) => {
  return (
    <BtnMain onClick={onClick} type="button" secondary>
      +Add New Column
    </BtnMain>
  );
};

// EditBoard.tsx
interface EditBoardProps {
  isOpen?: boolean;
  onClose: () => void;
  board: BoardWithId;
}

export const EditBoard = ({ isOpen, onClose, board }: EditBoardProps) => {
  const [error, setError] = useState("");
  const [updatedBoard, setUpdatedBoard] = useState<BoardWithId>(board);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`/api/boards/${board.id}`, updatedBoard);
      onClose();
      router.push(`/${Helper.slugify(updatedBoard.name)}/${board.id}`);
      router.refresh();
    } catch (error) {
      const err = error as AxiosError;
      setError(`${err.response?.data}`);
    }
  };

  const handleBoardNameChange = (value: string) => {
    setUpdatedBoard((prev) => ({ ...prev, name: value }));
    if (error.length > 0) setError("");
  };

  const handleColumnChange = (id: string, value: string) => {
    const updatedColumns = [...updatedBoard.columns];
    const index = updatedColumns.findIndex((column) => column.id === id);
    updatedColumns[index] = { ...updatedColumns[index], name: value };
    setUpdatedBoard((prev) => ({ ...prev, columns: updatedColumns }));
    if (error.length > 0) setError("");
  };

  const addNewColumn = async () => {
    try {
      const resp = await axios.post(`/api/columns`, { boardId: board.id });
      const updatedBoardColumns = [
        ...updatedBoard.columns,
        { name: resp.data.name, id: resp.data.id },
      ];
      setUpdatedBoard((prev) => ({ ...prev, columns: updatedBoardColumns }));
    } catch (error) {
      console.log("Cannot create column", error);
    }
  };

  const removeColumn = async (columnId: string) => {
    try {
      await axios.delete(`/api/columns/${columnId}`);
      const updatedColumns = [...updatedBoard.columns];
      const indexToDelete = updatedColumns.findIndex(
        (column) => column.id === columnId
      );
      updatedColumns.splice(indexToDelete, 1);
      setUpdatedBoard((prev) => ({ ...prev, columns: updatedColumns }));
    } catch (error) {
      console.log("Cannot delete column", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h1 className="text-lg mb-5 text-primary-black dark:text-primary-white">
              Edit Board
            </h1>
            <BoardNameInput
              value={updatedBoard.name}
              error={error}
              onChange={handleBoardNameChange}
            />
          </div>
        </div>

        <div>
          <h4>Board Columns</h4>
          <section className="mt-2 flex flex-col gap-4">
            {updatedBoard.columns.map((column, index) => (
              <div
                key={column.id}
                className="flex gap-4 justify-between items-center"
              >
                <ColumnInput
                  id={column.id}
                  value={column.name}
                  onChange={handleColumnChange}
                />
                <IconCross
                  onClick={() => removeColumn(column.id)}
                  viewBox="0 0 18 18"
                  width={18}
                  height={18}
                  className="cursor-pointer dark:text-primary-medium-grey"
                />
              </div>
            ))}
          </section>
        </div>

        <div className="flex flex-col gap-5 mt-4">
          <AddColumnButton onClick={addNewColumn} />
          <BtnMain>Save Changes</BtnMain>
        </div>
      </form>
    </Modal>
  );
};
