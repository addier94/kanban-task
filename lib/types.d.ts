export interface Board {
  name: string;
  columns: Column[];
}

export interface Column {
  id: string;
  name: string;
  tasks?: Task[];
}

export type BoardWithId = Board & { id: string };

export interface Task {
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

export interface Subtask {
  title: string;
  isCompleted: boolean;
}
