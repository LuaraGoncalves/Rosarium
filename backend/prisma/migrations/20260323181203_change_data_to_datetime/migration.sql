/*
  Warnings:

  - Changed the type of `data` on the `SantoDoDia` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "SantoDoDia" DROP COLUMN "data",
ADD COLUMN     "data" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SantoDoDia_data_key" ON "SantoDoDia"("data");
