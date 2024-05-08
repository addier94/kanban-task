import prisma from "@/lib/db";
import { ColumnItem } from "./_components/ColumnItem";
import { AddColumnButton } from "./_components/addColumnButton";
import { Column, Subtask, Task } from "@prisma/client";
import { EmptyBoard } from "@/components/common/EmptyBoard";

interface ParamsProps {
  params: { name: string; boardId: string };
}

interface TTask extends Task {
  subtasks: Subtask[];
}

interface TColumn extends Column {
  tasks: TTask[];
}

export default async function Home({ params }: ParamsProps) {
  try {
    const columns: TColumn[] = await prisma.column.findMany({
      where: {
        boardId: params.boardId,
      },
      include: {
        tasks: {
          include: {
            subtasks: true,
          },
        },
      },
    });

    if (columns.length === 0) return <EmptyBoard />;

    return (
      <article
        className="
          flex
          py-5
          gap-6
          px-6
          w-full
          overflow-auto
          bg-primary-light-grey-light
          dark:bg-primary-very-dark-grey
        "
      >
        {columns.map((column) => (
          <ColumnItem key={column.id} columns={columns} column={column} />
        ))}
        <AddColumnButton boardId={params.boardId} />
      </article>
    );
  } catch (error) {
    return (
      <div className="flex items-center justify-center w-full">
        <h4 className="text-primary-main-purple font-bold text-3xl ">
          Error fetching data
        </h4>
      </div>
    );
  }
}
