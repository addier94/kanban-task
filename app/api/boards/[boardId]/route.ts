import { NextResponse } from "next/server";
import { Board } from "@/lib/types";
import prisma from "@/lib/db";

// Edit Board
export async function POST(
  req: Request,
  { params }: { params: { boardId: string } }
) {
  try {
    const body: Board = await req.json();
    const emptyField = body.name.trim().length === 0;
    const lessChars = body.name.trim().length < 3;

    if (emptyField) {
      return new NextResponse("Can't be empty", { status: 400 });
    }

    if (lessChars) {
      return new NextResponse("Can't be less than 2 chars", { status: 400 });
    }

    const boards = await prisma.board.findMany();

    const lowerBoards: string[] = boards.map(({ name }) =>
      name.trim().toLowerCase()
    );

    const updatedBoard = await prisma.board.update({
      where: { id: params.boardId },
      data: {
        name: body.name,
        columns: {
          updateMany: body.columns.map(({ id, name }) => {
            return {
              where: { id },
              data: { name },
            };
          }),
        },
      },
      include: {
        columns: true, // Including columns in the response
      },
    });

    return NextResponse.json(updatedBoard);
  } catch (error) {
    console.log("ERROR_CREATING_BOARD", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Delete Board
export async function DELETE(
  request: Request,
  { params }: { params: { boardId: string } }
) {
  try {
    const boardId = params.boardId;
    // Step 1: Find all columns associated with the board
    const columns = await prisma.column.findMany({
      where: {
        boardId,
      },
      include: {
        tasks: true,
      },
    });

    // Step 2: Delete tasks and subtasks associated with each column in parallel
    await Promise.all(
      columns.map(async (column) => {
        const taskDeletionPromises = column.tasks.map(async (task) => {
          await prisma.subtask.deleteMany({
            where: {
              taskId: task.id,
            },
          });
          return prisma.task.delete({
            where: {
              id: task.id,
            },
          });
        });
        await Promise.all(taskDeletionPromises);
      })
    );

    // Step 3: Delete columns associated with the board
    await prisma.column.deleteMany({
      where: {
        boardId,
      },
    });

    // Step 4: Delete the board itself
    await prisma.board.delete({
      where: {
        id: boardId,
      },
    });

    return new NextResponse("success", { status: 200 });
  } catch (error) {
    console.error("ERROR_DELETING_BOARD:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
