-- AlterTable
ALTER TABLE "tour" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active';
