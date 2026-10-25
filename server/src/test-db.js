
import "dotenv/config";
import prisma from "./config/prisma.js";

async function testDatabase() {
  try {
    await prisma.$connect();

    console.log("✅ PostgreSQL + Prisma connection successful");

    const users = await prisma.user.findMany();

    console.log(`✅ Users in database: ${users.length}`);
  } catch (error) {
    console.error("❌ Database connection failed:");
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();

