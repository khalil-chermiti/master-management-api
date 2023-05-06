/*
  Warnings:

  - A unique constraint covering the columns `[login]` on the table `Responsible` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Responsible_login_key" ON "Responsible"("login");
