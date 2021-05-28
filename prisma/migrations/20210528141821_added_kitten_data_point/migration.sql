-- AlterTable
ALTER TABLE "Kitten" ADD COLUMN     "birthdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "KittenDataPoint" (
    "id" SERIAL NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "kittenId" INTEGER NOT NULL,
    "startWeight" INTEGER NOT NULL,
    "finalWeight" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KittenDataPoint" ADD FOREIGN KEY ("kittenId") REFERENCES "Kitten"("id") ON DELETE CASCADE ON UPDATE CASCADE;
