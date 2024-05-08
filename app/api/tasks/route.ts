import { NextResponse } from "next/server";
import { prisma } from "@/lib//db";
import { Subtask, Task } from "@prisma/client";
import { ValidationInput } from "@/utils/validationInput";

interface TNewTaskState extends Task {
  subtasks: { title: string; isCompleted: boolean }[];
}

export async function POST(req: Request) {
  try {
    const body: { task: TNewTaskState } = await req.json();
    // Validate the task fields
    const { task } = body;
    ValidationInput.createTask(task);

    const newTask = await prisma.task.create({
      data: {
        title: task.title,
        description: task.description,
        status: task.status,
        subtasks: {
          create: task.subtasks.map((subtask) => ({ ...subtask })),
        },
        columnId: task.columnId,
      },
    });

    // Return a success response with the task data
    return new NextResponse(JSON.stringify(newTask));
  } catch (error) {
    console.error("ERROR PROCESSING REQUEST FOR CREATE TASK:", error);

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
