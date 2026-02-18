import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const rawConnectionString = process.env.DATABASE_URL!;
const needsSsl =
  process.env.NODE_ENV === "production" ||
  rawConnectionString.includes("sslmode=");

// Remove sslmode from the connection string so pg uses our ssl config instead
const connectionString = rawConnectionString.replace(
  /[?&]sslmode=[^&]*/g,
  (match) => (match.startsWith("?") ? "?" : "")
).replace(/\?&/, "?").replace(/\?$/, "");

const pool = new Pool({
  connectionString,
  ...(needsSsl && { ssl: { rejectUnauthorized: false } }),
});
const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
