/*
  Warnings:

  - The values [PENDING] on the enum `CaseStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Invitation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[inviteToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lawyerId` to the `Case` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('LAWYER', 'CLIENT');

-- AlterEnum
BEGIN;
CREATE TYPE "CaseStatus_new" AS ENUM ('OPEN', 'IN_PROGRESS', 'CLOSED');
ALTER TABLE "public"."Case" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Case" ALTER COLUMN "status" TYPE "CaseStatus_new" USING ("status"::text::"CaseStatus_new");
ALTER TYPE "CaseStatus" RENAME TO "CaseStatus_old";
ALTER TYPE "CaseStatus_new" RENAME TO "CaseStatus";
DROP TYPE "public"."CaseStatus_old";
ALTER TABLE "Case" ALTER COLUMN "status" SET DEFAULT 'OPEN';
COMMIT;

-- DropForeignKey
ALTER TABLE "Case" DROP CONSTRAINT "Case_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_lawyerId_fkey";

-- DropForeignKey
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_lawyerId_fkey";

-- DropIndex
DROP INDEX "Case_clientId_idx";

-- AlterTable
ALTER TABLE "Case" ADD COLUMN     "lawyerId" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'OPEN';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "inviteExpires" TIMESTAMP(3),
ADD COLUMN     "inviteToken" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'LAWYER',
ALTER COLUMN "password" DROP NOT NULL;

-- DropTable
DROP TABLE "Client";

-- DropTable
DROP TABLE "Invitation";

-- CreateIndex
CREATE UNIQUE INDEX "User_inviteToken_key" ON "User"("inviteToken");

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_lawyerId_fkey" FOREIGN KEY ("lawyerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
