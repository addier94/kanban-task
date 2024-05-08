import { Column, Subtask, Task } from "@prisma/client";
import { TaskItem } from "./TaskItem";

interface TTask extends Task {
  subtasks: Subtask[];
}

interface TColumn extends Column {
  tasks: TTask[];
}
interface ColumItemProps {
  column: TColumn;
  columns: Column[];
}

export const ColumnItem = ({ column, columns }: ColumItemProps) => {
  return (
    <section
      className="
          w-[280px]
          flex-shrink-0
        "
    >
      <h3
        className="
          flex 
          font-plus-jakarta-sans-normal 
          tracking-[.2em] 
          text-primary-medium-grey 
          uppercase 
          gap-3
          mb-5
          items-center text-xs"
      >
        <div
          className="
            w-[15px] 
            h-[15px] 
            rounded-full 
            bg-primary-random1 
            "
        />
        <span>{column.name}</span>
        <span>({column.tasks?.length})</span>
      </h3>
      {column.tasks &&
        column.tasks.map((task) => (
          <TaskItem key={task.id} task={task} columns={columns} />
        ))}
    </section>
  );
};
