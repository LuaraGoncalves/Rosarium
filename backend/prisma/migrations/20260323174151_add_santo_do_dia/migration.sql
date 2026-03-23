-- CreateTable
CREATE TABLE "SantoDoDia" (
    "id" TEXT NOT NULL DEFAULT 'santo-do-dia',
    "data" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "historiaCompleta" TEXT NOT NULL,
    "historiaResumo" TEXT NOT NULL,
    "imagemUrl" TEXT,
    "padroeiroDe" TEXT,
    "intercessao" TEXT,
    "fraseMarcante" TEXT,
    "categoria" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SantoDoDia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SantoDoDia_data_key" ON "SantoDoDia"("data");
