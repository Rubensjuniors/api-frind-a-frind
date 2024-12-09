-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('USER', 'ORGANIZATION');

-- CreateEnum
CREATE TYPE "PetType" AS ENUM ('DOG', 'CAT', 'OTHER');

-- CreateEnum
CREATE TYPE "AgeTypes" AS ENUM ('PUPPY', 'ADULT', 'SENIOR');

-- CreateEnum
CREATE TYPE "PetSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "PetEnergy" AS ENUM ('LITTLE', 'MEDIUM', 'MANY');

-- CreateEnum
CREATE TYPE "PetIndependence" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "photo_url" TEXT,
    "entityType" "EntityType" NOT NULL DEFAULT 'USER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "photo_url" TEXT,
    "entityType" "EntityType" NOT NULL DEFAULT 'ORGANIZATION',
    "cep" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "life_stage" "PetSize" NOT NULL,
    "energy" "PetEnergy" NOT NULL,
    "independence" "PetIndependence" NOT NULL,
    "city" TEXT NOT NULL,
    "environment" TEXT NOT NULL,
    "photos" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "cover_photo" TEXT NOT NULL,
    "requirements" TEXT[],
    "type" "PetType" NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_email_key" ON "organizations"("email");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
