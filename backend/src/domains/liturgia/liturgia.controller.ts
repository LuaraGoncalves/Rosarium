import { Request, Response } from 'express';
import { prisma } from '@/infra/database/prisma';

const LITURGIA_API_URL = 'https://liturgia.up.railway.app/';

export const getLiturgiaDiaria = async (req: Request, res: Response) => {
  try {

    const today = new Date();

    const todayZeroed = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    let liturgiaNoBanco = await prisma.liturgia.findUnique({
      where: { data: todayZeroed }
    });

    if (liturgiaNoBanco) {

      return res.json(JSON.parse(liturgiaNoBanco.conteudo));
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000); // 6 segundos de tolerância

    try {
      const response = await fetch(LITURGIA_API_URL, { signal: controller.signal });
      if (response.ok) {
        const rawData = await response.json();

        const dateString = today.toLocaleDateString('pt-BR');
        
        const normalizedData = {
          data: rawData.data || dateString,
          tempo: rawData.liturgia || "Tempo Comum",
          semana: rawData.cor || "Verde",
          oficio: {
            invitatorio: "Abri, Senhor, os meus lábios. E minha boca anunciará vosso louvor.",
            hino: "Senhor, vós sois a luz, que ilumina o mundo.\nConcedei-nos a vossa paz.",
            salmodia: [
              `Salmo 94 (95)\n\nVinde, exultemos de alegria no Senhor, aclamemos o Rochedo que nos salva!\nAo seu encontro caminhemos com louvores, e com cantos de alegria o celebremos!`,
            ],
            leitura1: `Primeira Leitura\n\n${rawData.primeiraLeitura?.referencia || ''}\n${rawData.primeiraLeitura?.texto || 'Leitura diária não encontrada na API.'}`,
            leitura2: "Segunda Leitura Patrística\n\nDas instruções e sermões dos santos Padres, reservada para a reflexão profunda do mistério de Cristo neste dia.",
            oracao: rawData.oracao || "Concedei-nos, Senhor, a vossa graça e proteção.",
          },
          laudes: {
            hino: "Eis que a luz resplandece, o dia amanhece em louvor.\nGlória ao Pai, ao Filho e ao Espírito Santo.",
            salmodia: [
              `Salmo 62 (63)\n\nÓ Deus, vós sois o meu Deus, com ardor vos procuro.\nMinha alma tem sede de vós, minha carne vos deseja com ardor.`
            ],
            leitura: rawData.primeiraLeitura?.texto || "Deus é luz e nele não há trevas.",
            benedictus: "Bendito seja o Senhor, Deus de Israel, porque a seu povo visitou e libertou.\nE fez surgir um poderoso Salvador na casa de Davi, seu servidor.",
            preces: [
              "Para que a luz do Cristo brilhe em nossos corações hoje.",
              "Pelos que sofrem e pelos que estão afastados da fé."
            ],
            oracao: rawData.oracao || "Ó Deus, que iluminastes o mundo com a luz de Cristo, iluminai nossas mentes.",
          },
          hora_media: {
            hino: "Espírito Santo, vinde, iluminai a nossa mente e o nosso coração.",
            salmodia: [
              `Salmo 118 (119)\n\nComo amo, Senhor, a vossa lei! É ela a minha meditação o dia inteiro.`
            ],
            leitura: rawData.evangelho?.texto || "Ao meio-dia, o sol brilha, assim brilhe a vossa graça em nós.",
            oracao: "Concedei-nos, Senhor, perseverança no meio dos trabalhos do dia."
          },
          vesperas: {
            hino: "Criador imenso do universo, que dividistes a luz das trevas...",
            salmodia: [
              `Salmo 140 (141)\n\nSenhor, eu clamo por vós, socorrei-me; escutai a minha voz quando vos invoco!\nSuba a minha oração como incenso à vossa presença, minhas mãos erguidas como oferta vespertina.`
            ],
            leitura: rawData.segundaLeitura?.texto || rawData.evangelho?.texto || "Ficai conosco, Senhor, pois a tarde cai.",
            magnificat: "A minha alma engrandece o Senhor, e se alegrou o meu espírito em Deus, meu Salvador.\nPois ele viu a pequenez de sua serva, desde agora as gerações hão de chamar-me de bendita.",
            preces: [
              "Por todos os trabalhadores que encerram sua jornada.",
              "Por aqueles que se encontram no escuro do desespero."
            ],
            oracao: rawData.oracao || "Deus eterno e todo-poderoso, guiai os nossos passos na paz.",
          },
          completas: {
            hino: "Antes que o dia chegue ao fim, nós vos pedimos, Criador, que, por vossa imensa bondade, nos protejais e nos guardeis.",
            salmodia: [
              `Salmo 90 (91)\n\nQuem habita ao abrigo do Altíssimo e vive à sombra do Senhor onipotente,\ndiz ao Senhor: 'Sois meu refúgio e proteção, sois o meu Deus, no qual confio inteiramente'.`
            ],
            leitura: "Sede sóbrios e vigiai. O vosso adversário, o diabo, anda em derredor como um leão que ruge, procurando a quem devorar. Resisti-lhe, firmes na fé.",
            nunc_dimittis: "Agora, Senhor, deixai o vosso servo ir em paz, segundo a vossa palavra.\nPorque os meus olhos viram a vossa salvação, que preparastes diante de todos os povos.",
            oracao: "Visitai, Senhor, esta casa e afastai dela as ciladas do inimigo; nela habitem os vossos santos anjos, para nos guardar na paz, e a vossa bênção permaneça sempre sobre nós. Por Cristo, nosso Senhor. Amém.",
          }
        };

        await prisma.liturgia.create({
          data: {
            data: todayZeroed,
            conteudo: JSON.stringify(normalizedData),
          }
        });

        return res.json(normalizedData);
      }
    } catch (apiError) {
      console.log('Timeout ou erro ao ler a API Externa Litúrgica');
    } finally {
      clearTimeout(timeout);
    }

    const ultimaLiturgia = await prisma.liturgia.findFirst({
      orderBy: { data: 'desc' }
    });

    if (ultimaLiturgia) {
      return res.json(JSON.parse(ultimaLiturgia.conteudo));
    }

    return res.status(503).json({ error: 'A Liturgia Diária não pôde ser carregada hoje. O acervo está vazio.' });

  } catch (error) {
    console.error('Erro no controller de Liturgia:', error);
    res.status(500).json({ error: 'Erro interno ao processar a Liturgia Diária.' });
  }
};

export const getLiturgias = async (req: Request, res: Response) => {
  try {
    const liturgias = await prisma.liturgia.findMany({ orderBy: { data: 'desc' } });
    res.json(liturgias);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar liturgias.' });
  }
};

export const getLiturgiaByData = async (req: Request, res: Response) => {
  try {

    const dataString = req.params.data as string;
    const liturgiaDate = new Date(dataString);
    
    const liturgia = await prisma.liturgia.findUnique({
      where: { data: liturgiaDate }
    });
    
    if (liturgia) {
      res.json(JSON.parse(liturgia.conteudo));
    } else {
      res.status(404).json({ error: 'Liturgia não encontrada para essa data' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar a liturgia' });
  }
};

export const createOrUpdateLiturgia = async (req: Request, res: Response) => {
  try {
    const { data, conteudo } = req.body;
    const liturgiaDate = new Date(data);
    
    const result = await prisma.liturgia.upsert({
      where: { data: liturgiaDate },
      update: { conteudo: JSON.stringify(conteudo) },
      create: { data: liturgiaDate, conteudo: JSON.stringify(conteudo) }
    });
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao salvar liturgia' });
  }
};
