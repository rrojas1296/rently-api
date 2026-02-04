-- CreateEnum
CREATE TYPE "UserProvider" AS ENUM ('GOOGLE', 'PASSWORD');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "provider" "UserProvider" NOT NULL DEFAULT 'PASSWORD';
