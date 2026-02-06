-- AlterTable
ALTER TABLE "Properties" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "TenantsProfile" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "UsersProfile" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;
