-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'ADMIN';

-- DropForeignKey
ALTER TABLE "Properties" DROP CONSTRAINT "Properties_ownerId_fkey";

-- CreateTable
CREATE TABLE "UsersProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "phone" TEXT,
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsersProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TenantsProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "propertyId" TEXT,
    "phone" TEXT,
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TenantsProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UsersProfile_userId_key" ON "UsersProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TenantsProfile_userId_key" ON "TenantsProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TenantsProfile_propertyId_key" ON "TenantsProfile"("propertyId");

-- AddForeignKey
ALTER TABLE "Properties" ADD CONSTRAINT "Properties_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "UsersProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersProfile" ADD CONSTRAINT "UsersProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenantsProfile" ADD CONSTRAINT "TenantsProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenantsProfile" ADD CONSTRAINT "TenantsProfile_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
