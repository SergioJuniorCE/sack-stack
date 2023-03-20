/*
  Warnings:

  - You are about to drop the column `authorId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Order` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_authorId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "authorId",
DROP COLUMN "content",
DROP COLUMN "published",
DROP COLUMN "title",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
