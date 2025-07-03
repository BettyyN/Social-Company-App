const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRaw`DELETE FROM "User";`;

  // Reset the ID sequence
  await prisma.$executeRaw`ALTER SEQUENCE "User_userId_seq" RESTART WITH 1;`;

  await prisma.role.createMany({
    data: [
      { roleName: "STUDENT" },
      { roleName: "TEACHER" },
      { roleName: "ADMIN" },
    ],
    skipDuplicates: true,
  });

  const adminRole = await prisma.role.findUnique({
    where: { roleName: "ADMIN" },
  });
  const bcrypt = require("bcrypt");
  const hashedpassword = await bcrypt.hash("1234abcd",10);

  await prisma.user.create({
    data: {
      firstName: "John",
      lastName: "Doe",
      password: hashedpassword,
      phoneNumber: "0900000000",
      roleId: adminRole.roleId,
    },
  });

  console.log("Default roles and user seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
