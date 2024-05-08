import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { Board } from "@prisma/client";

interface TBoard extends Board {
  columns: { name: string; id: string }[];
}

async function validateBoardData(board: TBoard) {
  const { name, columns } = board;
  const errors: any = {};

  if (!name || name.trim().length === 0) {
    errors.name = "Board name cannot be empty";
  }

  if (name.trim().length < 3) {
    if (!errors.name) {
      errors.name = "Board name must be at least 3";
    }
  }

  return errors;
}

async function checkBoardExistence(boardName: string) {
  const boards = await prisma.board.findMany();
  const lowerBoards: string[] = boards.map((board) => board.name.toLowerCase());
  return lowerBoards.includes(boardName.trim().toLocaleLowerCase());
}

// Create Board
export async function POST(req: Request) {
  try {
    const body: TBoard = await req.json();

    // Validate board data
    const errors = await validateBoardData(body);

    if (Object.keys(errors).length !== 0) {
      return new NextResponse(JSON.stringify(errors), {
        status: 422,
      });
    }

    const boardAlreadyExist = await checkBoardExistence(body.name);

    if (boardAlreadyExist) {
      return new NextResponse("Board name must be unique", { status: 422 });
    }

    const newBoard = await prisma.board.create({
      data: {
        name: body.name,
      },
      include: {
        columns: true, // Including columns in the response
      },
    });

    if (body.columns.length > 0) {
      await prisma.column.createMany({
        data: body.columns.map((column) => ({
          name: column.name,
          boardId: newBoard.id,
        })),
      });
    }

    return NextResponse.json(newBoard);
  } catch (error) {
    console.log("ERROR_CREATING_BOARD", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
