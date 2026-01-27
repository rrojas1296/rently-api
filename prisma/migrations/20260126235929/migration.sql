/*
  Warnings:

  - You are about to drop the column `curreny` on the `Properties` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Properties" DROP COLUMN "curreny",
ADD COLUMN     "currency" "PropertyCurrency" NOT NULL DEFAULT 'USD';
