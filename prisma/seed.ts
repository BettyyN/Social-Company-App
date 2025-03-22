const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRaw`DELETE FROM "User";`;

  // Reset the ID sequence
  await prisma.$executeRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1;`;

  await prisma.role.createMany({
    data: [{ role: "STUDENT" }, { role: "TEACHER" }, { role: "ADMIN" }],
    skipDuplicates: true,
  });
const adminRole = await prisma.role.findUnique({
  where: { role: "ADMIN" },
});

  // Insert a sample user
  await prisma.user.create({
    data: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "hashedpassword",
      phoneNumber: "123456789",
      roleId: adminRole.id,
    },
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
