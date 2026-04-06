export interface DiaLiturgico {
  dia: number;
  mes: number;
  titulo: string;
  cor: string;
  tipo: string;
}

function getEasterDate(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function generateLiturgicalCalendar(year: number): DiaLiturgico[] {
  const easter = getEasterDate(year);
  
  const cinzas = addDays(easter, -46);
  const ramos = addDays(easter, -7);
  const quintaSanta = addDays(easter, -3);
  const sextaSanta = addDays(easter, -2);
  const ascensao = addDays(easter, 39); // Sometimes moved to Sunday (day 42)
  const pentecostes = addDays(easter, 49);
  const corpusChristi = addDays(easter, 60);

  const eventos: DiaLiturgico[] = [
    { dia: 1, mes: 1, titulo: "Santa Maria, Mãe de Deus", cor: "Branco", tipo: "Solenidade" },
    { dia: 6, mes: 1, titulo: "Epifania do Senhor", cor: "Branco", tipo: "Solenidade" },
    { dia: 2, mes: 2, titulo: "Apresentação do Senhor", cor: "Branco", tipo: "Festa" },
    
    // Movable Feasts
    { dia: cinzas.getDate(), mes: cinzas.getMonth() + 1, titulo: "Quarta-feira de Cinzas", cor: "Roxo", tipo: "Tempo da Quaresma" },
    { dia: ramos.getDate(), mes: ramos.getMonth() + 1, titulo: "Domingo de Ramos", cor: "Vermelho", tipo: "Semana Santa" },
    { dia: quintaSanta.getDate(), mes: quintaSanta.getMonth() + 1, titulo: "Quinta-feira Santa", cor: "Branco", tipo: "Semana Santa" },
    { dia: sextaSanta.getDate(), mes: sextaSanta.getMonth() + 1, titulo: "Sexta-feira da Paixão", cor: "Vermelho", tipo: "Semana Santa" },
    { dia: easter.getDate(), mes: easter.getMonth() + 1, titulo: "Domingo de Páscoa", cor: "Branco", tipo: "Tempo Pascal" },
    { dia: ascensao.getDate(), mes: ascensao.getMonth() + 1, titulo: "Ascensão do Senhor", cor: "Branco", tipo: "Solenidade" },
    { dia: pentecostes.getDate(), mes: pentecostes.getMonth() + 1, titulo: "Domingo de Pentecostes", cor: "Vermelho", tipo: "Solenidade" },
    { dia: corpusChristi.getDate(), mes: corpusChristi.getMonth() + 1, titulo: "Corpus Christi", cor: "Branco", tipo: "Solenidade" },
    
    // Fixed Feasts
    { dia: 19, mes: 3, titulo: "São José, Esposo de Maria", cor: "Branco", tipo: "Solenidade" },
    { dia: 25, mes: 3, titulo: "Anunciação do Senhor", cor: "Branco", tipo: "Solenidade" },
    { dia: 24, mes: 6, titulo: "Natividade de São João Batista", cor: "Branco", tipo: "Solenidade" },
    { dia: 29, mes: 6, titulo: "São Pedro e São Paulo", cor: "Vermelho", tipo: "Solenidade" },
    { dia: 6, mes: 8, titulo: "Transfiguração do Senhor", cor: "Branco", tipo: "Festa" },
    { dia: 15, mes: 8, titulo: "Assunção de Nossa Senhora", cor: "Branco", tipo: "Solenidade" },
    { dia: 8, mes: 9, titulo: "Natividade de Nossa Senhora", cor: "Branco", tipo: "Festa" },
    { dia: 14, mes: 9, titulo: "Exaltação da Santa Cruz", cor: "Vermelho", tipo: "Festa" },
    { dia: 12, mes: 10, titulo: "Nossa Senhora Aparecida", cor: "Branco", tipo: "Solenidade" },
    { dia: 1, mes: 11, titulo: "Todos os Santos", cor: "Branco", tipo: "Solenidade" },
    { dia: 2, mes: 11, titulo: "Comemoração de Todos os Fiéis Defuntos", cor: "Roxo", tipo: "Comemoração" },
    { dia: 8, mes: 12, titulo: "Imaculada Conceição de Nossa Senhora", cor: "Branco", tipo: "Solenidade" },
    { dia: 25, mes: 12, titulo: "Natal de Nosso Senhor Jesus Cristo", cor: "Branco", tipo: "Solenidade" },
    { dia: 29, mes: 12, titulo: "Sagrada Família", cor: "Branco", tipo: "Festa" }
  ];

  // Fix collisions (e.g., if a fixed feast falls in Holy Week, it's typically moved, but for a simple calendar we can leave them and sort)
  return eventos.sort((a, b) => {
    if (a.mes !== b.mes) return a.mes - b.mes;
    return a.dia - b.dia;
  });
}
