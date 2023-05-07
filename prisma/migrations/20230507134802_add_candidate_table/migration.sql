-- CreateTable
CREATE TABLE "Candidate" (
    "cin" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,
    "last_name" VARCHAR(250) NOT NULL,
    "first_name" VARCHAR(250) NOT NULL,
    "login" VARCHAR(250) NOT NULL,
    "password" VARCHAR(250) NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" INTEGER NOT NULL,
    "addresse" TEXT,
    "postal_code" INTEGER,
    "country" TEXT,
    "city" TEXT,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_cin_key" ON "Candidate"("cin");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_login_key" ON "Candidate"("login");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_email_key" ON "Candidate"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_phone_number_key" ON "Candidate"("phone_number");
