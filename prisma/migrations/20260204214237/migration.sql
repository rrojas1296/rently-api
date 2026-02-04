/*
  Warnings:

  - You are about to drop the column `documentTyoe` on the `TenantsProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TenantsProfile" DROP COLUMN "documentTyoe",
ADD COLUMN     "documentType" "DocumentType" NOT NULL DEFAULT 'DNI',
ALTER COLUMN "exitDate" DROP NOT NULL;
