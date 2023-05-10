/*
  Warnings:

  - You are about to drop the column `end_date` on the `tour` table. All the data in the column will be lost.
  - You are about to drop the column `rating_average` on the `tour` table. All the data in the column will be lost.
  - You are about to drop the column `rating_quantity` on the `tour` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `tour` table. All the data in the column will be lost.
  - The `images` column on the `tour` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "tour" DROP COLUMN "end_date",
DROP COLUMN "rating_average",
DROP COLUMN "rating_quantity",
DROP COLUMN "start_date",
ADD COLUMN     "ratings_average" DOUBLE PRECISION NOT NULL DEFAULT 4.5,
ADD COLUMN     "ratings_quantity" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "start_dates" TEXT[],
DROP COLUMN "images",
ADD COLUMN     "images" TEXT[],
ALTER COLUMN "price_discount" DROP NOT NULL,
ALTER COLUMN "price_discount" SET DEFAULT 0;
