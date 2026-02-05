-- DropForeignKey
ALTER TABLE "Properties" DROP CONSTRAINT "Properties_ownerId_fkey";

-- AlterTable
ALTER TABLE "Properties" ADD COLUMN     "usersProfileId" TEXT;

-- AddForeignKey
ALTER TABLE "Properties" ADD CONSTRAINT "Properties_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Properties" ADD CONSTRAINT "Properties_usersProfileId_fkey" FOREIGN KEY ("usersProfileId") REFERENCES "UsersProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
