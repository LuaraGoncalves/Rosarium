CREATE TABLE "curiosidades" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "fonte" TEXT NOT NULL,
    "fonteUrl" TEXT NOT NULL,
    "imagemUrl" TEXT,
    "santoId" INTEGER,
    "publicado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "curiosidades_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "curiosidades_santoId_idx" ON "curiosidades"("santoId");
ALTER TABLE "curiosidades" ADD CONSTRAINT "curiosidades_santoId_fkey" FOREIGN KEY ("santoId") REFERENCES "Santo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
