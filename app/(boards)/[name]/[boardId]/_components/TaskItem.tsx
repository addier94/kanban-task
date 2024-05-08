import { Column, Subtask, Task } from "@prisma/client";
import { TaskItemButtons } from "./TaskItemButtons";

interface TaskItemProps {
  columns: Column[];
  task: Task & { subtasks: Subtask[] };
}

export const TaskItem = ({ columns, task }: TaskItemProps) => {
  return (
    <>
      <article
        className="
        dark:bg-primary-dark-grey
        bg-primary-white
        px-4
        pb-4
        pt-2
        mb-4
        rounded-lg
      "
      >
        <TaskItemButtons columns={columns} task={task} />
        <h2 className="text-primary-black dark:text-primary-white font-semibold">
          {task.title}
        </h2>
        <p className="text-primary-medium-grey">{task.description}</p>
      </article>
    </>
  );
};
