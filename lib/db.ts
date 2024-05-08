import { PrismaClient } from "@prisma/client";

// Declare a global variable to hold the PrismaClient instance
declare global {
  var prisma: PrismaClient | undefined;
}

// Initialize the PrismaClient instance if it's not already initialized
export const prisma = globalThis.prisma || new PrismaClient();

// If not in production environment, set the global prisma variable
if (process.env.NODE_ENV !== "production" && !globalThis.prisma) {
  globalThis.prisma = prisma;
}

export default prisma;
