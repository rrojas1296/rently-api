/*
  Warnings:

  - You are about to drop the column `usersProfileId` on the `Properties` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Properties" DROP CONSTRAINT "Properties_usersProfileId_fkey";

-- AlterTable
ALTER TABLE "Properties" DROP COLUMN "usersProfileId";
