/*
  Warnings:

  - You are about to drop the `Responsable` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Responsable";

-- CreateTable
CREATE TABLE "Responsible" (
    "cin" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,
    "last_name" VARCHAR(250) NOT NULL,
    "first_name" VARCHAR(250) NOT NULL,
    "login" VARCHAR(250) NOT NULL,
    "password" VARCHAR(250) NOT NULL,

    CONSTRAINT "Responsible_pkey" PRIMARY KEY ("id")
);
