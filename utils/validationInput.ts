import { Subtask, Task } from "@prisma/client";

interface TNewTaskState extends Task {
  subtasks: { title: string; isCompleted: boolean }[];
}

export class ValidationInput {
  static createTask(task: TNewTaskState) {
    // Validate title length
    if (!/^.{3,40}$/.test(task.title)) {
      throw new Error("Title must be between 3 and 40 characters long");
    }
    // Validate description length
    if (!/^.{5,300}$/.test(task.description ?? "")) {
      throw new Error("Description must be between 5 and 300 characters long");
    }

    // Validate subtask titles
    for (const subtask of task.subtasks) {
      if (!/^.{3,40}/.test(subtask.title)) {
        throw new Error(
          "Subtask title must be between 3 and 40 characters long"
        );
      }
    }

    // Ensure status is not empty
    if (task.status === "") {
      throw new Error("Status cannot be empty");
    }
  }

  static updateTask(task: Task & { subTasks: Subtask[] }) {
    // Validate title length
    if (!/^.{3,40}$/.test(task.title)) {
      throw new Error("Title must be between 3 and 40 characters long");
    }
    // Validate description length
    if (!/^.{5,300}$/.test(task.description ?? "")) {
      throw new Error("Description must be between 5 and 300 characters long");
    }

    // Validate subtask titles
    for (const subtask of task.subTasks) {
      if (!/^.{3,40}/.test(subtask.title)) {
        throw new Error(
          "Subtask title must be between 3 and 40 characters long"
        );
      }
    }

    // Ensure status is not empty
    if (task.status === "") {
      throw new Error("Status cannot be empty");
    }
  }
}
