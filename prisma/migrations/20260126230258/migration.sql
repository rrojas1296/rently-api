/*
  Warnings:

  - The values [LEASED] on the enum `PropertyStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PropertyStatus_new" AS ENUM ('AVAILABLE', 'OCCUPIED', 'MAINTENANCE');
ALTER TABLE "public"."Properties" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Properties" ALTER COLUMN "status" TYPE "PropertyStatus_new" USING ("status"::text::"PropertyStatus_new");
ALTER TYPE "PropertyStatus" RENAME TO "PropertyStatus_old";
ALTER TYPE "PropertyStatus_new" RENAME TO "PropertyStatus";
DROP TYPE "public"."PropertyStatus_old";
ALTER TABLE "Properties" ALTER COLUMN "status" SET DEFAULT 'AVAILABLE';
COMMIT;
