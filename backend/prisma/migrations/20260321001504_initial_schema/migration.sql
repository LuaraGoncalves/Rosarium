-- CreateTable
CREATE TABLE "Liturgia" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "conteudo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Liturgia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Santo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "historia" TEXT NOT NULL,
    "diaFesta" TEXT,
    "descricaoCurta" TEXT,
    "imagemUrl" TEXT,
    "padroeiroDe" TEXT,
    "intercessao" TEXT,
    "seculo" TEXT,
    "origem" TEXT,
    "categoria" TEXT,
    "fraseMarcante" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Santo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Liturgia_data_key" ON "Liturgia"("data");
