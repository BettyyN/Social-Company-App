/*
  Warnings:

  - You are about to drop the column `name` on the `Role` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[role]` on the table `Role` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "RoleType" ADD VALUE 'OTHER';

-- DropIndex
DROP INDEX "Role_name_key";

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "name",
ADD COLUMN     "role" "RoleType" NOT NULL DEFAULT 'STUDENT';

-- CreateIndex
CREATE UNIQUE INDEX "Role_role_key" ON "Role"("role");
