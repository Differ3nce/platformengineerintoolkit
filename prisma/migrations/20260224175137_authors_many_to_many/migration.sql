/*
  Warnings:

  - You are about to drop the column `authorId` on the `Resource` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_authorId_fkey";

-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "authorId";

-- CreateTable
CREATE TABLE "_AuthoredBy" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AuthoredBy_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AuthoredBy_B_index" ON "_AuthoredBy"("B");

-- AddForeignKey
ALTER TABLE "_AuthoredBy" ADD CONSTRAINT "_AuthoredBy_A_fkey" FOREIGN KEY ("A") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthoredBy" ADD CONSTRAINT "_AuthoredBy_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
