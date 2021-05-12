/*
  Warnings:

  - Made the column `kittenId` on table `KittenPost` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "KittenPost" ALTER COLUMN "kittenId" SET NOT NULL;
