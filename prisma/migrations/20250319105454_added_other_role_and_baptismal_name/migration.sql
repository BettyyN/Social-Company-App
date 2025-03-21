/*
  Warnings:

  - You are about to drop the column `userId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `positionId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GroupMember` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Position` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authorId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('STUDENT', 'TEACHER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Stage" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('WEEKLY', 'MONTHLY');

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('GENERAL', 'TEAM', 'EVENT');

-- CreateEnum
CREATE TYPE "ChatType" AS ENUM ('TEAM', 'PRIVATE');

-- CreateEnum
CREATE TYPE "ModStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "GroupMember" DROP CONSTRAINT "GroupMember_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupMember" DROP CONSTRAINT "GroupMember_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_positionId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "userId",
ADD COLUMN     "authorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "read" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "userId",
ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "eventId" INTEGER,
ADD COLUMN     "teamId" INTEGER,
ADD COLUMN     "type" "PostType" NOT NULL DEFAULT 'GENERAL';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "positionId",
ADD COLUMN     "baptismalName" TEXT,
ADD COLUMN     "batchId" INTEGER,
ADD COLUMN     "roleId" INTEGER NOT NULL,
ADD COLUMN     "teamId" INTEGER;

-- DropTable
DROP TABLE "Group";

-- DropTable
DROP TABLE "GroupMember";

-- DropTable
DROP TABLE "Position";

-- DropTable
DROP TABLE "Task";

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" "RoleType" NOT NULL DEFAULT 'STUDENT',

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Batch" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Batch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "stage" "Stage" NOT NULL DEFAULT 'BEGINNER',
    "batchId" INTEGER NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "batchId" INTEGER,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Advertisement" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "ModStatus" NOT NULL DEFAULT 'PENDING',
    "authorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Advertisement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTag" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "type" "ChatType" NOT NULL DEFAULT 'TEAM',
    "teamId" INTEGER,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatMember" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "chatId" INTEGER NOT NULL,

    CONSTRAINT "ChatMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER,
    "chatId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Batch_name_key" ON "Batch"("name");

-- CreateIndex
CREATE INDEX "User_email_baptismalName_idx" ON "User"("email", "baptismalName");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advertisement" ADD CONSTRAINT "Advertisement_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTag" ADD CONSTRAINT "UserTag_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTag" ADD CONSTRAINT "UserTag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMember" ADD CONSTRAINT "ChatMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMember" ADD CONSTRAINT "ChatMember_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
