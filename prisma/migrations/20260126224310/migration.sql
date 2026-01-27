/*
  Warnings:

  - Added the required column `bathrooms` to the `Properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floors` to the `Properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `garanty` to the `Properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlyFee` to the `Properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlyPayment` to the `Properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `persons` to the `Properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rooms` to the `Properties` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PropertyCurrency" AS ENUM ('EUR', 'USD', 'PEN');

-- CreateEnum
CREATE TYPE "PropertyCondition" AS ENUM ('NEW', 'REMODELED', 'MAINTENANCE');

-- AlterTable
ALTER TABLE "Properties" ADD COLUMN     "bathrooms" INTEGER NOT NULL,
ADD COLUMN     "condition" "PropertyCondition" NOT NULL DEFAULT 'NEW',
ADD COLUMN     "curreny" "PropertyCurrency" NOT NULL DEFAULT 'USD',
ADD COLUMN     "floors" INTEGER NOT NULL,
ADD COLUMN     "garanty" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "monthlyFee" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "monthlyPayment" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "persons" INTEGER NOT NULL,
ADD COLUMN     "rooms" INTEGER NOT NULL;
