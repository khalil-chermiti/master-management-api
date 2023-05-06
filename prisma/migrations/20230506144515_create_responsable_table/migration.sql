-- CreateTable
CREATE TABLE "Responsable" (
    "cin" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,
    "last_name" VARCHAR(250) NOT NULL,
    "first_name" VARCHAR(250) NOT NULL,
    "login" VARCHAR(250) NOT NULL,
    "password" VARCHAR(250) NOT NULL,

    CONSTRAINT "Responsable_pkey" PRIMARY KEY ("id")
);
