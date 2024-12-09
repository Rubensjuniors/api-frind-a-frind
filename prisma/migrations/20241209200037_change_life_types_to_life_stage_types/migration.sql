/*
  Warnings:

  - Changed the type of `life_stage` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "LifeStageTypes" AS ENUM ('PUPPY', 'ADULT', 'SENIOR');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "life_stage",
ADD COLUMN     "life_stage" "LifeStageTypes" NOT NULL;

-- DropEnum
DROP TYPE "AgeTypes";
