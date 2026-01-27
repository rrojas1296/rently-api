/*
  Warnings:

  - Changed the type of `area` on the `Properties` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Properties" DROP COLUMN "area",
ADD COLUMN     "area" INTEGER NOT NULL;
