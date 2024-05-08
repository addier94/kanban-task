import { prisma } from "@/lib/db";
import { ValidationInput } from "@/utils/validationInput";
import { Subtask, Task } from "@prisma/client";
import { NextResponse } from "next/server";

interface TTask extends Task {
  subTasks: Subtask[];
}

export async function DELETE(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    // find task
    const task = await prisma.task.findFirst({
      where: { id: params.taskId },
      include: { subtasks: true },
    });
    if (!task) {
      throw new Error("Task with the provided id doesn't exist");
    }

    await prisma.subtask.deleteMany({ where: { taskId: task.id } });

    await prisma.task.delete({ where: { id: task.id } });

    return new NextResponse("Task deleted successfully");
  } catch (error) {
    console.error("ERROR PROCESSING REQUEST FOR DELETE TASK:", error);

    // Default error message and status code
    let errorMessage = "Internal Server Error";
    let statusCode = 500;

    // If the error is an instance of Error, use its message and set status code
    if (error instanceof Error) {
      errorMessage = error.message;
      statusCode = 422; // Unprocessable Entity (assuming input validation error)
    }

    // Return an error response with appropriate message and status code
    return new NextResponse(errorMessage, { status: statusCode });
  }
}

export async function PUT(req: Request) {
  try {
    // Parse JSON body of the request
    const task: TTask = await req.json();

    ValidationInput.updateTask(task);

    const updateTask = await prisma.task.update({
      where: { id: task.id },
      data: {
        title: task.title,
        description: task.description,
        status: task.status, // column name
        columnId: task.columnId,
      },
    });

    const subTaskUpdatePromises = task.subTasks.map(async (subTask) => {
      if (subTask.id) {
        const updatedSubTask = await prisma.subtask.update({
          where: { id: subTask.id },
          data: {
            title: subTask.title,
          },
        });
        return updatedSubTask;
      }
    });
    const updateSubTasks = await Promise.all(subTaskUpdatePromises);
    const response = { ...updateTask, subTasks: updateSubTasks };

    return new NextResponse(JSON.stringify(response));
  } catch (error) {
    console.error("ERROR PROCESSING REQUEST FOR EDIT TASK:", error);

    // Default error message and status code
    let errorMessage = "Internal Server Error";
    let statusCode = 500;

    // If the error is an instance of Error, use its message and set status code
    if (error instanceof Error) {
      errorMessage = error.message;
      statusCode = 422; // Unprocessable Entity (assuming input validation error)
    }

    // Return an error response with appropriate message and status code
    return new NextResponse(errorMessage, { status: statusCode });
  }
}
