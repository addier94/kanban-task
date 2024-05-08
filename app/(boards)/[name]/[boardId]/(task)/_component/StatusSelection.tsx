import { Column } from "@prisma/client";
import React, { ChangeEvent, memo, useEffect, useState } from "react";

const optionState = {
  columnId: "",
  value: "",
};

interface StatusSelectionProps {
  onUpdateStatus: (columnId: string, value: string) => void;
  columns: Column[];
  editColumn?: Column;
}

export function StatusSelection({
  onUpdateStatus,
  columns,
  editColumn,
}: StatusSelectionProps) {
  const [option, setOption] = useState<{ columnId: string; value: string }>(
    optionState
  );
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const columnId =
      event.target.options[event.target.selectedIndex].dataset.columnId || "";

    setOption({ columnId, value });
    onUpdateStatus(columnId, value);
  };

  useEffect(() => {
    if (editColumn) {
      setOption(() => ({
        columnId: editColumn.id,
        value: editColumn.name,
      }));
    }
  }, [editColumn]);

  return (
    <article>
      <label
        htmlFor="status"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Status (Column)
      </label>
      <select
        id="status"
        name="status"
        value={option.value}
        onChange={handleChange}
        className="border-[1px] border-primary-medium-grey border-opacity-25 text-[13px] font-semibold font-plus-jakarta-sans-normal text-primary-black dark:text-primary-white rounded-sm focus:ring-1 block w-full p-2.5 bg-transparent dark:bg-primary-dark-grey focus:outline-none"
      >
        <option value="">Choose a status</option>
        {columns.map((column) => (
          <option
            key={column.id}
            value={column.name}
            data-column-id={column.id}
          >
            {column.name}
          </option>
        ))}
      </select>
    </article>
  );
}
