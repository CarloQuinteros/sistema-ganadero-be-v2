import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("DB connected via Prisma");
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Database connection error ${error.message}`);
    } else {
      console.error("Unknown database connection error");
    }
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  await prisma.$disconnect();
};
