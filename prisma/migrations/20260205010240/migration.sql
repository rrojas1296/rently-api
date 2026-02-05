/*
  Warnings:

  - The values [CANCELLED] on the enum `TenantPaymentStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TenantPaymentStatus_new" AS ENUM ('PENDING', 'PAID', 'DUE_SOON');
ALTER TABLE "public"."TenantsProfile" ALTER COLUMN "paymentStatus" DROP DEFAULT;
ALTER TABLE "TenantsProfile" ALTER COLUMN "paymentStatus" TYPE "TenantPaymentStatus_new" USING ("paymentStatus"::text::"TenantPaymentStatus_new");
ALTER TYPE "TenantPaymentStatus" RENAME TO "TenantPaymentStatus_old";
ALTER TYPE "TenantPaymentStatus_new" RENAME TO "TenantPaymentStatus";
DROP TYPE "public"."TenantPaymentStatus_old";
ALTER TABLE "TenantsProfile" ALTER COLUMN "paymentStatus" SET DEFAULT 'PAID';
COMMIT;
