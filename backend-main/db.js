import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "https://vviemvanlsxkhlcjrofx.supabase.co",
    },
  },
});

export default prisma;
