import { Input } from "@/components/common/Input";
import { IconCross } from "@/components/common/icon/IconCross";
import { ChangeEvent } from "react";

export const Subtasks: React.FC<{
  subtasks: { title: string; isCompleted: boolean }[];
  onChange: (index: number, event: ChangeEvent<HTMLInputElement>) => void;
  removeSubtask: (index: number) => void;
}> = ({ subtasks, onChange, removeSubtask }) => (
  <section className="flex flex-col gap-4">
    {subtasks.map((subtask, index) => (
      <div key={index} className="flex gap-4 justify-between items-center">
        <Input
          id={`subtask-${index}`}
          name={`subtask-${index}`}
          value={subtask.title}
          onChange={(event) => onChange(index, event)}
        />
        <IconCross
          onClick={() => removeSubtask(index)}
          viewBox="0 0 18 18"
          width={18}
          height={18}
          className="cursor-pointer dark:text-primary-medium-grey"
        />
      </div>
    ))}
  </section>
);
