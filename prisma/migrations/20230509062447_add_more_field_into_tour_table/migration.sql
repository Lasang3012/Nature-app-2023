/*
  Warnings:

  - You are about to drop the column `rating` on the `tour` table. All the data in the column will be lost.
  - Added the required column `description` to the `tour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difficulty` to the `tour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `tour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_cover` to the `tour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `images` to the `tour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_group_size` to the `tour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_discount` to the `tour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tour" DROP COLUMN "rating",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "difficulty" TEXT NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image_cover" TEXT NOT NULL,
ADD COLUMN     "images" TEXT NOT NULL,
ADD COLUMN     "max_group_size" INTEGER NOT NULL,
ADD COLUMN     "price_discount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "rating_average" DOUBLE PRECISION NOT NULL DEFAULT 4.5,
ADD COLUMN     "rating_quantity" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "summary" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
