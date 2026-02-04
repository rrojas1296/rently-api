/*
  Warnings:

  - Added the required column `documentNumber` to the `TenantsProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entryDate` to the `TenantsProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exitDate` to the `TenantsProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationality` to the `TenantsProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentDay` to the `TenantsProfile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('DNI', 'PASSPORT');

-- AlterTable
ALTER TABLE "TenantsProfile" ADD COLUMN     "documentNumber" TEXT NOT NULL,
ADD COLUMN     "documentTyoe" "DocumentType" NOT NULL DEFAULT 'DNI',
ADD COLUMN     "emergencyPhone" TEXT,
ADD COLUMN     "entryDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "exitDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "nationality" TEXT NOT NULL,
ADD COLUMN     "paymentDay" INTEGER NOT NULL;
