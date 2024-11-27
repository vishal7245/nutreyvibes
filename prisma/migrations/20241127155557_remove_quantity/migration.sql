/*
  Warnings:

  - You are about to drop the column `quantity` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `Food` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Food" DROP COLUMN "quantity",
DROP COLUMN "unit";
