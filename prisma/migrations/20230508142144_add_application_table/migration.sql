-- CreateEnum
CREATE TYPE "Application_status" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "status" "Application_status" NOT NULL DEFAULT 'PENDING',
    "application_date" TIMESTAMP(3) NOT NULL,
    "candidate_id" INTEGER NOT NULL,
    "master_id" INTEGER NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_master_id_fkey" FOREIGN KEY ("master_id") REFERENCES "Master"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
