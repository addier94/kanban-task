import { PrismaClient } from "@prisma/client";

const database = new PrismaClient();

async function main() {
  try {
    await database.board.createMany({
      data: [
        { name: "Platform Launch" },
        { name: "Marketing Plan" },
        { name: "Roadmap" },
      ],
    });
    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories: ", error);
  } finally {
    await database.$disconnect();
  }
}

main();
