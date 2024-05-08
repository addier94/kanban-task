import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// Delete Column
export async function DELETE(
  request: Request,
  { params }: { params: { columnId: string } }
) {
  try {
    // Find all task associated with the column
    const tasks = await prisma?.task.findMany({
      where: {
        columnId: params.columnId,
      },
    });

    await Promise.all(
      tasks?.map(async (task) => {
        await prisma.subtask.deleteMany({ where: { taskId: task.id } });
      })
    );

    await prisma.task.deleteMany({
      where: {
        columnId: params.columnId,
      },
    });

    await prisma?.column.delete({
      where: { id: params.columnId },
    });
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("ERROR_DELETING_COLUMN", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
