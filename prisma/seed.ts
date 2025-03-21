const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Seed default roles
  await prisma.role.createMany({
    data: [{ role: "STUDENT" }, { role: "TEACHER" }, { role: "ADMIN" }],
    skipDuplicates: true,
  });

  console.log("Default roles seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
