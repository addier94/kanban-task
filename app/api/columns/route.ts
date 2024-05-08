import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// Create column
export async function POST(req: Request) {
  try {
    // Find the board by its ID
    const { boardId } = await req.json();
    const board = await prisma.board.findUnique({
      where: {
        id: boardId,
      },
    });

    // If the board doesn't exist, hadle the error or return null
    if (!board) {
      return new NextResponse("Board not found", { status: 400 });
    }

    // Create a new column associated with the found board
    const newColumn = await prisma.column.create({
      data: {
        name: "Empty column",
        board: {
          connect: {
            id: boardId,
          },
        },
      },
    });

    return NextResponse.json(newColumn);
  } catch (error) {
    console.error("ERROR_CREATING_COLUMN");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// getColumns
export async function GET(
  req: Request,
  { params }: { params: { boardId: string } }
) {
  try {
    const columns = await prisma.column.findMany({
      where: {
        boardId: params.boardId,
      },
    });
    return NextResponse.json(columns);
  } catch (error) {
    console.error("ERROR_GETTING_COLUMNS");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
