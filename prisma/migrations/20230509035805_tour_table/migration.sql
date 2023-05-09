/*
  Warnings:

  - You are about to drop the `Tour` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Tour";

-- CreateTable
CREATE TABLE "tour" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 4.5,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tour_pkey" PRIMARY KEY ("id")
);
