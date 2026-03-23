-- CreateTable
CREATE TABLE "novena_progress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "novenaId" TEXT NOT NULL,
    "completedDays" INTEGER[],
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "novena_progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "novena_progress_userId_novenaId_key" ON "novena_progress"("userId", "novenaId");

-- AddForeignKey
ALTER TABLE "novena_progress" ADD CONSTRAINT "novena_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
