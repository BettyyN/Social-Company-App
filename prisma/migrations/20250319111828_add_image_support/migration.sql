/*
  Warnings:

  - Made the column `phoneNumber` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profilePicture" TEXT,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "phoneNumber" SET NOT NULL;

-- CreateTable
CREATE TABLE "PostImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "PostImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostImage" ADD CONSTRAINT "PostImage_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
