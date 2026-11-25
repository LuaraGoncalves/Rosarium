-- Avoid duplicate archived saints for the same feast day.
CREATE UNIQUE INDEX "Santo_nome_diaFesta_key" ON "Santo"("nome", "diaFesta");
