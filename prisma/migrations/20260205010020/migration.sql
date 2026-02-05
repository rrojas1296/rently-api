-- CreateEnum
CREATE TYPE "TenantPaymentStatus" AS ENUM ('PENDING', 'PAID', 'CANCELLED');

-- AlterTable
ALTER TABLE "TenantsProfile" ADD COLUMN     "paymentStatus" "TenantPaymentStatus" NOT NULL DEFAULT 'PAID';
